function setHyperboloid2Sheet(a, b, c, segments) {
  var vertices = [];
  var faces = [];
  var colors = [];

  // Upper sheet
  for (var i = 0; i <= segments; i++) {
    var u = -Math.PI / 2 + (2 * Math.PI * i) / segments;

    for (var j = 0; j <= segments; j++) {
      var v = -Math.PI / 2 + ((Math.PI / 2) * j) / segments;

      var xCoord = (a * Math.tan(v)) * Math.cos(u);
      var yCoord = (b * Math.tan(v)) * Math.sin(u);
      var zCoord = c * 1 / Math.cos(v);

      vertices.push(xCoord, yCoord, zCoord);

      colors.push(0.0, 1.0, 0.0);
    }
  }

  // Lower sheet
  for (var i = 0; i <= segments; i++) {
    var u = -Math.PI / 2 + (2 * Math.PI * i) / segments;

    for (var j = 0; j <= segments; j++) {
      var v = -Math.PI / 2 + ((Math.PI / 2) * j) / segments;

      var xCoord = (a * Math.tan(v)) * Math.cos(u);
      var yCoord = (b * Math.tan(v)) * Math.sin(u);
      var zCoord = -c * 1 / Math.cos(v); // Negate z-coordinate for lower sheet

      vertices.push(xCoord, yCoord, zCoord);

      colors.push(1.0, 0.0, 0.0); // Use different color for lower sheet
    }
  }

  // Faces (triangles)
  for (var i = 0; i < segments; i++) {
    for (var j = 0; j < segments; j++) {
      var index = i * (segments + 1) + j;
      var nextIndex = index + segments + 1;

      // Upper sheet
      faces.push(index, nextIndex, index + 1);
      faces.push(nextIndex, nextIndex + 1, index + 1);

      // Lower sheet
      faces.push(index + (segments + 1) * (segments + 1), index + (segments + 1) * (segments + 1) + 1, nextIndex + (segments + 1) * (segments + 1));
      faces.push(nextIndex + (segments + 1) * (segments + 1), index + (segments + 1) * (segments + 1) + 1, nextIndex + (segments + 1) * (segments + 1) + 1);
    }
  }

  return { vertex: vertices, colors: colors, faces: faces };
}


