function main() {
  // Setup canvas
  var CANVAS = document.getElementById("myCanvas");
  CANVAS.width = window.innerWidth;
  CANVAS.height = window.innerHeight;

  var GL;
  try {
    GL = CANVAS.getContext("webgl", { antialias: true });
  } catch (e) {
    alert(e);
    return false;
  }
  GL.viewport(0, 0, CANVAS.width, CANVAS.height);
  // Shader sources
  var shader_vertex_source = `
            attribute vec2 position;
            void main(void){
                gl_Position = vec4(position, 0., 1.);
            }
        `;

  var shader_fragment_source = `
            precision mediump float;
            uniform vec3 outColor;
            void main(void){
                gl_FragColor = vec4(outColor, 1.);
            }
        `;

  // Compile shader function
  var compile_shader = function (source, type) {
    var shader = GL.createShader(type);
    GL.shaderSource(shader, source);
    GL.compileShader(shader);
    if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
      alert("ERROR IN SHADER: " + GL.getShaderInfoLog(shader));
      return false;
    }
    return shader;
  };

  // Compile vertex and fragment shaders
  var shader_vertex = compile_shader(shader_vertex_source, GL.VERTEX_SHADER);
  var shader_fragment = compile_shader(shader_fragment_source, GL.FRAGMENT_SHADER);

  // Create shader program
  var SHADER_PROGRAM = GL.createProgram();
  GL.attachShader(SHADER_PROGRAM, shader_vertex);
  GL.attachShader(SHADER_PROGRAM, shader_fragment);
  GL.linkProgram(SHADER_PROGRAM);
  GL.useProgram(SHADER_PROGRAM);

  // Vertex attributes
  var position_vao = GL.getAttribLocation(SHADER_PROGRAM, "position");
  GL.enableVertexAttribArray(position_vao);

  // Uniforms
  var uniform_color = GL.getUniformLocation(SHADER_PROGRAM, "outColor");

  // Define Bezier curve control points

  // Topi

  // Atas
  var startPoint = [-0.3, 0];
  var controlPoint1 = [-0.3, 0.6];
  var controlPoint2 = [0.3, 0.6];
  var endPoint = [0.3, 0];

  var numPoints = 50;
  var hat_vertices = [];
  var t;
  for (var i = 0; i <= numPoints; i++) {
    t = i / numPoints;
    var point = evaluateBezierCurve(startPoint, controlPoint1, controlPoint2, endPoint, t);
    hat_vertices.push(point[0], point[1]);
  }

  // Kanan
  startPoint = [0.3, 0];
  controlPoint1 = [0.5, 0];
  controlPoint2 = [0.5, -0.2];
  endPoint = [0.25, -0.2];

  for (var i = 0; i <= numPoints; i++) {
    t = i / numPoints;
    var point = evaluateBezierCurve(startPoint, controlPoint1, controlPoint2, endPoint, t);
    hat_vertices.push(point[0], point[1]);
  }

  // Kiri
  startPoint = [-0.25, -0.2];
  controlPoint1 = [-0.5, -0.2];
  controlPoint2 = [-0.5, 0];
  endPoint = [-0.3, 0];

  for (var i = 0; i <= numPoints; i++) {
    t = i / numPoints;
    var point = evaluateBezierCurve(startPoint, controlPoint1, controlPoint2, endPoint, t);
    hat_vertices.push(point[0], point[1]);
  }

  var hat_indices = [];
  var i = 0;
  for (var j = 0; j < hat_vertices.length; j++) {
    hat_indices.push(0, 1 + i, 2 + i);
    i++;
  }

  // End Topi

  // Kaca Mata

  // Lingakaran Frame
  var circle_vertices = generateCircle(-0.2, -0.4, 0.12);
  var circle_vertices2 = generateCircle(0.2, -0.4, 0.12);
  var indices = [];
  var i = 0;
  for (var j = 0; j < 350; j++) {
    indices.push(0, 1 + i, 2 + i);
    i++;
  }

  // Lingakaran Kaca
  var circle_vertices3 = generateCircle(-0.2, -0.4, 0.05);
  var circle_vertices4 = generateCircle(0.2, -0.4, 0.05);

  // Kotak

  var rectangle_vertices = [-0.1, -0.44, 0.1, -0.44, -0.1, -0.37, 0.1, -0.37];

  var rectangle_indices = [0, 1, 2, 0, 2, 3, 0, 1, 3];

  // End Kaca Mata

  //   VBO
  var hat_vbo = GL.createBuffer();
  GL.bindBuffer(GL.ARRAY_BUFFER, hat_vbo);
  GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(hat_vertices), GL.STATIC_DRAW);

  var circle_vbo = GL.createBuffer();
  GL.bindBuffer(GL.ARRAY_BUFFER, circle_vbo);
  GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(circle_vertices), GL.STATIC_DRAW);

  var circle_vbo2 = GL.createBuffer();
  GL.bindBuffer(GL.ARRAY_BUFFER, circle_vbo2);
  GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(circle_vertices2), GL.STATIC_DRAW);

  var circle_vbo3 = GL.createBuffer();
  GL.bindBuffer(GL.ARRAY_BUFFER, circle_vbo3);
  GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(circle_vertices3), GL.STATIC_DRAW);

  var circle_vbo4 = GL.createBuffer();
  GL.bindBuffer(GL.ARRAY_BUFFER, circle_vbo4);
  GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(circle_vertices4), GL.STATIC_DRAW);

  var rectangle_vbo = GL.createBuffer();
  GL.bindBuffer(GL.ARRAY_BUFFER, rectangle_vbo);
  GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(rectangle_vertices), GL.STATIC_DRAW);

  //   EBO
  var rectangle_ebo = GL.createBuffer();
  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, rectangle_ebo);
  GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(rectangle_indices), GL.STATIC_DRAW);

  var circle_ebo = GL.createBuffer();
  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, circle_ebo);
  GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), GL.STATIC_DRAW);

  var hat_ebo = GL.createBuffer();
  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, hat_ebo);
  GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(hat_indices), GL.STATIC_DRAW);

  // Render loop
  var animate = function () {
    GL.clearColor(1, 1, 1, 1);
    GL.clear(GL.COLOR_BUFFER_BIT);

    // Draw hat

    GL.uniform3f(uniform_color, 0.196, 0.619, 0.566);
    GL.vertexAttribPointer(position_vao, 2, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, hat_vbo);
    GL.drawArrays(GL.LINE_STRIP, 0, hat_vertices.length / 2);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, hat_ebo);
    GL.drawElements(GL.TRIANGLES, hat_indices.length, GL.UNSIGNED_SHORT, 0);

    // Draw circle
    GL.bindBuffer(GL.ARRAY_BUFFER, circle_vbo);
    GL.vertexAttribPointer(position_vao, 2, GL.FLOAT, false, 0, 0);
    GL.drawArrays(GL.LINE_STRIP, 0, circle_vertices.length / 2);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, circle_ebo);
    GL.drawElements(GL.TRIANGLES, indices.length, GL.UNSIGNED_SHORT, 0);

    // Draw 2 Circle Frame
    GL.bindBuffer(GL.ARRAY_BUFFER, circle_vbo2);
    GL.vertexAttribPointer(position_vao, 2, GL.FLOAT, false, 0, 0);
    GL.drawArrays(GL.LINE_STRIP, 0, circle_vertices2.length / 2);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, circle_ebo);
    GL.drawElements(GL.TRIANGLES, indices.length, GL.UNSIGNED_SHORT, 0);

    // Draw Rectangle
    GL.bindBuffer(GL.ARRAY_BUFFER, rectangle_vbo);
    GL.vertexAttribPointer(position_vao, 2, GL.FLOAT, false, 0, 0);
    GL.drawArrays(GL.LINES, 0, rectangle_vertices.length / 4);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, rectangle_ebo);
    GL.drawElements(GL.TRIANGLES, rectangle_indices.length, GL.UNSIGNED_SHORT, 0);

    // Draw 2 Circle Glass
    GL.bindBuffer(GL.ARRAY_BUFFER, circle_vbo3);
    GL.vertexAttribPointer(position_vao, 2, GL.FLOAT, false, 0, 0);
    GL.uniform3f(uniform_color, 1, 1, 1);
    GL.drawArrays(GL.LINE_STRIP, 0, circle_vertices3.length / 2);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, circle_ebo);
    GL.drawElements(GL.TRIANGLES, indices.length, GL.UNSIGNED_SHORT, 0);

    GL.bindBuffer(GL.ARRAY_BUFFER, circle_vbo4);
    GL.vertexAttribPointer(position_vao, 2, GL.FLOAT, false, 0, 0);
    GL.uniform3f(uniform_color, 1, 1, 1);
    GL.drawArrays(GL.LINE_STRIP, 0, circle_vertices4.length / 2);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, circle_ebo);
    GL.drawElements(GL.TRIANGLES, indices.length, GL.UNSIGNED_SHORT, 0);

    // Rebind buffer for the hat

    GL.bindBuffer(GL.ARRAY_BUFFER, hat_vbo);

    GL.flush();
    window.requestAnimationFrame(animate);
  };

  animate();
}

window.addEventListener("load", main);
