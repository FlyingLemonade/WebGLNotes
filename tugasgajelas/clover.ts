import vertShader from "./clover.vert?raw";
import fragmentShader from "./clover.frag?raw";
import { setupGL, setupGenericShaders } from "../common";
import { generateBSpline, normalizeScreen } from "../pert3/splineUtil";

let layer = Number(localStorage.getItem("layer")) ?? 0;

const colorIndex = [[0, 1, 0]];

(() => {
  function main() {
    // Setup
    const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    canvas.width = 768;
    canvas.height = 768;

    const GL = setupGL(canvas);
    const SHADER_PROGRAM = setupGenericShaders(GL, vertShader, fragmentShader);
    GL.useProgram(SHADER_PROGRAM);

    // VAO
    const vaoList = ["position", "color"] as const;
    const vaoMap = Object.fromEntries(
      vaoList.map((name) => [name, GL.getAttribLocation(SHADER_PROGRAM, name)])
    ) as Record<(typeof vaoList)[number], number>;

    // Enable VAOs
    for (const [_name, location] of Object.entries(vaoMap)) {
      GL.enableVertexAttribArray(location);
    }

    // All the wanted points
    let curveBuffer: number[] = [];
    let curveElements: number[] = [];

    // First array index is the layer
    const points: number[][] = [
      [
        -0.06510416666666663, 0.08854166666666663, 0.13802083333333326,
        0.4453125, 0.09895833333333326, 0.6041666666666667,
        -0.04947916666666663, 0.6510416666666667, -0.12760416666666663,
        0.6328125, -0.171875, 0.5677083333333333, -0.171875, 0.5677083333333333,
        -0.30729166666666663, 0.5963541666666667, -0.41145833333333337, 0.5,
        -0.3984375, 0.35677083333333337, -0.26302083333333337,
        0.22135416666666663, -0.06770833333333337, 0.09114583333333337,
      ],
      [
        -0.06510416666666663, 0.09114583333333337, 0.12239583333333326,
        0.45052083333333337, 0.21875, 0.49479166666666663, 0.3515625,
        0.49479166666666663, 0.45572916666666674, 0.39322916666666663,
        0.43229166666666674, 0.2734375, 0.43229166666666674, 0.2734375,
        0.5260416666666667, 0.20052083333333337, 0.5390625, 0.10416666666666663,
        0.49739583333333326, -0.0026041666666667407, 0.30989583333333326,
        -0.0546875, -0.06770833333333337, 0.09635416666666663,
      ],
      [
        -0.06510416666666663, 0.09375, -0.35677083333333337, 0.234375, -0.53125,
        0.25260416666666663, -0.6145833333333333, 0.15625, -0.6302083333333333,
        0.02864583333333337, -0.5520833333333333, -0.04166666666666674,
        -0.5520833333333333, -0.04166666666666674, -0.5859375,
        -0.12239583333333326, -0.5364583333333333, -0.22916666666666674,
        -0.40364583333333337, -0.296875, -0.27604166666666663,
        -0.24479166666666674, -0.06510416666666663, 0.08854166666666663,
      ],
      [
        -0.06770833333333337, 0.09114583333333337, 0.0546875,
        0.02604166666666663, 0.2109375, -0.04427083333333326, 0.3359375,
        -0.14322916666666674, 0.36197916666666674, -0.2578125, 0.296875,
        -0.36458333333333326, 0.20833333333333326, -0.40885416666666674,
        0.1171875, -0.3828125, 0.11197916666666674, -0.38020833333333326,
        0.08333333333333326, -0.44791666666666674, 0.0078125,
        -0.47916666666666674, -0.11458333333333337, -0.46614583333333326,
        -0.1796875, -0.38802083333333326, -0.18229166666666663,
        -0.27864583333333326, -0.16145833333333337, -0.10416666666666674,
        -0.06510416666666663, 0.0859375,
      ],
      [
        -0.1640625, -0.05989583333333326, -0.27864583333333337,
        -0.30989583333333326, -0.36197916666666663, -0.4453125,
        -0.45572916666666663, -0.5208333333333333, -0.45572916666666663,
        -0.5208333333333333, -0.40885416666666663, -0.5546875,
        -0.36979166666666663, -0.5989583333333333, -0.36979166666666663,
        -0.5989583333333333, -0.24739583333333337, -0.47916666666666674,
        -0.19270833333333337, -0.28645833333333326, -0.14322916666666663,
        -0.08072916666666674,
      ],
      [
        -0.06510416666666663, 0.09635416666666663, -0.04947916666666663,
        -0.01041666666666674, -0.02083333333333337, -0.11197916666666674,
        0.02604166666666674, -0.21875, 0.06770833333333326,
        -0.28385416666666674,
      ],
      [
        -0.0625, 0.09375, 0.015625, 0.13020833333333337, 0.078125,
        0.16927083333333337, 0.16927083333333326, 0.20052083333333337,
        0.30989583333333326, 0.23177083333333337,
      ],
      [
        -0.0625, 0.09635416666666663, -0.08333333333333337, 0.16145833333333337,
        -0.10416666666666663, 0.2109375, -0.1328125, 0.29166666666666663,
        -0.14583333333333337, 0.3828125, -0.15104166666666663,
        0.44791666666666663,
      ],
      [
        -0.05989583333333337, 0.09114583333333337, -0.11458333333333337,
        0.08072916666666663, -0.23697916666666663, 0.0703125,
        -0.31770833333333337, 0.046875, -0.43229166666666663, 0,
      ],
    ];

    let pointsBuffer: number[] = [];
    let pointElements: number[] = [];
    let lineElements: number[] = [];

    function regenerateElements() {
      // Generate buffer of green colored points
      pointsBuffer = [];
      for (let layer = 0; layer < points.length; layer++) {
        for (let i = 0; i < points[layer].length; i += 2) {
          pointsBuffer.push(points[layer][i], points[layer][i + 1], 0, 1, 0);
        }
      }

      // Generate elements for points
      pointElements = [];
      const flattenedLength = points.flat().length;
      for (let i = 0; i < flattenedLength / 2; i++) {
        pointElements.push(i);
      }

      // Generate elements for lines
      lineElements = [];
      // for (let layer = 0; layer < points.length; layer++) {
      //   for (let i = 0; i < points[layer].length / 2 - 1; i++) {
      //     // lineElements.push(j, j + 1);

      //     // Connect all lines for each layer

      //   }
      // }

      // Generate spline thinggy
      const curvePoints: number[][] = [];
      for (let i = 0; i < points.length; i++) {
        const pointLength = points[i].length;
        if (pointLength <= 4) continue;
        curvePoints.push([
          ...generateBSpline(points[i], 100, 2),
          points[i][pointLength - 2],
          points[i][pointLength - 1],
        ]);
      }

      // Generate buffer for curve points
      curveBuffer = [];
      for (let i = 0; i < curvePoints.length; i++) {
        for (let j = 0; j < curvePoints[i].length; j += 2) {
          curveBuffer.push(
            curvePoints[i][j],
            curvePoints[i][j + 1],
            ...colorIndex[i % colorIndex.length]
          );
        }
      }

      // Generate elements for curve as a line
      curveElements = [];
      for (let i = 0, idx = 0; i < curvePoints.length; i++) {
        for (let j = 0; j < curvePoints[i].length / 2 - 1; j++) {
          // curveElements.push(j, j + 1);
          curveElements.push(idx++, idx);
        }
        idx++;
      }

      // flatten
    }

    const objVbo = GL.createBuffer();
    // GL.bindBuffer(GL.ARRAY_BUFFER, objVbo);
    // GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(pointTest), GL.STATIC_DRAW);

    const objEbo = GL.createBuffer();
    // GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, objEbo);
    // GL.bufferData(
    //   GL.ELEMENT_ARRAY_BUFFER,
    //   new Uint16Array(points),
    //   GL.STATIC_DRAW
    // );

    // Bind mouse clicks
    canvas.addEventListener("click", (e) => {
      const [nx, ny] = normalizeScreen(
        e.offsetX,
        e.offsetY,
        canvas.width,
        canvas.height
      );

      // Add to points
      points[layer] = points[layer] ?? [];
      points[layer].push(nx, ny);
      console.log(points);

      regenerateElements();
    });

    // GL.enable(GL.DEPTH_TEST);
    // GL.depthFunc(GL.LEQUAL);
    GL.lineWidth(5);

    let prevTimeMs = 0;

    // Mouse stuff

    const animate = function (timeMs: number) {
      const deltaTimeMs = timeMs - prevTimeMs;
      prevTimeMs = timeMs;

      GL.clearColor(0, 0, 0, 0);
      GL.clear(GL.COLOR_BUFFER_BIT);
      GL.viewport(0, 0, canvas.width, canvas.height);

      GL.bindBuffer(GL.ARRAY_BUFFER, objVbo);
      GL.vertexAttribPointer(
        vaoMap.position,
        2,
        GL.FLOAT,
        false,
        4 * (2 + 3),
        0
      );

      GL.vertexAttribPointer(
        vaoMap.color,
        3,
        GL.FLOAT,
        false,
        4 * (2 + 3),
        2 * 4
      );

      // Bind buffers for points
      GL.bindBuffer(GL.ARRAY_BUFFER, objVbo);
      GL.bufferData(
        GL.ARRAY_BUFFER,
        new Float32Array(pointsBuffer),
        GL.STATIC_DRAW
      );

      // Bind elements for points
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, objEbo);
      GL.bufferData(
        GL.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(pointElements),
        GL.STATIC_DRAW
      );

      // GL.drawElements(GL.POINTS, pointElements.length, GL.UNSIGNED_SHORT, 0);
      // GL.drawArrays(GL.LINES, 0, cube_faces.length / 6);

      // Bind buffers for lines
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, objEbo);
      GL.bufferData(
        GL.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(lineElements),
        GL.STATIC_DRAW
      );

      GL.drawElements(GL.LINES, lineElements.length, GL.UNSIGNED_SHORT, 0);

      // Draw splines thinggy
      GL.bindBuffer(GL.ARRAY_BUFFER, objVbo);
      GL.bufferData(
        GL.ARRAY_BUFFER,
        new Float32Array(curveBuffer),
        GL.STATIC_DRAW
      );

      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, objEbo);
      GL.bufferData(
        GL.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(curveElements),
        GL.STATIC_DRAW
      );

      GL.drawElements(GL.LINES, curveElements.length, GL.UNSIGNED_SHORT, 0);

      GL.flush();

      window.requestAnimationFrame(animate);
    };

    animate(0);

    window.addEventListener("resize", () => {
      const clientWidth = canvas.clientWidth;
      const clientHeight = canvas.clientHeight;

      if (canvas.width !== clientWidth || canvas.height !== clientHeight) {
        canvas.width = clientWidth;
        canvas.height = clientHeight;
      }
    });

    // Hook inputs
    const toggleOverlay = document.getElementById(
      "toggleOverlay"
    ) as HTMLButtonElement;
    const layerIdx = document.getElementById("layerIdx") as HTMLInputElement;

    function updateLayerText() {
      // Set the layer text
      document.getElementById("layerText")!.innerText = `Layer: ${layer}`;
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "d") {
        points[layer].pop();
        points[layer].pop();
        regenerateElements();
      } else if (event.key === "f") {
        // Toggle overlay
        const overlay = document.getElementById("overlay")!;
        overlay.style.pointerEvents =
          overlay.style.pointerEvents === "none" ? "all" : "none";

        document.getElementById("statusText")!.innerText = `Overlay ${
          overlay.style.pointerEvents === "none" ? "locked" : "unlocked"
        }`;
      } else if (event.key === "r") {
        // Increase layer
        layer = Number(layer) + 1;

        updateLayerText();
      } else if (event.key === "e") {
        // Decrease layer
        layer = Number(layer) - 1;

        if (layer < 0) {
          layer = 0;
        }

        updateLayerText();
      } else if (event.key === "p") {
        console.log(points);
      }
    });

    updateLayerText();
    regenerateElements();

    // @ts-ignore
    window.points = points;
  }

  window.addEventListener("load", main);
})();

dragElement(document.getElementById("overlay")!);

function dragElement(elmnt: HTMLElement) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header")!.onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e: MouseEvent) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e: MouseEvent) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
