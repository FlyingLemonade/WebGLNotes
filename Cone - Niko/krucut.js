function main() {
  // Setup Canvas
  var CANVAS = document.getElementById("myCanvas");
  CANVAS.width = window.innerWidth;
  CANVAS.height = window.innerHeight;

  var GL;
  try {
      GL = CANVAS.getContext("webgl", { antialias: true });
  } catch (e) {
      alert("WebGL not supported!");
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
      void main(void) {
          gl_Position = PMatrix * VMatrix * MMatrix * vec4(position, 1.0);
          outColor = color;
      }
  `;
  var shader_fragment_source = `
      precision mediump float;

      varying vec3 outColor;
      
      void main(void) {
          gl_FragColor = vec4(outColor, 1.0);
      }
  `;

  // Utility function for compiling shaders
  var compile_shader = function (source, type, typeString){
      var shader = GL.createShader(type);
      GL.shaderSource(shader, source);
      GL.compileShader(shader);

      if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
          throw "Error compiling " + typeString + ":\n" + GL.getShaderInfoLog(shader);
          return false;
      }
      return shader;
  };

  // Compile shaders
  var shader_vertex = compile_shader(shader_vertex_source, GL.VERTEX_SHADER, "VERTEX");
  var shader_fragment = compile_shader(shader_fragment_source, GL.FRAGMENT_SHADER, "FRAGMENT");

  // Program
  var SHADER_PROGRAM = GL.createProgram();
  GL.attachShader(SHADER_PROGRAM, shader_vertex);
  GL.attachShader(SHADER_PROGRAM, shader_fragment);
  GL.linkProgram(SHADER_PROGRAM);

  // Setup VAO
  var position_vao = GL.getAttribLocation(SHADER_PROGRAM, "position");
  var color_vao = GL.getAttribLocation(SHADER_PROGRAM, "color");

  // Uniform
  var _PMatrix = GL.getUniformLocation(SHADER_PROGRAM, "PMatrix");
  var _VMatrix = GL.getUniformLocation(SHADER_PROGRAM, "VMatrix");
  var _MMatrix = GL.getUniformLocation(SHADER_PROGRAM, "MMatrix");

  GL.enableVertexAttribArray(position_vao);
  GL.enableVertexAttribArray(color_vao);
  GL.useProgram(SHADER_PROGRAM);

  // Define number of triangles for the cone
  var num_triangles = 10;
  var angle_increment = (2 * Math.PI) / num_triangles;
  var radius = 0.5;
  var height = 1.0;

  // Define cone vertices and colors
  var cone_vertices = [];
  var cone_colors = [];
  for (var i = 0; i < num_triangles; i++) {
      var angle1 = i * angle_increment;
      var angle2 = (i + 1) * angle_increment;

      // Apex vertex
      cone_vertices.push(0, height, 0);
      cone_colors.push(1.0, 1.0, 1.0);

      // First base vertex
      cone_vertices.push(radius * Math.cos(angle1), 0, radius * Math.sin(angle1));
      cone_colors.push(Math.random(), Math.random(), Math.random());

      // Second base vertex
      cone_vertices.push(radius * Math.cos(angle2), 0, radius * Math.sin(angle2));
      cone_colors.push(Math.random(), Math.random(), Math.random());
  }

  // Define vertices for the bottom of the cone (circle)
  var bottom_center = [0, 0, 0];
  cone_vertices.push(...bottom_center); // Center vertex for bottom
  cone_colors.push(1.0, 1.0, 1.0); // Color for center vertex

  for (var i = 0; i < num_triangles; i++) {
      var angle1 = i * angle_increment;
      var angle2 = (i + 1) * angle_increment;

      cone_vertices.push(radius * Math.cos(angle2), 0, radius * Math.sin(angle2)); // Vertex on base
      cone_colors.push(Math.random(), Math.random(), Math.random()); // Color for base vertex

      cone_vertices.push(radius * Math.cos(angle1), 0, radius * Math.sin(angle1)); // Next vertex on base
      cone_colors.push(Math.random(), Math.random(), Math.random()); // Color for base vertex

      // Connecting vertex between base and center
      cone_vertices.push(0, 0, 0); // Center vertex
      cone_colors.push(1.0, 1.0, 1.0); // Color for center vertex
  }

  // Setup VBO for cone vertices
  var cone_vbo = GL.createBuffer();
  GL.bindBuffer(GL.ARRAY_BUFFER, cone_vbo);
  GL.bufferData(GL.ARRAY_BUFFER,
      new Float32Array(cone_vertices),
      GL.STATIC_DRAW);

  // Setup VBO for cone colors
  var cone_color_vbo = GL.createBuffer();
  GL.bindBuffer(GL.ARRAY_BUFFER, cone_color_vbo);
  GL.bufferData(GL.ARRAY_BUFFER,
      new Float32Array(cone_colors),
      GL.STATIC_DRAW);

  // Matrix
  var PROJECTION_MATRIX = LIBS.get_projection(40, CANVAS.width / CANVAS.height, 1, 100);
  var VIEW_MATRIX = LIBS.get_I4();
  var MODEL_MATRIX = LIBS.get_I4();

  LIBS.translateZ(VIEW_MATRIX, -5);

  var time_prev = 0;
  var animate = function (time) {
      GL.clearColor(0, 0, 0, 1);
      GL.viewport(0, 0, CANVAS.width, CANVAS.height);
      GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
      GL.enable(GL.DEPTH_TEST);

      var dt = time - time_prev;
      time_prev = time;
      LIBS.rotateX(MODEL_MATRIX, LIBS.degToRad(dt * 0.1)); // Rotasi sumbu X

      GL.bindBuffer(GL.ARRAY_BUFFER, cone_vbo);
      GL.vertexAttribPointer(position_vao, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, cone_color_vbo);
      GL.vertexAttribPointer(color_vao, 3, GL.FLOAT, false, 0, 0);

      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);

      GL.drawArrays(GL.TRIANGLES, 0, cone_vertices.length / 3);

      GL.flush();
      window.requestAnimationFrame(animate);
  };

  animate(0);
}

window.addEventListener('load', main);