function main() {
  var CANVAS = document.getElementById("myCanvas");

  CANVAS.width = window.innerWidth;
  CANVAS.height = window.innerHeight;

  var drag = false;
  var x_prev, y_prev;
  var dX = 0,
    dY = 0;
  var THETA = 0,
    PHI = 0;
  var AMORTIZATION = 0.95; //gaya gesek
  var mouseDown = function (e) {
    drag = true;
    x_prev = e.pageX;
    y_prev = e.pageY;
    // e.preventDefault(); //mencegah fungsi awal dri tombol yg di klik, misal klik kanan biasa keluarin inspect dkk tpi itu bisa dibatesi
    return false;
  };

  var mouseUp = function (e) {
    drag = false;
  };

  var mouseMove = function (e) {
    if (!drag) return false;
    dX = ((e.pageX - x_prev) * 2 * Math.PI) / CANVAS.width;
    dY = ((e.pageY - y_prev) * 2 * Math.PI) / CANVAS.height;
    THETA += dX;
    PHI += dY;
    x_prev = e.pageX;
    y_prev = e.pageY;
    // e.preventDefault();
  };

  CANVAS.addEventListener("mousedown", mouseDown, false); //selama mouse ditekan
  CANVAS.addEventListener("mouseup", mouseUp, false); //selama mouse dilepas
  CANVAS.addEventListener("mouseout", mouseUp, false); //selama mouse keluar dari canvas
  CANVAS.addEventListener("mousemove", mouseMove, false); //selama mouse gerak2

  var GL;
  try {
    GL = CANVAS.getContext("webgl", { antialias: false });
  } catch (error) {
    alert("WebGL context cannot be initialized");
    return false;
  }

  //shaders
  var shader_vertex_source = `
    attribute vec3 position;
    attribute vec3 color;

    uniform mat4 Pmatrix;
    uniform mat4 Vmatrix;
    uniform mat4 Mmatrix;

    varying vec3 vColor;
    void main(void){
        gl_Position = Pmatrix * Vmatrix *Mmatrix * vec4(position, 1.0);
        vColor = color;
    } 
    `;

  var shader_fragment_source = `
    precision mediump float;
    varying vec3 vColor;
    void main(void){
        gl_FragColor = vec4(vColor,1.0);
    }
    `;

  var compile_shader = function (source, type, typeString) {
    var shader = GL.createShader(type);
    GL.shaderSource(shader, source);
    GL.compileShader(shader);
    if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
      alert(
        "ERROR IN " + typeString + " SHADER: " + GL.getShaderInfoLog(shader)
      );
      return false;
    }
    return shader;
  };

  var shader_vertex = compile_shader(
    shader_vertex_source,
    GL.VERTEX_SHADER,
    "VERTEX"
  );

  var shader_fragment = compile_shader(
    shader_fragment_source,
    GL.FRAGMENT_SHADER,
    "FRAGMENT"
  );

  var SHADER_PROGRAM = GL.createProgram();
  GL.attachShader(SHADER_PROGRAM, shader_vertex);
  GL.attachShader(SHADER_PROGRAM, shader_fragment);

  GL.linkProgram(SHADER_PROGRAM);

  var _Pmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Pmatrix");
  var _Vmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Vmatrix");
  var _Mmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Mmatrix");

  var _color = GL.getAttribLocation(SHADER_PROGRAM, "color");
  var _position = GL.getAttribLocation(SHADER_PROGRAM, "position");

  GL.enableVertexAttribArray(_color);
  GL.enableVertexAttribArray(_position);

  GL.useProgram(SHADER_PROGRAM);

  var hyperboloid = setHyperboloid2Sheet(2,2,2,100);

  // buffer itu buat ngehandle ke layar
  var VERTEX = GL.createBuffer();
  GL.bindBuffer(GL.ARRAY_BUFFER, VERTEX);
  GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(hyperboloid.vertex), GL.STATIC_DRAW);

  var COLORS = GL.createBuffer();
  GL.bindBuffer(GL.ARRAY_BUFFER, COLORS);
  GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(hyperboloid.colors), GL.STATIC_DRAW);

  var FACES = GL.createBuffer();
  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, FACES);
  GL.bufferData(
    GL.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(hyperboloid.faces),
    GL.STATIC_DRAW
  );

  //MATRIX//
  var PROJMATRIX = LIBS.get_projection(
    40,
    CANVAS.width / CANVAS.height,
    1,
    100
  );
  var MOVEMATRIX = LIBS.get_I4();
  var VIEWMATRIX = LIBS.get_I4();

  LIBS.translateZ(VIEWMATRIX, -10);

  GL.clearColor(0.0, 0.0, 0.0, 0.0);

  GL.enable(GL.DEPTH_TEST);
  GL.depthFunc(GL.LEQUAL);

  GL.clearDepth(1.0);
  var time_prev = 0;
  var animate = function (time) {
    if (time > 0) {
      var dt = time - time_prev;
      
      if (!drag) {
        dX *= AMORTIZATION;
        dY *= AMORTIZATION;
        THETA += dX;
        PHI += dY;
      }
      LIBS.set_I4(MOVEMATRIX);
      LIBS.rotateX(MOVEMATRIX, PHI);
      LIBS.rotateY(MOVEMATRIX, THETA);
      time_prev = time;
    }

    GL.viewport(0, 0, CANVAS.width, CANVAS.height);
    GL.clear(GL.COLOR_BUFFER_BIT);



    //DRAWINGS
    //DRAWING TRIANGLE
    GL.bindBuffer(GL.ARRAY_BUFFER, VERTEX);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, COLORS);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, FACES);

    GL.uniformMatrix4fv(_Pmatrix, false, PROJMATRIX);
    GL.uniformMatrix4fv(_Vmatrix, false, VIEWMATRIX);
    GL.uniformMatrix4fv(_Mmatrix, false, MOVEMATRIX);

    GL.drawElements(GL.LINES, hyperboloid.faces.length, GL.UNSIGNED_SHORT, 0);


    GL.flush();
    window.requestAnimationFrame(animate);
  };

  animate();
}
window.addEventListener("load", main);