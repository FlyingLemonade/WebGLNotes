function generateEllipticCone(a, b, c, segments) {
  var vertices = [];
  var colors = [];

  for (var i = 0; i <= segments; i++) {
    var u = -Math.PI + (2 * Math.PI * i) / segments;

    for (var j = 0; j <= segments; j++) {
      var v = -1 + (2 * j) / segments;

      var xCoord = a * v * Math.cos(u);
      var yCoord = b * v * Math.sin(u);
      var zCoord = c * v;

      vertices.push(xCoord, yCoord, zCoord);

      colors.push(0.0, 1.0, 0.0); // Green color
    }
  }

  var faces = [];
  for (var i = 0; i < segments; i++) {
    for (var j = 0; j < segments; j++) {
      var index = i * (segments + 1) + j;
      var nextIndex = index + segments + 1;

      faces.push(index, nextIndex, index + 1);
      faces.push(nextIndex, nextIndex + 1, index + 1);
    }
  }

  return { vertices: vertices, colors: colors, faces: faces };
}

function main() {
  var CANVAS = document.getElementById("myCanvas");

  CANVAS.width = window.innerWidth;
  CANVAS.height = window.innerHeight;

  var GL;
  try {
    GL = CANVAS.getContext("webgl", { antialias: true });
    var EXT = GL.getExtension("OES_element_index_uint");
  } catch (e) {
    alert("WebGL context cannot be initialized");
    return false;
  }

  // Shaders
  var shader_vertex_source = `
      attribute vec3 position;
      attribute vec3 color;
  
      uniform mat4 PMatrix;
      uniform mat4 VMatrix;
      uniform mat4 MMatrix;
  
      varying vec3 vColor;
      void main(void) {
        gl_Position = PMatrix * VMatrix * MMatrix * vec4(position, 1.0);
        vColor = color;
      }`;
  var shader_fragment_source = `
      precision mediump float;
      varying vec3 vColor;
      void main(void) {
        gl_FragColor = vec4(vColor, 1.0);
      }`;

  var compile_shader = function (source, type, typeString) {
    var shader = GL.createShader(type);
    GL.shaderSource(shader, source);
    GL.compileShader(shader);
    if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
      alert("ERROR IN " + typeString + " SHADER: " + GL.getShaderInfoLog(shader));
      return false;
    }
    return shader;
  };

  var shader_vertex = compile_shader(shader_vertex_source, GL.VERTEX_SHADER, "VERTEX");
  var shader_fragment = compile_shader(shader_fragment_source, GL.FRAGMENT_SHADER, "FRAGMENT");

  var SHADER_PROGRAM = GL.createProgram();
  GL.attachShader(SHADER_PROGRAM, shader_vertex);
  GL.attachShader(SHADER_PROGRAM, shader_fragment);

  GL.linkProgram(SHADER_PROGRAM);

  var _color = GL.getAttribLocation(SHADER_PROGRAM, "color");
  var _position = GL.getAttribLocation(SHADER_PROGRAM, "position");

  // Uniforms
  var _PMatrix = GL.getUniformLocation(SHADER_PROGRAM, "PMatrix");
  var _VMatrix = GL.getUniformLocation(SHADER_PROGRAM, "VMatrix");
  var _MMatrix = GL.getUniformLocation(SHADER_PROGRAM, "MMatrix");

  GL.enableVertexAttribArray(_color);
  GL.enableVertexAttribArray(_position);
  GL.useProgram(SHADER_PROGRAM);

  var coneData = generateEllipticCone(2, 2, 2, 50);

  // Create buffers
  var CONE_VERTEX = GL.createBuffer();
  GL.bindBuffer(GL.ARRAY_BUFFER, CONE_VERTEX);
  GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(coneData.vertices), GL.STATIC_DRAW);

  var CONE_COLORS = GL.createBuffer();
  GL.bindBuffer(GL.ARRAY_BUFFER, CONE_COLORS);
  GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(coneData.colors), GL.STATIC_DRAW);

  var CONE_FACES = GL.createBuffer();
  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, CONE_FACES);
  GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(coneData.faces), GL.STATIC_DRAW);

  // Matrices
  var PROJECTION_MATRIX = LIBS.get_projection(40, CANVAS.width / CANVAS.height, 1, 100);
  var VIEW_MATRIX = LIBS.get_I4();
  var MODEL_MATRIX = LIBS.get_I4();

  LIBS.translateZ(VIEW_MATRIX, -15);

  /*========================= DRAWING ========================= */
  GL.clearColor(0.0, 0.0, 0.0, 0.0);

  GL.enable(GL.DEPTH_TEST);
  GL.depthFunc(GL.LEQUAL);

  var animate = function (time) {
    GL.viewport(0, 0, CANVAS.width, CANVAS.height);
    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

    // Calculate rotation angles
    var theta = (time / 1000) * Math.PI; // Adjust speed of rotation as needed
    var alpha = (time / 2000) * Math.PI;

    MODEL_MATRIX = LIBS.get_I4();
    LIBS.rotateY(MODEL_MATRIX, theta);
    LIBS.rotateX(MODEL_MATRIX, alpha);

    GL.bindBuffer(GL.ARRAY_BUFFER, CONE_VERTEX);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ARRAY_BUFFER, CONE_COLORS);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, CONE_FACES);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);

    GL.drawElements(GL.TRIANGLES, coneData.faces.length, GL.UNSIGNED_SHORT, 0);

    GL.flush();

    window.requestAnimationFrame(animate);
  };

  animate(0);
}

window.addEventListener("load", main);
