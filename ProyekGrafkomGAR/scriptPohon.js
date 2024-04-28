function createVertexBuffer(GL, data){
    var VERTEX = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, VERTEX);
    GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(data.vertices), GL.STATIC_DRAW);
    return VERTEX;
  }
  
  function createFacesBuffer(GL, data){
    var FACES = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, FACES);
    GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(data.faces), GL.STATIC_DRAW);
    return FACES;
  }
  
  function createColorBuffer(GL, data){
    var COLORS = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, COLORS);
    GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(data.colors), GL.STATIC_DRAW);
    return COLORS;
  }
 
  function main() {
  
    var CANVAS = document.getElementById("myCanvas");
  
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;
  
    var drag = false;
    var x_prev = 0;
    var y_prev = 0;
  
    var dx = 0;
    var dy = 0;
  
    var alpha = 0;
    var theta = 0;
  
    var friction = 0.98;
  
    var mouseDown = function (e) {
      drag = true;
      x_prev = e.pageX;
      y_prev = e.pageY;
      console.log("DOWN");
    };
    var mouseUP = function (e) {
      drag = false;
      console.log("UP");
    };
    var mouseOut = function (e) {
      console.log("OUTTT");
    };
    var mouseMove = function (e) {
      if (!drag) {
        return false;
      }
  
      dx = e.pageX - x_prev;
      dy = e.pageY - y_prev;
  
      console.log(dx + " " + dy);
      x_prev = e.pageX;
      y_prev = e.pageY;
  
      theta += (dx * 2 * Math.PI) / CANVAS.width;
      alpha += (dy * 2 * Math.PI) / CANVAS.height;
    };
  
    CANVAS.addEventListener("mousedown", mouseDown, false);
    CANVAS.addEventListener("mouseup", mouseUP, false);
    CANVAS.addEventListener("mouseout", mouseOut, false);
    CANVAS.addEventListener("mousemove", mouseMove, false);
  
    var GL;
    try {
      GL = CANVAS.getContext("webgl", { antialias: true });
      var EXT = GL.getExtension("OES_element_index_uint");
    } catch (e) {
      alert("WebGL context cannot be initialized");
      return false;
    }
  
    //shaders
    var shader_vertex_source = `
            attribute vec3 position;
            attribute vec3 color;
        
            uniform mat4 PMatrix;
            uniform mat4 VMatrix;
            uniform mat4 MMatrix;
            uniform mat4 SMatrix;
           
            varying vec3 vColor;
            void main(void) {
            gl_Position = PMatrix*VMatrix*MMatrix*SMatrix*vec4(position, 1.);
            vColor = color;
            }`;
    var shader_fragment_source = `
            precision mediump float;
            varying vec3 vColor;
            // uniform vec3 color;
            void main(void) {
            gl_FragColor = vec4(vColor, 1.);
           
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
  
    //uniform
    var _PMatrix = GL.getUniformLocation(SHADER_PROGRAM, "PMatrix"); //projection
    var _VMatrix = GL.getUniformLocation(SHADER_PROGRAM, "VMatrix"); //View
    var _MMatrix = GL.getUniformLocation(SHADER_PROGRAM, "MMatrix"); //Model
    var _SMatrix = GL.getUniformLocation(SHADER_PROGRAM, "SMatrix"); //Scale
  
    GL.enableVertexAttribArray(_color);
    GL.enableVertexAttribArray(_position);
    GL.useProgram(SHADER_PROGRAM);
  
    // 
    // COLOR
    // 
    var batangPohonColor = [94/255, 66/255, 35/255]
    var daunColor = [0/255, 128/255, 0/255]
    
  
    // 
    // BATANG POHON
    // 
    var batangPohon = generateTube(0, 0, 0, batangPohonColor[0], batangPohonColor[1], batangPohonColor[2], 3.5, .5, .5, 50);

    //
    // DAUN POHON
    var daun1 = generateTube(0, 3, 0, daunColor[0], daunColor[1], daunColor[2], 3, 2.5, .01, 50);
    var daun2 = generateTube(0, 5, 0, daunColor[0], daunColor[1], daunColor[2], 2.5, 2, .01, 50);
    //

    // Create buffers
  
    // 
    // BATANG BOHON
    // 
    var BATANG_POHON_VERTEX = createVertexBuffer(GL, batangPohon);
    var BATANG_POHON_COLORS = createColorBuffer(GL, batangPohon);
    var BATANG_POHON_FACES = createFacesBuffer(GL, batangPohon);

    //
    // DAUN
    //
    var DAUN1_VERTEX = createVertexBuffer(GL, daun1);
    var DAUN1_COLORS = createColorBuffer(GL, daun1);
    var DAUN1_FACES = createFacesBuffer(GL, daun1);

    var DAUN2_VERTEX = createVertexBuffer(GL, daun2);
    var DAUN2_COLORS = createColorBuffer(GL, daun2);
    var DAUN2_FACES = createFacesBuffer(GL, daun2);


  
    //matrix
    var PROJECTION_MATRIX = LIBS.get_projection(40, CANVAS.width / CANVAS.height, 1, 100);
    var VIEW_MATRIX = LIBS.get_I4();
  
    LIBS.translateZ(VIEW_MATRIX, -25);
  
    /*========================= DRAWING ========================= */
    GL.clearColor(0.0, 0.0, 0.0, 0.0);
  
    GL.enable(GL.DEPTH_TEST);
    GL.depthFunc(GL.LEQUAL);
  
    var time_prev = 0;
    var animate = function (time) {
      GL.viewport(0, 0, CANVAS.width, CANVAS.height);
      GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
  
      // 
      // TIME CONTROL
      // 
      var dt = time - time_prev;
      time_prev = time;
  
      if (!drag) {
        dx *= friction;
        dy *= friction;
  
        theta += (dx * 2 * Math.PI) / CANVAS.width;
        alpha += (dy * 2 * Math.PI) / CANVAS.height;
      }

      scale = 1.0 + 0.1 * Math.sin(Date.now() * 0.002); // Adjust speed as needed

      var SCALE_MATRIX = LIBS.get_I4();
      LIBS.fromScaling(SCALE_MATRIX, [scale, 1, scale]);

      var SCALE_MATRIX_S = LIBS.get_I4();
      LIBS.fromScaling(SCALE_MATRIX_S, [1, 1, 1]);

      var MODEL_MATRIX_S = LIBS.get_I4();
      LIBS.rotateY(MODEL_MATRIX_S, theta);
      LIBS.rotateX(MODEL_MATRIX_S, alpha);

      var DAUN_MATRIX = LIBS.get_I4();
      LIBS.rotateY(DAUN_MATRIX, theta);
      LIBS.rotateX(DAUN_MATRIX, alpha);

      //
      // BATANG POHON
      //
  
      GL.bindBuffer(GL.ARRAY_BUFFER, BATANG_POHON_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
      GL.bindBuffer(GL.ARRAY_BUFFER, BATANG_POHON_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, BATANG_POHON_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
      GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);

      GL.drawElements(GL.TRIANGLES, batangPohon.faces.length, GL.UNSIGNED_SHORT, 0);

      //
      // DAUN ATAS
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, DAUN1_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
      GL.bindBuffer(GL.ARRAY_BUFFER, DAUN1_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, DAUN1_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, DAUN_MATRIX);
      GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX);

      GL.drawElements(GL.TRIANGLES, daun1.faces.length, GL.UNSIGNED_SHORT, 0);

      //
      // DAUN BAWAH
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, DAUN2_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
      GL.bindBuffer(GL.ARRAY_BUFFER, DAUN2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, DAUN2_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, DAUN_MATRIX);
      GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX);

      GL.drawElements(GL.TRIANGLES, daun2.faces.length, GL.UNSIGNED_SHORT, 0);
  
  
      window.requestAnimationFrame(animate);
    };
  
    animate(0);
  }
  
  window.addEventListener("load", main);