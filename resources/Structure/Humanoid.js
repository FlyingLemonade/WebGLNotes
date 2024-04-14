function generateSphere(x, y, z, radius, segments) {
    var vertices = [];
    var colors = [];
  
    var ball_color = [
        [0.0, 1.0, 0.0], // Merah
        [1.0, 0.0, 0.0]  // Hijau
    ];
  
    for (var i = 0; i <= segments; i++) {
        var latAngle = Math.PI * (-0.5 + (i / segments));
        var sinLat = Math.sin(latAngle);
        var cosLat = Math.cos(latAngle);
  
        for (var j = 0; j <= segments; j++) {
            var lonAngle = 2 * Math.PI * (j / segments);
            var sinLon = Math.sin(lonAngle);
            var cosLon = Math.cos(lonAngle);
  
            var xCoord = cosLon * cosLat;
            var yCoord = sinLon * cosLat;
            var zCoord = sinLat;
  
            var vertexX = x + radius * xCoord;
            var vertexY = y + radius * yCoord;
            var vertexZ = z + radius * zCoord;
  
            vertices.push(vertexX, vertexY, vertexZ -0.5);
  
            var colorIndex = j % ball_color.length;
            colors = colors.concat(ball_color[colorIndex]);
        }
    }
  
    var ball_faces = [];
    for (var i = 0; i < segments; i++) {
        for (var j = 0; j < segments; j++) {
            var index = i * (segments + 1) + j;
            var nextIndex = index + segments + 1;
  
            ball_faces.push(index, nextIndex, index + 1);
            ball_faces.push(nextIndex, nextIndex + 1, index + 1);
        }
    }
  
    return { vertices: vertices, colors: colors, faces: ball_faces };
  }
  
  function generateTube(x, y, z, height, bottomRadius, topRadius, segments) {
    var angle_increment = (2 * Math.PI) / segments;
    var vertices = [];
    var colors = [];
    var faces = [];
  
    for (var i = 0; i < segments; i++) {
        var angle1 = i * angle_increment;
        var angle2 = (i + 1) * angle_increment;
  
        // Bottom vertices
        vertices.push(x + bottomRadius * Math.cos(angle1), y, z + bottomRadius * Math.sin(angle1));
        vertices.push(x + bottomRadius * Math.cos(angle2), y, z + bottomRadius * Math.sin(angle2));
  
        // Top vertices
        vertices.push(x + topRadius * Math.cos(angle1), y + height, z + topRadius * Math.sin(angle1));
        vertices.push(x + topRadius * Math.cos(angle2), y + height, z + topRadius * Math.sin(angle2));
  
        // Colors for all vertices
        colors.push(1.0, 0.0, 0.0);
        colors.push(1.0, 0.0, 0.0);
        colors.push(1.0, 0.0, 0.0);
        colors.push(1.0, 0.0, 0.0);
  
        // Faces for this segment
        var baseIndex = i * 4;
        faces.push(baseIndex, baseIndex + 1, baseIndex + 2); // Triangle 1
        faces.push(baseIndex + 1, baseIndex + 3, baseIndex + 2); // Triangle 2
    }
  
    // Closing faces for top and bottom circles
    for (var i = 0; i < segments - 1; i++) {
        // Bottom circle
        faces.push(i * 4, (i + 1) * 4, vertices.length / 3 - 2);
        // Top circle
        faces.push(i * 4 + 2, (i + 1) * 4 + 2, vertices.length / 3 - 1);
    }
  
    // Close the last segment with the first one
    faces.push((segments - 1) * 4, 0, vertices.length / 3 - 2);
    faces.push((segments - 1) * 4 + 2, 2, vertices.length / 3 - 1);
  
    return { vertices: vertices, colors: colors, faces: faces };
  }
  
  
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
           
            varying vec3 vColor;
            void main(void) {
            gl_Position = PMatrix*VMatrix*MMatrix*vec4(position, 1.);
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
  
    GL.enableVertexAttribArray(_color);
    GL.enableVertexAttribArray(_position);
    GL.useProgram(SHADER_PROGRAM);
  
  
    // 
    //  TANGAN KIRI
    // 
    var tanganKiri1 = generateSphere(-5.6, 2, .55, 1.2, 50);
    var tanganKiri2 = generateTube(-5.6, -1.4, .05, 3, .8, 1.2, 100);
    var tanganKiri3 = generateSphere(-5.6, -1.5, .55, .75, 50);
    var tanganKiri4 = generateTube(-5.6, -3.6, .05, 1.6, .6, .6, 100);
    var tanganKiri5 = generateSphere(-5.6, -3.9, .55, .6, 50);
  
    // 
    // TANGAN KANAN
    // 
    var tanganKanan1 = generateSphere(2.1, 2, .55, 1.2, 50);
    var tanganKanan2 = generateTube(2.1, -1.4, .05, 3, .8, 1.2, 100);
    var tanganKanan3 = generateSphere(2.1, -1.5, .55, .75, 50);
    var tanganKanan4 = generateTube(2.1, -3.6, .05, 1.6, .6, .6, 100);
    var tanganKanan5 = generateSphere(2.1, -3.9, .55, .6, 50);
  
    // 
    // BADAN
    // 
    var badan = generateTube(-1.65, -2.8, 0, 5, 2, 3, 100);
  
    // 
    // BADAN BAWAH
    // 
    var badanBawah = generateTube(-1.65, -4.8, 0, 2, .5, 2, 100);
  
    // 
    // LEHER 
    //
    var leher = generateTube(-1.65, 2.2, 0, 1, 3, 1, 100);
  
    // 
    // KEPALA 
    //
    var kepala = generateSphere(-1.65, 4.4, .55, 2.9, 50);
  
  
    // 
    // KAKI KIRI
    // 
  
    var kakiKiri1 = generateSphere(-2.8, -3.6, .55, 1, 50);
    var kakiKiri2 = generateTube(-2.9, -5.8, .05, 1.5, .3, .7, 100);
    var kakiKiri3 = generateSphere(-2.9, -5.9, .55, .3, 50);
    var kakiKiri4 = generateTube(-2.9, -7.1, .05, 1, .3, .3, 100);
    var kakiKiri5 = generateSphere(-2.9, -7.3, .55, .3, 50);
  
  
    // 
    // KAKI KANAN
    // 
  
    var kakiKanan1 = generateSphere(-.4, -3.6, .55, 1, 50);
    var kakiKanan2 = generateTube(-.3, -5.8, .05, 1.5, .3, .7, 100);
    var kakiKanan3 = generateSphere(-.3, -5.9, .55, .3, 50);
    var kakiKanan4 = generateTube(-.3, -7.1, .05, 1, .3, .3, 100);
    var kakiKanan5 = generateSphere(-.3, -7.3, .55, .3, 50);
  
    // Create buffers
  
    // 
    // TANGAN KIRI
    // 
    var TANGAN_KIRI1_VERTEX = createVertexBuffer(GL, tanganKiri1);
    var TANGAN_KIRI1_COLORS = createColorBuffer(GL, tanganKiri1);
    var TANGAN_KIRI1_FACES = createFacesBuffer(GL, tanganKiri1);
  
    var TANGAN_KIRI2_VERTEX = createVertexBuffer(GL, tanganKiri2);
    var TANGAN_KIRI2_COLORS = createColorBuffer(GL, tanganKiri2);
    var TANGAN_KIRI2_FACES = createFacesBuffer(GL, tanganKiri2);
  
    var TANGAN_KIRI3_VERTEX = createVertexBuffer(GL, tanganKiri3);
    var TANGAN_KIRI3_COLORS = createColorBuffer(GL, tanganKiri3);
    var TANGAN_KIRI3_FACES = createFacesBuffer(GL, tanganKiri3);
  
    var TANGAN_KIRI4_VERTEX = createVertexBuffer(GL, tanganKiri4);
    var TANGAN_KIRI4_COLORS = createColorBuffer(GL, tanganKiri4);
    var TANGAN_KIRI4_FACES = createFacesBuffer(GL, tanganKiri4);
    
    var TANGAN_KIRI5_VERTEX = createVertexBuffer(GL, tanganKiri5);
    var TANGAN_KIRI5_COLORS = createColorBuffer(GL, tanganKiri5);
    var TANGAN_KIRI5_FACES = createFacesBuffer(GL, tanganKiri5);
  
    // 
    // TANGAN KANAN
    // 
    var TANGAN_KANAN1_VERTEX = createVertexBuffer(GL, tanganKanan1);
    var TANGAN_KANAN1_COLORS = createColorBuffer(GL, tanganKanan1);
    var TANGAN_KANAN1_FACES = createFacesBuffer(GL, tanganKanan1);
  
    var TANGAN_KANAN2_VERTEX = createVertexBuffer(GL, tanganKanan2);
    var TANGAN_KANAN2_COLORS = createColorBuffer(GL, tanganKanan2);
    var TANGAN_KANAN2_FACES = createFacesBuffer(GL, tanganKanan2);
  
    var TANGAN_KANAN3_VERTEX = createVertexBuffer(GL, tanganKanan3);
    var TANGAN_KANAN3_COLORS = createColorBuffer(GL, tanganKanan3);
    var TANGAN_KANAN3_FACES = createFacesBuffer(GL, tanganKanan3);
  
    var TANGAN_KANAN4_VERTEX = createVertexBuffer(GL, tanganKanan4);
    var TANGAN_KANAN4_COLORS = createColorBuffer(GL, tanganKanan4);
    var TANGAN_KANAN4_FACES = createFacesBuffer(GL, tanganKanan4);
    
    var TANGAN_KANAN5_VERTEX = createVertexBuffer(GL, tanganKanan5);
    var TANGAN_KANAN5_COLORS = createColorBuffer(GL, tanganKanan5);
    var TANGAN_KANAN5_FACES = createFacesBuffer(GL, tanganKanan5);
  
  
    // 
    // BADAN
    // 
    var BADAN_VERTEX = createVertexBuffer(GL, badan);
    var BADAN_COLORS = createColorBuffer(GL, badan);
    var BADAN_FACES = createFacesBuffer(GL, badan);
  
    // 
    // BADAN BAWAH
    // 
    var BADAN_BAWAH_VERTEX = createVertexBuffer(GL, badanBawah);
    var BADAN_BAWAH_COLORS = createColorBuffer(GL, badanBawah);
    var BADAN_BAWAH_FACES = createFacesBuffer(GL, badanBawah);
  
    // 
    // LEHER
    // 
    var LEHER_VERTEX = createVertexBuffer(GL, leher);
    var LEHER_COLORS = createColorBuffer(GL, leher);
    var LEHER_FACES = createFacesBuffer(GL, leher);
  
    // 
    // KEPALA
    // 
    var KEPALA_VERTEX = createVertexBuffer(GL, kepala);
    var KEPALA_COLORS = createColorBuffer(GL, kepala);
    var KEPALA_FACES = createFacesBuffer(GL, kepala);
  
    // 
    // KAKI KIRI
    // 
    var KAKI_KIRI1_VERTEX = createVertexBuffer(GL, kakiKiri1);
    var KAKI_KIRI1_COLORS = createColorBuffer(GL, kakiKiri1);
    var KAKI_KIRI1_FACES = createFacesBuffer(GL, kakiKiri1);
  
    var KAKI_KIRI2_VERTEX = createVertexBuffer(GL, kakiKiri2);
    var KAKI_KIRI2_COLORS = createColorBuffer(GL, kakiKiri2);
    var KAKI_KIRI2_FACES = createFacesBuffer(GL, kakiKiri2);
  
    var KAKI_KIRI3_VERTEX = createVertexBuffer(GL, kakiKiri3);
    var KAKI_KIRI3_COLORS = createColorBuffer(GL, kakiKiri3);
    var KAKI_KIRI3_FACES = createFacesBuffer(GL, kakiKiri3);
  
    var KAKI_KIRI4_VERTEX = createVertexBuffer(GL, kakiKiri4);
    var KAKI_KIRI4_COLORS = createColorBuffer(GL, kakiKiri4);
    var KAKI_KIRI4_FACES = createFacesBuffer(GL, kakiKiri4);
    
    var KAKI_KIRI5_VERTEX = createVertexBuffer(GL, kakiKiri5);
    var KAKI_KIRI5_COLORS = createColorBuffer(GL, kakiKiri5);
    var KAKI_KIRI5_FACES = createFacesBuffer(GL, kakiKiri5);
  
    // 
    // KAKI KANAN
    // 
    var KAKI_KANAN1_VERTEX = createVertexBuffer(GL, kakiKanan1);
    var KAKI_KANAN1_COLORS = createColorBuffer(GL, kakiKanan1);
    var KAKI_KANAN1_FACES = createFacesBuffer(GL, kakiKanan1);
  
    var KAKI_KANAN2_VERTEX = createVertexBuffer(GL, kakiKanan2);
    var KAKI_KANAN2_COLORS = createColorBuffer(GL, kakiKanan2);
    var KAKI_KANAN2_FACES = createFacesBuffer(GL, kakiKanan2);
  
    var KAKI_KANAN3_VERTEX = createVertexBuffer(GL, kakiKanan3);
    var KAKI_KANAN3_COLORS = createColorBuffer(GL, kakiKanan3);
    var KAKI_KANAN3_FACES = createFacesBuffer(GL, kakiKanan3);
  
    var KAKI_KANAN4_VERTEX = createVertexBuffer(GL, kakiKanan4);
    var KAKI_KANAN4_COLORS = createColorBuffer(GL, kakiKanan4);
    var KAKI_KANAN4_FACES = createFacesBuffer(GL, kakiKanan4);
    
    var KAKI_KANAN5_VERTEX = createVertexBuffer(GL, kakiKanan5);
    var KAKI_KANAN5_COLORS = createColorBuffer(GL, kakiKanan5);
    var KAKI_KANAN5_FACES = createFacesBuffer(GL, kakiKanan5);
  
  
  
  
    //matrix
    var PROJECTION_MATRIX = LIBS.get_projection(40, CANVAS.width / CANVAS.height, 1, 100);
    var VIEW_MATRIX = LIBS.get_I4();
    var MODEL_MATRIX = LIBS.get_I4();
  
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
  
      MODEL_MATRIX = LIBS.get_I4();
      LIBS.rotateY(MODEL_MATRIX, theta);
      LIBS.rotateX(MODEL_MATRIX, alpha);
  
      // 
      // TANGAN KIRI
      //
  
      // TUBE ATAS
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI1_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI1_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KIRI1_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, tanganKiri1.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //BALL ATAS
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI2_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KIRI2_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
  
      GL.drawElements(GL.TRIANGLES, tanganKiri2.faces.length, GL.UNSIGNED_SHORT, 0);
  
  
      //BALL Bawah
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI3_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI3_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KIRI3_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, tanganKiri3.faces.length, GL.UNSIGNED_SHORT, 0);
  
  
      // TUBE BAWAH
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI4_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI4_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KIRI4_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, tanganKiri4.faces.length, GL.UNSIGNED_SHORT, 0);
  
      // SPHERE TANGAN
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI5_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI5_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KIRI5_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, tanganKiri5.faces.length, GL.UNSIGNED_SHORT, 0);
  
      // 
      // TANGAN KANAN
      //
  
      // TUBE ATAS
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN1_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN1_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KANAN1_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, tanganKanan1.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //BALL ATAS
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN2_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KANAN2_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
  
      GL.drawElements(GL.TRIANGLES, tanganKanan2.faces.length, GL.UNSIGNED_SHORT, 0);
  
  
      //BALL Bawah
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN3_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN3_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KANAN3_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, tanganKanan3.faces.length, GL.UNSIGNED_SHORT, 0);
  
  
      // TUBE BAWAH
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN4_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN4_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KANAN4_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, tanganKanan4.faces.length, GL.UNSIGNED_SHORT, 0);
  
      // SPHERE TANGAN
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN5_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN5_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KANAN5_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, tanganKanan5.faces.length, GL.UNSIGNED_SHORT, 0);
  
  
      // 
      // BADAN
      // 
  
      // SPHERE TANGAN
      GL.bindBuffer(GL.ARRAY_BUFFER, BADAN_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ARRAY_BUFFER, BADAN_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, BADAN_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, badan.faces.length, GL.UNSIGNED_SHORT, 0);
  
      // 
      // BADAN BAWAH
      // 
  
      GL.bindBuffer(GL.ARRAY_BUFFER, BADAN_BAWAH_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ARRAY_BUFFER, BADAN_BAWAH_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, BADAN_BAWAH_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, badanBawah.faces.length, GL.UNSIGNED_SHORT, 0);
  
      // 
      // LEHER
      // 
  
      GL.bindBuffer(GL.ARRAY_BUFFER, LEHER_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ARRAY_BUFFER, LEHER_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, LEHER_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, leher.faces.length, GL.UNSIGNED_SHORT, 0);
  
      // 
      // KEPALA
      // 
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KEPALA_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ARRAY_BUFFER, KEPALA_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KEPALA_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, kepala.faces.length, GL.UNSIGNED_SHORT, 0);
  
  
      // 
      // KAKI KIRI
      //
  
      // TUBE ATAS
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI1_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI1_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KIRI1_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, kakiKiri1.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //BALL ATAS
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI2_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KIRI2_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
  
      GL.drawElements(GL.TRIANGLES, kakiKiri2.faces.length, GL.UNSIGNED_SHORT, 0);
  
  
      //BALL Bawah
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI3_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI3_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KIRI3_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, kakiKiri3.faces.length, GL.UNSIGNED_SHORT, 0);
  
  
      // TUBE BAWAH
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI4_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI4_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KIRI4_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, kakiKiri4.faces.length, GL.UNSIGNED_SHORT, 0);
  
      // SPHERE KAKI
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI5_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI5_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KIRI5_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, kakiKiri5.faces.length, GL.UNSIGNED_SHORT, 0);
  
      // 
      // KAKI KANAN
      //
  
      // TUBE ATAS
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN1_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN1_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KANAN1_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, kakiKanan1.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //BALL ATAS
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN2_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KANAN2_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
  
      GL.drawElements(GL.TRIANGLES, kakiKanan2.faces.length, GL.UNSIGNED_SHORT, 0);
  
  
      //BALL Bawah
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN3_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN3_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KANAN3_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, kakiKanan3.faces.length, GL.UNSIGNED_SHORT, 0);
  
  
      // TUBE BAWAH
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN4_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN4_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KANAN4_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, kakiKanan4.faces.length, GL.UNSIGNED_SHORT, 0);
  
      // SPHERE KAKI
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN5_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN5_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KANAN5_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, kakiKanan5.faces.length, GL.UNSIGNED_SHORT, 0);
      GL.flush();
  
      window.requestAnimationFrame(animate);
    };
  
    animate(0);
  }
  
  window.addEventListener("load", main);
  