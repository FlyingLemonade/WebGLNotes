function generateHyperbolicParaboloid(a, b, sectorCount, stackCount) {
  const vertices = [];
  const normals = [];
  const texCoords = [];
  const indices = [];

  const sectorStep = (2 * Math.PI) / sectorCount;
  const stackStep = Math.PI / stackCount;

  for (let i = 0; i <= stackCount; ++i) {
    const stackAngle = Math.PI / 2 - i * stackStep;
    const xy = Math.cos(stackAngle);

    for (let j = 0; j <= sectorCount; ++j) {
      const sectorAngle = j * sectorStep;

      const x = xy * Math.cos(sectorAngle);
      const y = xy * Math.sin(sectorAngle);
      const z = (x * x) / (a * a) - (y * y) / (b * b); // Hyperbolic paraboloid equation
      vertices.push(x, y, z);

      const nx = x;
      const ny = y;
      const nz = (2 * x) / (a * a) - (2 * y) / (b * b); // Normal vector for a hyperbolic paraboloid
      normals.push(nx, ny, nz);

      const s = j / sectorCount;
      const t = i / stackCount;
      texCoords.push(s, t);
    }
  }

  let k1, k2;
  for (let i = 0; i < stackCount; ++i) {
    k1 = i * (sectorCount + 1);
    k2 = k1 + sectorCount + 1;

    for (let j = 0; j < sectorCount; ++j, ++k1, ++k2) {
      if (i != 0) {
        indices.push(k1, k2, k1 + 1);
      }

      if (i != stackCount - 1) {
        indices.push(k1 + 1, k2, k2 + 1);
      }
    }
  }

  return { vertices, normals, texCoords, indices };
}




