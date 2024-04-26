function evaluateBezierCurve(startPoint, controlPoint1, controlPoint2, endPoint, t) {
  var x = (1 - t) * (1 - t) * (1 - t) * startPoint[0] +
          3 * (1 - t) * (1 - t) * t * controlPoint1[0] +
          3 * (1 - t) * t * t * controlPoint2[0] +
          t * t * t * endPoint[0];
  
  var y = (1 - t) * (1 - t) * (1 - t) * startPoint[1] +
          3 * (1 - t) * (1 - t) * t * controlPoint1[1] +
          3 * (1 - t) * t * t * controlPoint2[1] +
          t * t * t * endPoint[1];
          
  return [x, y];
}


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

 var hat_vertices= [
    0,1,3

    

 ]

  var hat_indices = [];
  var i = 0;
  for (var j = 0; j < hat_vertices.length; j++) {
    hat_indices.push(0, 1 + i, 2 + i);
    i++;
  }
  


  // End Topi

  // Kaca Mata

  // End Kaca Mata

  //   VBO
  var hat_vbo = GL.createBuffer();
  GL.bindBuffer(GL.ARRAY_BUFFER, hat_vbo);
  GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(hat_vertices), GL.STATIC_DRAW);

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



    // Rebind buffer for the hat

    GL.bindBuffer(GL.ARRAY_BUFFER, hat_vbo);

    GL.flush();
    window.requestAnimationFrame(animate);
  };

  animate();
}

window.addEventListener("load", main);
