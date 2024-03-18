function generateCircleForCone(x, y, rad) {
  var list = [];
  list.push(x);
  list.push(y);
  list.push(1);
  for (var i = 0; i < 360; i++) {
    var a = rad * Math.cos((i / 180) * Math.PI) + x;
    var b = rad * Math.sin((i / 180) * Math.PI) + y;
    list.push(a);
    list.push(b);
    list.push(0); //Location
  }
  return list;
}

function main() {
  var CANVAS = document.getElementById("myCanvas");
  CANVAS.width = window.innerWidth;
  CANVAS.height = window.innerHeight;

  var GL;
  try {
    GL = CANVAS.getContext("webgl", {
      antialias: true,
    });
  } catch (e) {
    console.log("FAILED TO CONNECT TO WEBGL");
  }

  var vertex_shader_source = `   attribute vec3 position;
      attribute vec3 color;

      uniform mat4 PMatrix;
      uniform mat4 VMatrix;
      uniform mat4 MMatrix;

      varying vec3 outColor;
      void main(){
          gl_Position =  PMatrix *  VMatrix *MMatrix *  vec4(position , 1.0);
          outColor = color;
      }

  `;

  var fragment_shader_source = `
      precision mediump float;
      varying vec3 outColor;

      void main(){
          gl_FragColor = vec4(outColor,1.0);
      }

  `;

  function connect_shader(source, shader_type) {
    var shader = GL.createShader(shader_type);
    GL.shaderSource(shader, source);
    GL.compileShader(shader);

    return shader;
  }

  var shader_vertex = connect_shader(vertex_shader_source, GL.VERTEX_SHADER);
  var shader_fragment = connect_shader(
    fragment_shader_source,
    GL.FRAGMENT_SHADER
  );
  var program = GL.createProgram();
  GL.attachShader(program, shader_vertex);
  GL.attachShader(program, shader_fragment);
  GL.linkProgram(program);

  var position_vao = GL.getAttribLocation(program, "position");
  var color_vao = GL.getAttribLocation(program, "color");

  var _PMatrix = GL.getUniformLocation(program, "PMatrix");
  var _MMatrix = GL.getUniformLocation(program, "MMatrix");
  var _VMatrix = GL.getUniformLocation(program, "VMatrix");

  GL.enableVertexAttribArray(position_vao);
  GL.enableVertexAttribArray(color_vao);
  GL.useProgram(program);

  var circle_vertices = generateCircleForCone(0, 0, 0.5);
  //console.log(circle_vertices.length / 6);
  var indices = [];

  var i = 0;
  for (var j = 0; j < circle_vertices.length; j++) {
    indices.push(0, 1 + i, 180 - i);
    i++;
  }

  // VBO
  var circle_vbo = GL.createBuffer();
  GL.bindBuffer(GL.ARRAY_BUFFER, circle_vbo);
  GL.bufferData(
    GL.ARRAY_BUFFER,
    new Float32Array(circle_vertices),
    GL.STATIC_DRAW
  );

 
  var Proyektor_Coordinate = LIBS.get_projection(
    50,
    CANVAS.width / CANVAS.height,
    1,
    100
  );
  var Model_Coordinate = LIBS.get_I4();
  var View_Coordinate = LIBS.get_I4();

  LIBS.translateZ(View_Coordinate, -5);

  // Buat EBO untuk warna sisi block
  var circle_ebo = GL.createBuffer();
  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, circle_ebo);
  GL.bufferData(
    GL.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    GL.STATIC_DRAW
  );

  var circle_base_indices = [0, 1, 100, 0, 2, 150];

  var circle_base = GL.createBuffer();
  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, circle_base);
  GL.bufferData(
    GL.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(circle_base_indices),
    GL.STATIC_DRAW
  );

  GL.enable(GL.DEPTH_TEST);
  GL.depthFunc(GL.LEQUAL);

  var prevTime = 0;
  function animate(time) {
    var diff = time - prevTime;
    prevTime = time;
    GL.clearColor(0, 0, 0, 0);

    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

    // LIBS.rotateZ(Model_Coordinate, LIBS.degToRad(10*diff/1000));
    LIBS.rotateY(Model_Coordinate, LIBS.degToRad((50 * diff) / 1000));
    LIBS.rotateX(Model_Coordinate, LIBS.degToRad((50 * diff) / 1000));

    GL.bindBuffer(GL.ARRAY_BUFFER, circle_vbo);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, circle_ebo);

    GL.vertexAttribPointer(position_vao, 3, GL.FLOAT, false, 6 * 4, 0);
    GL.vertexAttribPointer(color_vao, 3, GL.FLOAT, false, 6 * 4, 4 * 4);

    //Uniform
    GL.uniformMatrix4fv(_PMatrix, false, Proyektor_Coordinate);
    GL.uniformMatrix4fv(_MMatrix, false, Model_Coordinate);
    GL.uniformMatrix4fv(_VMatrix, false, View_Coordinate);

    GL.drawArrays(GL.LINE_LOOP, 0, circle_vertices.length / 3);
    GL.drawElements(GL.LINES, indices.length, GL.UNSIGNED_SHORT, 0);

    GL.flush();

    window.requestAnimationFrame(animate);
  }
  animate(0);
}

window.addEventListener("load", main);
