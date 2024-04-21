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
      
    };
    var mouseUP = function (e) {
      drag = false;
  
    };
    var mouseOut = function (e) {
  
    };
    var mouseMove = function (e) {
      if (!drag) {
        return false;
      }
  
      dx = e.pageX - x_prev;
      dy = e.pageY - y_prev;
  
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
    // COLOR
    // 
    var bodyColor = [181/255, 123/255, 107/255]
    var bodyColor2 = [232/255, 196/255, 174/255]
    var earColor = [255/255, 206/255, 199/255]
    var eyeColor = [235/255, 236/255, 240/255, 42/255, 42/255, 39/255]
  
    // 
    //  TANGAN KIRI
    // 
    var tanganKiri1 = generateSphere(-4.7, 2, .55, bodyColor[0], bodyColor[1], bodyColor[2], .8, 50);
    var tanganKiri2 = generateTube(-4.7, -1.4, .05, bodyColor[0], bodyColor[1], bodyColor[2], 3, .8, .8, 100);
    var tanganKiri3 = generateSphere(-4.7, -1.5, .55, bodyColor[0], bodyColor[1], bodyColor[2], .8, 50);
    var tanganKiri4 = generateTube(-4.7, -3.6, .05, bodyColor[0], bodyColor[1], bodyColor[2], 1.6, .6, .6, 100);
    var tanganKiri5 = generateSphere(-4.7, -3.9, .55, bodyColor[0], bodyColor[1], bodyColor[2], .6, 50);
  
    // 
    // TANGAN KANAN
    // 
    var tanganKanan1 = generateSphere(1.4, 2, .55, bodyColor[0], bodyColor[1], bodyColor[2], .8, 50);
    var tanganKanan2 = generateTube(1.4, -1.4, .05, bodyColor[0], bodyColor[1], bodyColor[2], 3, .8, .8, 100);
    var tanganKanan3 = generateSphere(1.4, -1.5, .55, bodyColor[0], bodyColor[1], bodyColor[2], .8, 50);
    var tanganKanan4 = generateTube(1.4, -3.6, .05, bodyColor[0], bodyColor[1], bodyColor[2], 1.6, .6, .6, 100);
    var tanganKanan5 = generateSphere(1.4, -3.9, .55, bodyColor[0], bodyColor[1], bodyColor[2], .6, 50);
  
    // 
    // BADAN
    // 
    var badan1 = generateTube(-1.65, -2.8, 0, bodyColor[0], bodyColor[1], bodyColor[2], 5, 2, 2.4, 100);
    var badan2 = generateTube(-1.6, -2.8, 0.9, bodyColor2[0], bodyColor2[1], bodyColor2[2], 4.3, 1.2, 1.8, 100);
  
    // 
    // BADAN BAWAH
    // 
    var badanBawah = generateTube(-1.65, -4.8, 0, bodyColor[0], bodyColor[1], bodyColor[2], 2, .5, 2, 100);
  
    // 
    // LEHER 
    //
    var leher1 = generateTube(-1.65, 2.2, 0, bodyColor[0], bodyColor[1], bodyColor[2], 1, 2.4, 1, 100);
  
    // 
    // KEPALA 
    //
    var kepala1 = generateTorus(-1.65, 4.8, 1, bodyColor[0], bodyColor[1], bodyColor[2], .1, 2.6, 100, 100, 1.55, 0, 0);
  
    // 
    // TELINGA
    // 
    var telinga1 = generateElipticParabloid(1.7, 7.6, .4, bodyColor[0], bodyColor[1], bodyColor[2], 1.3, .4, 1, 100, 1.3, 0, -2.27);
    var telinga2 = generateElipticParabloid(-5, 7.6, .4, bodyColor[0], bodyColor[1], bodyColor[2], 1.3, .4, 1, 100, 1.3, 0, 2.27);
    var telinga3 = generateElipticParabloid(1.7, 7.6, .8, earColor[0], earColor[1], earColor[2], 1, .2, 1, 100, 1.3, 0, -2.35);
    var telinga4 = generateElipticParabloid(-5, 7.6, 1, earColor[0], earColor[1], earColor[2], 1, .2, 1, 100, 1.3, 0, 2.35);
  
    // 
    // MATA
    // 
    var mata1 = generateEllipsoid(-2.3 , 5, 3.6 , .5, .6, .2, eyeColor[0], eyeColor[1], eyeColor[2], 100);
    var mata2 = generateEllipsoid(-2.3, 4.8, 3.8 , .2, .3, .2, eyeColor[3], eyeColor[4], eyeColor[5], 100);
    var mata3 = generateEllipsoid(-.8 , 5, 3.6 , .5, .6, .2, eyeColor[0], eyeColor[1], eyeColor[2], 100);
    var mata4 = generateEllipsoid(-.8, 4.8, 3.8 , .2, .3, .2, eyeColor[3], eyeColor[4], eyeColor[5], 100);
   
   
    // 
    // MULUT
    // 
  
    var rahang = generateTorus(-1.55, 3.6, 3.4, bodyColor2[0], bodyColor2[1], bodyColor2[2], .5, .9, 100, 100, 1.55, 0, 0);
  
    // 
    // HIDUNG 
    // 
    var hidung = generateEllipsoid(-1.43, 4, 4.8, .2, .2, .2, eyeColor[3], eyeColor[4], eyeColor[5], 100);
  
  
    // 
    // KAKI KIRI
    // 
  
    var kakiKiri1 = generateSphere(-2.8, -3.6, .55, bodyColor[0], bodyColor[1], bodyColor[2], 1, 50);
    var kakiKiri2 = generateTube(-2.9, -5.8, .05, bodyColor[0], bodyColor[1], bodyColor[2], 1.5, .3, .7, 100);
    var kakiKiri3 = generateSphere(-2.9, -5.9, .55, bodyColor[0], bodyColor[1], bodyColor[2], .3, 50);
    var kakiKiri4 = generateTube(-2.9, -7.1, .05, bodyColor[0], bodyColor[1], bodyColor[2], 1, .3, .3, 100);
    var kakiKiri5 = generateSphere(-2.9, -7.3, .55, bodyColor[0], bodyColor[1], bodyColor[2], .3, 50);
  
  
    // 
    // KAKI KANAN
    // 
  
    var kakiKanan1 = generateSphere(-.4, -3.6, .55, bodyColor[0], bodyColor[1], bodyColor[2], 1, 50);
    var kakiKanan2 = generateTube(-.3, -5.8, .05, bodyColor[0], bodyColor[1], bodyColor[2], 1.5, .3, .7, 100);
    var kakiKanan3 = generateSphere(-.3, -5.9, .55, bodyColor[0], bodyColor[1], bodyColor[2], .3, 50);
    var kakiKanan4 = generateTube(-.3, -7.1, .05, bodyColor[0], bodyColor[1], bodyColor[2], 1, .3, .3, 100);
    var kakiKanan5 = generateSphere(-.3, -7.3, .55, bodyColor[0], bodyColor[1], bodyColor[2], .3, 50);
  
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
    var BADAN1_VERTEX = createVertexBuffer(GL, badan1);
    var BADAN1_COLORS = createColorBuffer(GL, badan1);
    var BADAN1_FACES = createFacesBuffer(GL, badan1);
  
    var BADAN2_VERTEX = createVertexBuffer(GL, badan2);
    var BADAN2_COLORS = createColorBuffer(GL, badan2);
    var BADAN2_FACES = createFacesBuffer(GL, badan2);
  
    // 
    // BADAN BAWAH
    // 
    var BADAN_BAWAH_VERTEX = createVertexBuffer(GL, badanBawah);
    var BADAN_BAWAH_COLORS = createColorBuffer(GL, badanBawah);
    var BADAN_BAWAH_FACES = createFacesBuffer(GL, badanBawah);
  
    // 
    // LEHER
    // 
    var LEHER1_VERTEX = createVertexBuffer(GL, leher1);
    var LEHER1_COLORS = createColorBuffer(GL, leher1);
    var LEHER1_FACES = createFacesBuffer(GL, leher1);
  
    // 
    // KEPALA
    // 
    var KEPALA1_VERTEX = createVertexBuffer(GL, kepala1);
    var KEPALA1_COLORS = createColorBuffer(GL, kepala1);
    var KEPALA1_FACES = createFacesBuffer(GL, kepala1);
  
    // 
    // HIDUNG
    // 
  
    var HIDUNG_VERTEX = createVertexBuffer(GL, hidung);
    var HIDUNG_COLORS = createColorBuffer(GL, hidung);
    var HIDUNG_FACES = createFacesBuffer(GL, hidung);
  
    // 
    // MATA
    // 
    var MATA1_VERTEX = createVertexBuffer(GL, mata1);
    var MATA1_COLORS = createColorBuffer(GL, mata1);
    var MATA1_FACES = createFacesBuffer(GL, mata1);
  
    var MATA2_VERTEX = createVertexBuffer(GL, mata2);
    var MATA2_COLORS = createColorBuffer(GL, mata2);
    var MATA2_FACES = createFacesBuffer(GL, mata2);
  
    var MATA3_VERTEX = createVertexBuffer(GL, mata3);
    var MATA3_COLORS = createColorBuffer(GL, mata3);
    var MATA3_FACES = createFacesBuffer(GL, mata3);
  
    var MATA4_VERTEX = createVertexBuffer(GL, mata4);
    var MATA4_COLORS = createColorBuffer(GL, mata4);
    var MATA4_FACES = createFacesBuffer(GL, mata4);
  
    // 
    // TELINGA
    // 
    var TELINGA1_VERTEX = createVertexBuffer(GL, telinga1);
    var TELINGA1_COLORS = createColorBuffer(GL, telinga1);
    var TELINGA1_FACES = createFacesBuffer(GL, telinga1);
  
    var TELINGA2_VERTEX = createVertexBuffer(GL, telinga2);
    var TELINGA2_COLORS = createColorBuffer(GL, telinga2);
    var TELINGA2_FACES = createFacesBuffer(GL, telinga2);
  
    var TELINGA3_VERTEX = createVertexBuffer(GL, telinga3);
    var TELINGA3_COLORS = createColorBuffer(GL, telinga3);
    var TELINGA3_FACES = createFacesBuffer(GL, telinga3);
  
    var TELINGA4_VERTEX = createVertexBuffer(GL, telinga4);
    var TELINGA4_COLORS = createColorBuffer(GL, telinga4);
    var TELINGA4_FACES = createFacesBuffer(GL, telinga4);
  
  
    // 
    // MULUT
    // 
  
    // RAHANG
    var RAHANG_VERTEX = createVertexBuffer(GL, rahang);
    var RAHANG_COLORS = createColorBuffer(GL, rahang);
    var RAHANG_FACES = createFacesBuffer(GL, rahang);
  
  
  
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
  
  
    /*=========================================================== */
    /*========================= MATRIX ========================= */
    /*=========================================================== */
    var PROJECTION_MATRIX = LIBS.get_projection(40, CANVAS.width / CANVAS.height, 1, 100);
    var VIEW_MATRIX = LIBS.get_I4();
    var MODEL_MATRIX = LIBS.get_I4();
  
    //
    // TANGAN KIRI
    // 
    var TANGAN_KIRI_ATAS_MATRIX = LIBS.get_I4();
    var TANGAN_KIRI_BAWAH_MATRIX = LIBS.get_I4();
  
    //
    // TANGAN KANAN
    // 
    var TANGAN_KANAN_ATAS_MATRIX = LIBS.get_I4();
    var TANGAN_KANAN_BAWAH_MATRIX = LIBS.get_I4();
  
    //
    // KAKI KIRI
    // 
    var KAKI_KIRI_ATAS_MATRIX = LIBS.get_I4();
    var KAKI_KIRI_BAWAH_MATRIX = LIBS.get_I4();
  
    //
    // KAKI KANAN
    // 
    var KAKI_KANAN_ATAS_MATRIX = LIBS.get_I4();
    var KAKI_KANAN_BAWAH_MATRIX = LIBS.get_I4();
  
  
    // 
    // BADAN
    // 
    var BADAN_MATRIX =  LIBS.get_I4();
  
    // 
    // KEPALA
    // 
    var KEPALA_MATRIX =  LIBS.get_I4();
  
  
  
    LIBS.translateZ(VIEW_MATRIX, -10);
  
    /*=========================================================== */
    /*========================= DRAWING ========================= */
    /*=========================================================== */
  
  
    GL.clearColor(0.0, 0.0, 0.0, 0.0);
  
    GL.enable(GL.DEPTH_TEST);
    GL.depthFunc(GL.LEQUAL);
  
  
    var then = 0;
  
    // 
    // Variable Time 
    // 
  
    // 
    // KAKI KIRI 
    // 
    var KakiKiriTime = 0;
    var KakiKiriReverse = false;
  
    //
    // KAKI KANAN
    // 
    var KakiKananTime = 0;
    var KakiKananReverse = false;
  
  
  
  
  
    // 
    // DRAW
    // 
    var animateSpike = function (time) {
      GL.viewport(0, 0, CANVAS.width, CANVAS.height);
      GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
    
      // Ubah jadi 1 detik
      time *= 0.001
    //   console.log(time)
  
      var deltaTime = (time - then)*100;
      then = time;
  
  
      if (!drag) {
        dx *= friction;
        dy *= friction;
  
        theta += (dx * 2 * Math.PI) / CANVAS.width;
        alpha += (dy * 2 * Math.PI) / CANVAS.height;
      }
  
  
    /*=========================================================== */
    /*======================= TIME CONTROL ====================== */
    /*=========================================================== */
    
    //   
    // BADAN
    // 
      BADAN_MATRIX = LIBS.get_I4();
  
  
    //   
    // KEPALA
    // 
      KEPALA_MATRIX =  LIBS.get_I4();
  
    // 
    // TANGAN KIRI
    // 
      TANGAN_KIRI_ATAS_MATRIX = LIBS.get_I4();
      TANGAN_KIRI_BAWAH_MATRIX = LIBS.get_I4();
  
    // 
    // TANGAN KANAN
    // 
      TANGAN_KANAN_ATAS_MATRIX = LIBS.get_I4();
      TANGAN_KANAN_BAWAH_MATRIX = LIBS.get_I4();
  
  
    //   
    // KAKI KIRI
    // 
    
    KAKI_KIRI_ATAS_MATRIX = LIBS.get_I4();
    KAKI_KIRI_BAWAH_MATRIX = LIBS.get_I4();
    var KF_KakiKiriAtas = 0;
    var KF_KakiKiriBawah = 0;
  
    if(time < 10){
      if(KakiKiriTime <= -10){
        KakiKiriReverse = false;
      }else if(KakiKiriTime >= 10){
        KakiKiriReverse = true;
      }
  
      if(KakiKiriReverse){
        KakiKiriTime -= deltaTime;
      }else{
        KakiKiriTime += deltaTime;
      }
      console.log(KakiKiriTime)
      KF_KakiKiriAtas = LIBS.degToRad(KakiKiriTime);
      KF_KakiKiriBawah = LIBS.degToRad(KakiKiriTime);
    }
    // 
    // KAKI KANAN
    // 
    KAKI_KANAN_ATAS_MATRIX = LIBS.get_I4();
    KAKI_KANAN_BAWAH_MATRIX = LIBS.get_I4();
    var KF_KakiKananAtas = 0;
    var KF_KakiKananBawah = 0;
  
    if(time < 10){
    if(KakiKananTime <= -10){
      KakiKananReverse = true;
    }else if(KakiKananTime >= 10){
      KakiKananReverse = false;
    }
    
    if(KakiKananReverse){
      KakiKananTime += deltaTime;
    }else{
      KakiKananTime -= deltaTime;
    }
       KF_KakiKananAtas = LIBS.degToRad(KakiKananTime);
       KF_KakiKananBawah = LIBS.degToRad(KakiKananTime);
    }
  
      
    /*=========================================================== */
    /*========================= ANIMASI ========================= */
    /*=========================================================== */
  
      //
      // BADAN
      //
  
      LIBS.rotateY(BADAN_MATRIX, theta);
      LIBS.rotateX(BADAN_MATRIX, alpha);
    //   LIBS.rotateX(BADAN_MATRIX, rotation[0]);
    //   LIBS.rotateY(BADAN_MATRIX, rotation[1]);
    //   LIBS.rotateZ(BADAN_MATRIX, rotation[2]);
  
      //
      // BADAN
      //
      LIBS.rotateY(KEPALA_MATRIX, theta);
      LIBS.rotateX(KEPALA_MATRIX, alpha);
  
      //
      // TANGAN KIRI
      //
      LIBS.rotateY(TANGAN_KIRI_ATAS_MATRIX, theta);
      LIBS.rotateX(TANGAN_KIRI_ATAS_MATRIX, alpha);
  
      LIBS.rotateY(TANGAN_KIRI_BAWAH_MATRIX, theta);
      LIBS.rotateX(TANGAN_KIRI_BAWAH_MATRIX, alpha);
  
  
      //
      // TANGAN KANAN
      //
      LIBS.rotateY(TANGAN_KANAN_ATAS_MATRIX, theta);
      LIBS.rotateX(TANGAN_KANAN_ATAS_MATRIX, alpha);
  
      LIBS.rotateY(TANGAN_KANAN_BAWAH_MATRIX, theta);
      LIBS.rotateX(TANGAN_KANAN_BAWAH_MATRIX, alpha);
  
  
      //
      // KAKI KIRI
      //
  
      LIBS.rotateX(KAKI_KIRI_ATAS_MATRIX, KF_KakiKiriAtas);
      LIBS.rotateX(KAKI_KIRI_BAWAH_MATRIX, KF_KakiKiriBawah);
  
      LIBS.rotateY(KAKI_KIRI_ATAS_MATRIX, theta);
      LIBS.rotateX(KAKI_KIRI_ATAS_MATRIX, alpha);
  
      LIBS.rotateY(KAKI_KIRI_BAWAH_MATRIX, theta);
      LIBS.rotateX(KAKI_KIRI_BAWAH_MATRIX, alpha);
  
  
      //
      // KAKI KANAN
      //
  
      LIBS.rotateX(KAKI_KANAN_ATAS_MATRIX, KF_KakiKananAtas);
      LIBS.rotateX(KAKI_KANAN_BAWAH_MATRIX, KF_KakiKananBawah);
  
      LIBS.rotateY(KAKI_KANAN_ATAS_MATRIX, theta);
      LIBS.rotateX(KAKI_KANAN_ATAS_MATRIX, alpha);
  
      LIBS.rotateY(KAKI_KANAN_BAWAH_MATRIX, theta);
      LIBS.rotateX(KAKI_KANAN_BAWAH_MATRIX, alpha);
  
  
  
    /*=========================================================== */
    /*======================= GAMBAR MODEL ====================== */
    /*=========================================================== */
        
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
      GL.uniformMatrix4fv(_MMatrix, false, TANGAN_KIRI_ATAS_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, tanganKiri1.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //BALL ATAS
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI2_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KIRI2_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, TANGAN_KIRI_ATAS_MATRIX);
  
  
      GL.drawElements(GL.TRIANGLES, tanganKiri2.faces.length, GL.UNSIGNED_SHORT, 0);
  
  
      //BALL Bawah
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI3_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI3_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KIRI3_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, TANGAN_KIRI_BAWAH_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, tanganKiri3.faces.length, GL.UNSIGNED_SHORT, 0);
  
  
      // TUBE BAWAH
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI4_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI4_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KIRI4_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, TANGAN_KIRI_BAWAH_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, tanganKiri4.faces.length, GL.UNSIGNED_SHORT, 0);
  
      // SPHERE TANGAN
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI5_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI5_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KIRI5_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, TANGAN_KIRI_BAWAH_MATRIX);
  
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
      GL.uniformMatrix4fv(_MMatrix, false, TANGAN_KANAN_ATAS_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, tanganKanan1.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //BALL ATAS
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN2_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KANAN2_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, TANGAN_KANAN_ATAS_MATRIX);
  
  
      GL.drawElements(GL.TRIANGLES, tanganKanan2.faces.length, GL.UNSIGNED_SHORT, 0);
  
  
      //BALL Bawah
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN3_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN3_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KANAN3_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, TANGAN_KANAN_BAWAH_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, tanganKanan3.faces.length, GL.UNSIGNED_SHORT, 0);
  
  
      // TUBE BAWAH
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN4_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN4_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KANAN4_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, TANGAN_KANAN_BAWAH_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, tanganKanan4.faces.length, GL.UNSIGNED_SHORT, 0);
  
      // SPHERE TANGAN
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN5_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN5_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KANAN5_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, TANGAN_KANAN_BAWAH_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, tanganKanan5.faces.length, GL.UNSIGNED_SHORT, 0);
  
  
      // 
      // BADAN
      // 
  
      GL.bindBuffer(GL.ARRAY_BUFFER, BADAN1_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ARRAY_BUFFER, BADAN1_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, BADAN1_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, BADAN_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, badan1.faces.length, GL.UNSIGNED_SHORT, 0);
  
      // Badan Warna
      GL.bindBuffer(GL.ARRAY_BUFFER, BADAN2_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ARRAY_BUFFER, BADAN2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, BADAN2_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, BADAN_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, badan2.faces.length, GL.UNSIGNED_SHORT, 0);
  
  
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
      GL.uniformMatrix4fv(_MMatrix, false, BADAN_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, badanBawah.faces.length, GL.UNSIGNED_SHORT, 0);
  
      // 
      // LEHER
      // 
  
      GL.bindBuffer(GL.ARRAY_BUFFER, LEHER1_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ARRAY_BUFFER, LEHER1_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, LEHER1_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, BADAN_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, leher1.faces.length, GL.UNSIGNED_SHORT, 0);
  
      // 
      // KEPALA
      // 
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KEPALA1_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ARRAY_BUFFER, KEPALA1_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KEPALA1_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, KEPALA_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, kepala1.faces.length, GL.UNSIGNED_SHORT, 0);
  
      // 
      // TELINGA
      // 
  
      // Kanan
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TELINGA1_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ARRAY_BUFFER, TELINGA1_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TELINGA1_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, KEPALA_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, telinga1.faces.length, GL.UNSIGNED_SHORT, 0);
  
      // Kiri
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TELINGA2_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ARRAY_BUFFER, TELINGA2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TELINGA2_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, KEPALA_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, telinga2.faces.length, GL.UNSIGNED_SHORT, 0);
  
       // Kanan
  
       GL.bindBuffer(GL.ARRAY_BUFFER, TELINGA3_VERTEX);
       GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
       
       GL.bindBuffer(GL.ARRAY_BUFFER, TELINGA3_COLORS);
       GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
       
       GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TELINGA3_FACES);
       
       GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
       GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
       GL.uniformMatrix4fv(_MMatrix, false, KEPALA_MATRIX);
       
       GL.drawElements(GL.TRIANGLES, telinga3.faces.length, GL.UNSIGNED_SHORT, 0);
   
       // Kiri
   
       GL.bindBuffer(GL.ARRAY_BUFFER, TELINGA4_VERTEX);
       GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
       
       GL.bindBuffer(GL.ARRAY_BUFFER, TELINGA4_COLORS);
       GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
       
       GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TELINGA4_FACES);
       
       GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
       GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
       GL.uniformMatrix4fv(_MMatrix, false, KEPALA_MATRIX);
       
       GL.drawElements(GL.TRIANGLES, telinga4.faces.length, GL.UNSIGNED_SHORT, 0);
   
      // 
      // MULUT 
      // 
  
      // RAHANG
      GL.bindBuffer(GL.ARRAY_BUFFER, RAHANG_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, RAHANG_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, RAHANG_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, KEPALA_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, rahang.faces.length, GL.UNSIGNED_SHORT, 0);
  
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
      GL.uniformMatrix4fv(_MMatrix, false, KAKI_KIRI_ATAS_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, kakiKiri1.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //BALL ATAS
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI2_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KIRI2_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, KAKI_KIRI_ATAS_MATRIX);
  
  
      GL.drawElements(GL.TRIANGLES, kakiKiri2.faces.length, GL.UNSIGNED_SHORT, 0);
  
  
      //BALL Bawah
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI3_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI3_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KIRI3_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, KAKI_KIRI_BAWAH_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, kakiKiri3.faces.length, GL.UNSIGNED_SHORT, 0);
  
  
      // TUBE BAWAH
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI4_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI4_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KIRI4_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, KAKI_KIRI_BAWAH_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, kakiKiri4.faces.length, GL.UNSIGNED_SHORT, 0);
  
      // SPHERE KAKI
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI5_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI5_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KIRI5_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, KAKI_KIRI_BAWAH_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, kakiKiri5.faces.length, GL.UNSIGNED_SHORT, 0);
  
      // 
      // MATA 
      // 
      
      // RETINA
      GL.bindBuffer(GL.ARRAY_BUFFER, MATA1_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, MATA1_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, MATA1_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, KEPALA_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, mata1.faces.length, GL.UNSIGNED_SHORT, 0);
  
      // PUPIL
  
      GL.bindBuffer(GL.ARRAY_BUFFER, MATA2_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, MATA2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, MATA2_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, KEPALA_MATRIX);
  
  
      GL.drawElements(GL.TRIANGLES, mata2.faces.length, GL.UNSIGNED_SHORT, 0);
  
  
      // RETINA
      GL.bindBuffer(GL.ARRAY_BUFFER, MATA3_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, MATA3_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, MATA3_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, KEPALA_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, mata3.faces.length, GL.UNSIGNED_SHORT, 0);
  
  
      // PUPIL
      GL.bindBuffer(GL.ARRAY_BUFFER, MATA4_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, MATA4_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, MATA4_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, KEPALA_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, mata4.faces.length, GL.UNSIGNED_SHORT, 0);
  
      // HIDUNG
      GL.bindBuffer(GL.ARRAY_BUFFER, HIDUNG_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, HIDUNG_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, HIDUNG_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, KEPALA_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, hidung.faces.length, GL.UNSIGNED_SHORT, 0);
  
  
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
      GL.uniformMatrix4fv(_MMatrix, false, KAKI_KANAN_ATAS_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, kakiKanan1.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //BALL ATAS
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN2_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KANAN2_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, KAKI_KANAN_ATAS_MATRIX);
  
  
      GL.drawElements(GL.TRIANGLES, kakiKanan2.faces.length, GL.UNSIGNED_SHORT, 0);
  
  
      //BALL Bawah
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN3_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN3_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KANAN3_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, KAKI_KANAN_BAWAH_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, kakiKanan3.faces.length, GL.UNSIGNED_SHORT, 0);
  
  
      // TUBE BAWAH
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN4_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN4_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KANAN4_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, KAKI_KANAN_BAWAH_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, kakiKanan4.faces.length, GL.UNSIGNED_SHORT, 0);
  
      // SPHERE KAKI
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN5_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN5_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KANAN5_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, KAKI_KANAN_BAWAH_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, kakiKanan5.faces.length, GL.UNSIGNED_SHORT, 0);
      GL.flush();
  
      window.requestAnimationFrame(animateSpike);
  
    };
  
    animateSpike(0);
  }
  
  window.addEventListener("load", main);
  