function main() {
  // Setup
  var CANVAS = document.getElementById("myCanvas");
  CANVAS.width = window.innerWidth;
  CANVAS.height = window.innerHeight;

  var x_prev = 0;
  var y_prev = 0;
  var drag = false;
  var dx = 0;
  var dy = 0;
  var THETA = 0;
  var ALPHA = 0;
  var FRICTION = 0.95;

  var mouseDown = function (e) {
      console.log(e);
      drag = true;
      x_prev = e.x;
      y_prev = e.y;
      return false;
  };

  var mouseUp = function (e) {
      drag = false;
  }

  var mouseMove = function (e) {
      if (!drag) { return false; }
      dx = (e.x - x_prev) * 2 * Math.PI / CANVAS.width;
      dy = (e.y - y_prev) * 2 * Math.PI / CANVAS.height;
      x_prev = e.x;
      y_prev = e.y;
      THETA += dx;
      ALPHA += dy;
      console.log(dx + " " + dy);
  }

  document.addEventListener("mousedown", mouseDown, false);
  document.addEventListener("mousemove", mouseMove, false);
  document.addEventListener("mouseup", mouseUp, false);
  document.addEventListener("mouseout", mouseUp, false);

  var GL;
  try {
      GL = CANVAS.getContext("webgl", { antialias: true });
  } catch (e) {
      alert(e);
      return false;
  }

  // Shaders
  var shader_vertex_source = `
  attribute vec3 position;
  attribute vec3 color;
  
  uniform mat4 PMatrix;
  uniform mat4 VMatrix;
  uniform mat4 MMatrix;
  
  varying vec3 outColor;
  
  void main(void){
      gl_Position = PMatrix * VMatrix * MMatrix * vec4(position, 1.0);
      
      // Check if the vertex is part of the circle (assuming it's the last vertices in the buffer)
      if (position.z == 0.0) {
          outColor = vec3(0.0, 1.0, 1.0); // Blue color for the circle
      } else {
          outColor = color;
      }
  }
  
  `;

  var shader_fragment_source = `
      precision mediump float;
      varying vec3 outColor;

      void main(void){
          gl_FragColor = vec4(outColor, 1.);
      }
  `;

  // Shader compilation function
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

  // Get attribute and uniform locations
  var position_vao = GL.getAttribLocation(SHADER_PROGRAM, "position");
  GL.enableVertexAttribArray(position_vao);

  var color_vao = GL.getAttribLocation(SHADER_PROGRAM, "color");
  GL.enableVertexAttribArray(color_vao);

  var uniform_projection_matrix = GL.getUniformLocation(SHADER_PROGRAM, "PMatrix");
  var uniform_view_matrix = GL.getUniformLocation(SHADER_PROGRAM, "VMatrix");
  var uniform_model_matrix = GL.getUniformLocation(SHADER_PROGRAM, "MMatrix");

  GL.useProgram(SHADER_PROGRAM);

  const a = 1.0; // Semi-axis a
  const b = 1.0; // Semi-axis b
  const sectorCount = 50; // Number of sectors around the paraboloid
  const stackCount = 50; // Number of stacks along the paraboloid
  const hyperbolicParaboloidData = generateHyperbolicParaboloid(
    a,
    b,
    sectorCount,
    stackCount
  );

  // Create buffers for the hyperbolic paraboloid's data
  const hyperbolicParaboloidVerticesBuffer = GL.createBuffer();
  GL.bindBuffer(GL.ARRAY_BUFFER, hyperbolicParaboloidVerticesBuffer);
  GL.bufferData(
    GL.ARRAY_BUFFER,
    new Float32Array(hyperbolicParaboloidData.vertices),
    GL.STATIC_DRAW
  );

  const hyperbolicParaboloidNormalsBuffer = GL.createBuffer();
  GL.bindBuffer(GL.ARRAY_BUFFER, hyperbolicParaboloidNormalsBuffer);
  GL.bufferData(
    GL.ARRAY_BUFFER,
    new Float32Array(hyperbolicParaboloidData.normals),
    GL.STATIC_DRAW
  );

  const hyperbolicParaboloidTexCoordsBuffer = GL.createBuffer();
  GL.bindBuffer(GL.ARRAY_BUFFER, hyperbolicParaboloidTexCoordsBuffer);
  GL.bufferData(
    GL.ARRAY_BUFFER,
    new Float32Array(hyperbolicParaboloidData.texCoords),
    GL.STATIC_DRAW
  );

  const hyperbolicParaboloidIndicesBuffer = GL.createBuffer();
  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, hyperbolicParaboloidIndicesBuffer);
  GL.bufferData(
    GL.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(hyperbolicParaboloidData.indices),
    GL.STATIC_DRAW
  );


  var projection_matrix = LIBS.get_projection(40, CANVAS.width / CANVAS.height, 1, 100);
  var view_matrix = LIBS.get_I4();
  var model_matrix = LIBS.get_I4();

  LIBS.translateZ(view_matrix, -15);

  // Animate
  var prev_time = 0;
  GL.enable(GL.DEPTH_TEST);

  var animate = function (time) {
      GL.clearColor(0.0, 0.0, 0.0, 1.0);
      GL.viewport(0, 0, CANVAS.width, CANVAS.height);
      GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

      var dt = time - prev_time;

      if (!drag) {
          dx *= FRICTION;
          dy *= FRICTION;
          ALPHA += dy;
          THETA += dx;
      }

      model_matrix = LIBS.get_I4();
      LIBS.rotateY(model_matrix, THETA);
      LIBS.rotateX(model_matrix, ALPHA);

      GL.bindBuffer(GL.ARRAY_BUFFER, hyperbolicParaboloidVerticesBuffer);
      GL.vertexAttribPointer(position_vao, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, hyperbolicParaboloidNormalsBuffer);
      GL.vertexAttribPointer(color_vao, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, hyperbolicParaboloidIndicesBuffer);

      GL.uniformMatrix4fv(uniform_projection_matrix, false, projection_matrix);
      GL.uniformMatrix4fv(uniform_view_matrix, false, view_matrix);
      GL.uniformMatrix4fv(uniform_model_matrix, false, model_matrix);

      GL.drawElements(GL.TRIANGLES,hyperbolicParaboloidData.indices.length,GL.UNSIGNED_SHORT,0);

      GL.flush();

      prev_time = time;
      window.requestAnimationFrame(animate);
  }

  animate(0);
}

window.addEventListener("load", main);