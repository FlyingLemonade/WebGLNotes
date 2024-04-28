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
  var bodyColor_S = [168/255, 141/255, 118/255]
  var bodyColor2_S = [255/255, 245/255, 154/255]
  var bodyColor3_S = [255/255, 218/255, 185/255]
  var collarColor_S = [255/255, 0/255, 0/255]
  var eyeColor_S = [235/255, 236/255, 240/255, 42/255, 42/255, 39/255]

  // 
  //  TANGAN KIRI
  // 
  var tanganKiri1_S = generateSphere(-5, 1.2, .55, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], 1.2, 50);
  var tanganKiri2_S = generateTube(-5, -1.4, .05, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], 3, .8, 1.2, 100);
  var tanganKiri3_S = generateSphere(-5, -1.5, .55, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], .75, 50);
  var tanganKiri4_S = generateTube(-5, -3.6, .05, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], 1.6, .6, .6, 100);
  var tanganKiri5_S = generateSphere(-5, -3.9, .55, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], .6, 50);

  // 
  // TANGAN KANAN
  // 
  var tanganKanan1_S = generateSphere(1.5, 1.2, .55, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], 1.2, 50);
  var tanganKanan2_S = generateTube(1.5, -1.4, .05, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], 3, .8, 1.2, 100);
  var tanganKanan3_S = generateSphere(1.5, -1.5, .55, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], .75, 50);
  var tanganKanan4_S = generateTube(1.5, -3.6, .05, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], 1.6, .6, .6, 100);
  var tanganKanan5_S = generateSphere(1.5, -3.9, .55, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], .6, 50);

  // 
  // BADAN
  // 
  var badan1_S = generateTube(-1.65, -2.8, 0, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], 5, 2, 3, 100);
  var badan2_S = generateTube(-1.6, -2.8, 0.9, bodyColor3_S[0], bodyColor3_S[1], bodyColor3_S[2], 4.3, 1.4, 2.2, 100);

  // 
  // BADAN BAWAH
  // 
  var badanBawah_S = generateTube(-1.65, -4.8, 0, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], 2, .5, 2, 100);

  //
  //EKOR
  //
  var ekor_S = generateTailCurve(-3.3, 0, -3.8, -2, -3.5, 6, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], 0, -Math.PI/2, -Math.PI/20);
  //var ekor_S = generateTailCurve(-3.3, 0, -3.8, -2, -3.5, 6, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], 0, -Math.PI/2, -Math.PI/20);


  // 
  // LEHER 
  //
  var leher1_S = generateTube(-1.65, 2.2, 0, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], 1, 3, 1, 100);
  var leher2_S = generateTorus(-1.65, 3.1, .6, collarColor_S[0], collarColor_S[1], collarColor_S[2], 2, .275, 100, 100, 1.85, 0, 0);

  // 
  // KEPALA 
  //
  var kepala1_S = generateTorus(-1.65, 3.8, 1, bodyColor2_S[0], bodyColor2_S[1], bodyColor2_S[2], 1.2, 1.3, 100, 100, 1.55, 0, 0);
  var kepala2_S = generateTorus(-1.65, 4.8, 1, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], .1, 2, 100, 100, 1.55, 0, 0);

  // 
  // TELINGA
  var telinga1_S = generateElipticParabloid(-2.5, 8.5, 1, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], .35, .35, .7, 100, -Math.PI/2, 0, 0);
  var telinga2_S = generateElipticParabloid(-1, 8.5, 1, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], .35, .35, .7, 100, -Math.PI/2, 0, 0);
  var telinga3_S = generateElipticParabloid(-2.5, 8.3, 1.1, bodyColor2_S[0], bodyColor2_S[1], bodyColor2_S[2], .15, .25, .35, 100, -Math.PI/2, 0, 0);
  var telinga4_S = generateElipticParabloid(-1, 8.3, 1.1, bodyColor2_S[0], bodyColor2_S[1], bodyColor2_S[2], .15, .25, .35, 100, -Math.PI/2, 0, 0);
  // 

  // 
  // MATA
  // 
  var mata1_S = generateEllipsoid(-2.3 , 5, 3 , .5, .6, .2, eyeColor_S[0], eyeColor_S[1], eyeColor_S[2], 100);
  var mata2_S = generateEllipsoid(-2.3, 4.8, 3.2 , .2, .3, .2, eyeColor_S[3], eyeColor_S[4], eyeColor_S[5], 100);
  var mata3_S = generateEllipsoid(-.8 , 5, 3 , .5, .6, .2, eyeColor_S[0], eyeColor_S[1], eyeColor_S[2], 100);
  var mata4_S = generateEllipsoid(-.8, 4.8, 3.2 , .2, .3, .2, eyeColor_S[3], eyeColor_S[4], eyeColor_S[5], 100);

  // 
  // MULUT
  // 

  var rahang_S = generateTorus(-1.65, 3.6, 2.66, bodyColor2_S[0], bodyColor2_S[1], bodyColor2_S[2], .5, .9, 100, 100, 1.55, 0, 0);

  // 
  // HIDUNG 
  // 
  var hidung_S = generateEllipsoid(-1.43, 4, 4, .2, .2, .2, eyeColor_S[3], eyeColor_S[4], eyeColor_S[5], 100);


  // 
  // KAKI KIRI
  // 

  var kakiKiri1_S = generateSphere(-2.8, -3.6, .55, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], 1, 50);
  var kakiKiri2_S = generateTube(-2.9, -5.8, .05, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], 1.5, .3, .7, 100);
  var kakiKiri3_S = generateSphere(-2.9, -5.9, .55, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], .3, 50);
  var kakiKiri4_S = generateTube(-2.9, -7.1, .05, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], 1, .3, .3, 100);
  var kakiKiri5_S = generateSphere(-2.9, -7.3, .55, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], .3, 50);


  // 
  // KAKI KANAN
  // 

  var kakiKanan1_S = generateSphere(-.4, -3.6, .55, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], 1, 50);
  var kakiKanan2_S = generateTube(-.3, -5.8, .05, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], 1.5, .3, .7, 100);
  var kakiKanan3_S = generateSphere(-.3, -5.9, .55, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], .3, 50);
  var kakiKanan4_S = generateTube(-.3, -7.1, .05, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], 1, .3, .3, 100);
  var kakiKanan5_S = generateSphere(-.3, -7.3, .55, bodyColor_S[0], bodyColor_S[1], bodyColor_S[2], .3, 50);
  // Create buffers

  // 
  // TANGAN KIRI
  // 
  var TANGAN_KIRI1_VERTEX_S = createVertexBuffer(GL, tanganKiri1_S);
  var TANGAN_KIRI1_COLORS_S = createColorBuffer(GL, tanganKiri1_S);
  var TANGAN_KIRI1_FACES_S = createFacesBuffer(GL, tanganKiri1_S);

  var TANGAN_KIRI2_VERTEX_S = createVertexBuffer(GL, tanganKiri2_S);
  var TANGAN_KIRI2_COLORS_S = createColorBuffer(GL, tanganKiri2_S);
  var TANGAN_KIRI2_FACES_S = createFacesBuffer(GL, tanganKiri2_S);

  var TANGAN_KIRI3_VERTEX_S = createVertexBuffer(GL, tanganKiri3_S);
  var TANGAN_KIRI3_COLORS_S = createColorBuffer(GL, tanganKiri3_S);
  var TANGAN_KIRI3_FACES_S = createFacesBuffer(GL, tanganKiri3_S);

  var TANGAN_KIRI4_VERTEX_S = createVertexBuffer(GL, tanganKiri4_S);
  var TANGAN_KIRI4_COLORS_S = createColorBuffer(GL, tanganKiri4_S);
  var TANGAN_KIRI4_FACES_S = createFacesBuffer(GL, tanganKiri4_S);
  
  var TANGAN_KIRI5_VERTEX_S = createVertexBuffer(GL, tanganKiri5_S);
  var TANGAN_KIRI5_COLORS_S = createColorBuffer(GL, tanganKiri5_S);
  var TANGAN_KIRI5_FACES_S = createFacesBuffer(GL, tanganKiri5_S);

  // 
  // TANGAN KANAN
  // 
  var TANGAN_KANAN1_VERTEX_S = createVertexBuffer(GL, tanganKanan1_S);
  var TANGAN_KANAN1_COLORS_S = createColorBuffer(GL, tanganKanan1_S);
  var TANGAN_KANAN1_FACES_S = createFacesBuffer(GL, tanganKanan1_S);

  var TANGAN_KANAN2_VERTEX_S = createVertexBuffer(GL, tanganKanan2_S);
  var TANGAN_KANAN2_COLORS_S = createColorBuffer(GL, tanganKanan2_S);
  var TANGAN_KANAN2_FACES_S = createFacesBuffer(GL, tanganKanan2_S);

  var TANGAN_KANAN3_VERTEX_S = createVertexBuffer(GL, tanganKanan3_S);
  var TANGAN_KANAN3_COLORS_S = createColorBuffer(GL, tanganKanan3_S);
  var TANGAN_KANAN3_FACES_S = createFacesBuffer(GL, tanganKanan3_S);

  var TANGAN_KANAN4_VERTEX_S = createVertexBuffer(GL, tanganKanan4_S);
  var TANGAN_KANAN4_COLORS_S = createColorBuffer(GL, tanganKanan4_S);
  var TANGAN_KANAN4_FACES_S = createFacesBuffer(GL, tanganKanan4_S);
  
  var TANGAN_KANAN5_VERTEX_S = createVertexBuffer(GL, tanganKanan5_S);
  var TANGAN_KANAN5_COLORS_S = createColorBuffer(GL, tanganKanan5_S);
  var TANGAN_KANAN5_FACES_S = createFacesBuffer(GL, tanganKanan5_S);


  // 
  // BADAN
  // 
  var BADAN1_VERTEX_S = createVertexBuffer(GL, badan1_S);
  var BADAN1_COLORS_S = createColorBuffer(GL, badan1_S);
  var BADAN1_FACES_S = createFacesBuffer(GL, badan1_S);

  var BADAN2_VERTEX_S = createVertexBuffer(GL, badan2_S);
  var BADAN2_COLORS_S = createColorBuffer(GL, badan2_S);
  var BADAN2_FACES_S = createFacesBuffer(GL, badan2_S);

  // 
  // BADAN BAWAH
  // 
  var BADAN_BAWAH_VERTEX_S = createVertexBuffer(GL, badanBawah_S);
  var BADAN_BAWAH_COLORS_S = createColorBuffer(GL, badanBawah_S);
  var BADAN_BAWAH_FACES_S = createFacesBuffer(GL, badanBawah_S);

  //
  // EKOR
  //
  var EKOR_VERTEX_S = createVertexBuffer(GL, ekor_S);
  var EKOR_COLORS_S = createColorBuffer(GL, ekor_S);
  var EKOR_FACES_S = createFacesBuffer(GL, ekor_S);

  // 
  // LEHER
  // 
  var LEHER1_VERTEX_S = createVertexBuffer(GL, leher1_S);
  var LEHER1_COLORS_S = createColorBuffer(GL, leher1_S);
  var LEHER1_FACES_S = createFacesBuffer(GL, leher1_S);

  var LEHER2_VERTEX_S = createVertexBuffer(GL, leher2_S);
  var LEHER2_COLORS_S = createColorBuffer(GL, leher2_S);
  var LEHER2_FACES_S = createFacesBuffer(GL, leher2_S);

  // 
  // KEPALA
  // 
  var KEPALA1_VERTEX_S = createVertexBuffer(GL, kepala1_S);
  var KEPALA1_COLORS_S = createColorBuffer(GL, kepala1_S);
  var KEPALA1_FACES_S = createFacesBuffer(GL, kepala1_S);

  var KEPALA2_VERTEX_S = createVertexBuffer(GL, kepala2_S);
  var KEPALA2_COLORS_S = createColorBuffer(GL, kepala2_S);
  var KEPALA2_FACES_S = createFacesBuffer(GL, kepala2_S);

  //
  //TELINGA
  //
  var TELINGA1_VERTEX_S = createVertexBuffer(GL, telinga1_S);
  var TELINGA1_COLORS_S = createColorBuffer(GL, telinga1_S);
  var TELINGA1_FACES_S = createFacesBuffer(GL, telinga1_S);

  var TELINGA2_VERTEX_S = createVertexBuffer(GL, telinga2_S);
  var TELINGA2_COLORS_S = createColorBuffer(GL, telinga2_S);
  var TELINGA2_FACES_S = createFacesBuffer(GL, telinga2_S);

  var TELINGA3_VERTEX_S = createVertexBuffer(GL, telinga3_S);
  var TELINGA3_COLORS_S = createColorBuffer(GL, telinga3_S);
  var TELINGA3_FACES_S = createFacesBuffer(GL, telinga3_S);

  var TELINGA4_VERTEX_S = createVertexBuffer(GL, telinga4_S);
  var TELINGA4_COLORS_S = createColorBuffer(GL, telinga4_S);
  var TELINGA4_FACES_S = createFacesBuffer(GL, telinga4_S);

  // 
  // HIDUNG
  // 
  var HIDUNG_VERTEX_S = createVertexBuffer(GL, hidung_S);
  var HIDUNG_COLORS_S = createColorBuffer(GL, hidung_S);
  var HIDUNG_FACES_S = createFacesBuffer(GL, hidung_S);

  // 
  // MATA
  // 
  var MATA1_VERTEX_S = createVertexBuffer(GL, mata1_S);
  var MATA1_COLORS_S = createColorBuffer(GL, mata1_S);
  var MATA1_FACES_S = createFacesBuffer(GL, mata1_S);

  var MATA2_VERTEX_S = createVertexBuffer(GL, mata2_S);
  var MATA2_COLORS_S = createColorBuffer(GL, mata2_S);
  var MATA2_FACES_S = createFacesBuffer(GL, mata2_S);

  var MATA3_VERTEX_S = createVertexBuffer(GL, mata3_S);
  var MATA3_COLORS_S = createColorBuffer(GL, mata3_S);
  var MATA3_FACES_S = createFacesBuffer(GL, mata3_S);

  var MATA4_VERTEX_S = createVertexBuffer(GL, mata4_S);
  var MATA4_COLORS_S = createColorBuffer(GL, mata4_S);
  var MATA4_FACES_S = createFacesBuffer(GL, mata4_S);


  // 
  // MULUT
  // 

  // RAHANG
  var RAHANG_VERTEX_S = createVertexBuffer(GL, rahang_S);
  var RAHANG_COLORS_S = createColorBuffer(GL, rahang_S);
  var RAHANG_FACES_S = createFacesBuffer(GL, rahang_S);

  // 
  // KAKI KIRI
  // 
  var KAKI_KIRI1_VERTEX_S = createVertexBuffer(GL, kakiKiri1_S);
  var KAKI_KIRI1_COLORS_S = createColorBuffer(GL, kakiKiri1_S);
  var KAKI_KIRI1_FACES_S = createFacesBuffer(GL, kakiKiri1_S);

  var KAKI_KIRI2_VERTEX_S = createVertexBuffer(GL, kakiKiri2_S);
  var KAKI_KIRI2_COLORS_S = createColorBuffer(GL, kakiKiri2_S);
  var KAKI_KIRI2_FACES_S = createFacesBuffer(GL, kakiKiri2_S);

  var KAKI_KIRI3_VERTEX_S = createVertexBuffer(GL, kakiKiri3_S);
  var KAKI_KIRI3_COLORS_S = createColorBuffer(GL, kakiKiri3_S);
  var KAKI_KIRI3_FACES_S = createFacesBuffer(GL, kakiKiri3_S);

  var KAKI_KIRI4_VERTEX_S = createVertexBuffer(GL, kakiKiri4_S);
  var KAKI_KIRI4_COLORS_S = createColorBuffer(GL, kakiKiri4_S);
  var KAKI_KIRI4_FACES_S = createFacesBuffer(GL, kakiKiri4_S);
  
  var KAKI_KIRI5_VERTEX_S = createVertexBuffer(GL, kakiKiri5_S);
  var KAKI_KIRI5_COLORS_S = createColorBuffer(GL, kakiKiri5_S);
  var KAKI_KIRI5_FACES_S = createFacesBuffer(GL, kakiKiri5_S);

  // 
  // KAKI KANAN
  // 
  var KAKI_KANAN1_VERTEX_S = createVertexBuffer(GL, kakiKanan1_S);
  var KAKI_KANAN1_COLORS_S = createColorBuffer(GL, kakiKanan1_S);
  var KAKI_KANAN1_FACES_S = createFacesBuffer(GL, kakiKanan1_S);

  var KAKI_KANAN2_VERTEX_S = createVertexBuffer(GL, kakiKanan2_S);
  var KAKI_KANAN2_COLORS_S = createColorBuffer(GL, kakiKanan2_S);
  var KAKI_KANAN2_FACES_S = createFacesBuffer(GL, kakiKanan2_S);

  var KAKI_KANAN3_VERTEX_S = createVertexBuffer(GL, kakiKanan3_S);
  var KAKI_KANAN3_COLORS_S = createColorBuffer(GL, kakiKanan3_S);
  var KAKI_KANAN3_FACES_S = createFacesBuffer(GL, kakiKanan3_S);

  var KAKI_KANAN4_VERTEX_S = createVertexBuffer(GL, kakiKanan4_S);
  var KAKI_KANAN4_COLORS_S = createColorBuffer(GL, kakiKanan4_S);
  var KAKI_KANAN4_FACES_S = createFacesBuffer(GL, kakiKanan4_S);
  
  var KAKI_KANAN5_VERTEX_S = createVertexBuffer(GL, kakiKanan5_S);
  var KAKI_KANAN5_COLORS_S = createColorBuffer(GL, kakiKanan5_S);
  var KAKI_KANAN5_FACES_S = createFacesBuffer(GL, kakiKanan5_S);

  //matrix
  var PROJECTION_MATRIX = LIBS.get_projection(40, CANVAS.width / CANVAS.height, 1, 100);
  var VIEW_MATRIX = LIBS.get_I4();
  var MODEL_MATRIX_S = LIBS.get_I4();

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


    var MODEL_MATRIX_S = LIBS.get_I4();
    LIBS.rotateY(MODEL_MATRIX_S, theta);
    LIBS.rotateX(MODEL_MATRIX_S, alpha);

    var MODEL_MATRIX2_S = LIBS.get_I4();
    LIBS.rotateX(MODEL_MATRIX2_S, Math.PI/2);
    LIBS.rotateZ(MODEL_MATRIX2_S, -Math.PI/12);
    LIBS.rotateY(MODEL_MATRIX2_S, theta);
    LIBS.rotateX(MODEL_MATRIX2_S, alpha);

    var MODEL_MATRIX3_S = LIBS.get_I4();
    LIBS.rotateX(MODEL_MATRIX3_S, Math.PI/2);
    LIBS.rotateZ(MODEL_MATRIX3_S, Math.PI/12);
    LIBS.rotateY(MODEL_MATRIX3_S, theta);
    LIBS.rotateX(MODEL_MATRIX3_S, alpha);

    var MODEL_MATRIX4_S = LIBS.get_I4();
    LIBS.rotateZ(MODEL_MATRIX4_S, Math.PI);
    LIBS.rotateY(MODEL_MATRIX4_S, Math.PI);
    LIBS.rotateY(MODEL_MATRIX4_S, theta);
    LIBS.rotateX(MODEL_MATRIX4_S, alpha);

    scale = 1.0 + 0.03 * Math.sin(Date.now() * 0.002); // Adjust speed as needed

    var SCALE_MATRIX = LIBS.get_I4();
    LIBS.fromScaling(SCALE_MATRIX, [scale, 1, scale]);

    var SCALE_MATRIX_S = LIBS.get_I4();
    LIBS.fromScaling(SCALE_MATRIX_S, [1, 1, 1]);

    // TANGAN KANAN
    //BAHU KANAN
    GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI1_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI1_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KIRI1_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX);

    GL.drawElements(GL.TRIANGLES, tanganKiri1_S.faces.length, GL.UNSIGNED_SHORT, 0);

    //LENGAN ATAS KANAN
    GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI2_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI2_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KIRI2_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX);

    GL.drawElements(GL.TRIANGLES, tanganKiri2_S.faces.length, GL.UNSIGNED_SHORT, 0);

    //SAMBUNGAN KANAN
    GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI3_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI3_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KIRI3_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);

    GL.drawElements(GL.TRIANGLES, tanganKiri3_S.faces.length, GL.UNSIGNED_SHORT, 0);

    //LENGAN BAWAH KANAN
    GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI4_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI4_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KIRI4_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);

    GL.drawElements(GL.TRIANGLES, tanganKiri4_S.faces.length, GL.UNSIGNED_SHORT, 0);

    //JARI KANAN
    GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI5_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI5_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KIRI5_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);

    GL.drawElements(GL.TRIANGLES, tanganKiri5_S.faces.length, GL.UNSIGNED_SHORT, 0);

    // TANGAN KIRI
    //BAHU ATAS KIRI
    GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN1_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN1_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KANAN1_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX);

    GL.drawElements(GL.TRIANGLES, tanganKanan1_S.faces.length, GL.UNSIGNED_SHORT, 0);

    //LENGAN ATAS KIRI
    GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN2_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN2_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KANAN2_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX);

    GL.drawElements(GL.TRIANGLES, tanganKanan2_S.faces.length, GL.UNSIGNED_SHORT, 0);

    //SAMBUNGAN KIRI
    GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN3_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN3_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KANAN3_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);

    GL.drawElements(GL.TRIANGLES, tanganKanan3_S.faces.length, GL.UNSIGNED_SHORT, 0);

    //LENGAN BAWAH KIRI
    GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN4_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN4_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KANAN4_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);

    GL.drawElements(GL.TRIANGLES, tanganKanan4_S.faces.length, GL.UNSIGNED_SHORT, 0);

    //JARI KIRI
    GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN5_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN5_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KANAN5_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);

    GL.drawElements(GL.TRIANGLES, tanganKanan5_S.faces.length, GL.UNSIGNED_SHORT, 0);


    // BADAN
    GL.bindBuffer(GL.ARRAY_BUFFER, BADAN1_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, BADAN1_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, BADAN1_FACES_S);
    
    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX);
    
    GL.drawElements(GL.TRIANGLES, badan1_S.faces.length, GL.UNSIGNED_SHORT, 0);

    //WARNA TENGAH BADAN
    GL.bindBuffer(GL.ARRAY_BUFFER, BADAN2_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, BADAN2_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, BADAN2_FACES_S);
    
    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX);
    
    GL.drawElements(GL.TRIANGLES, badan2_S.faces.length, GL.UNSIGNED_SHORT, 0);


    //BADAN BAWAH
    GL.bindBuffer(GL.ARRAY_BUFFER, BADAN_BAWAH_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, BADAN_BAWAH_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, BADAN_BAWAH_FACES_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);
    
    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    
    GL.drawElements(GL.TRIANGLES, badanBawah_S.faces.length, GL.UNSIGNED_SHORT, 0);

    //EKOR
    GL.bindBuffer(GL.ARRAY_BUFFER, EKOR_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, EKOR_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, EKOR_FACES_S);
    
    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);
    
    GL.drawElements(GL.TRIANGLES, ekor_S.faces.length, GL.UNSIGNED_SHORT, 0);

    //LEHER
    GL.bindBuffer(GL.ARRAY_BUFFER, LEHER1_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, LEHER1_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, LEHER1_FACES_S);
    
    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);
    
    GL.drawElements(GL.TRIANGLES, leher1_S.faces.length, GL.UNSIGNED_SHORT, 0);

    //RANTAI LEHER
    GL.bindBuffer(GL.ARRAY_BUFFER, LEHER2_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, LEHER2_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, LEHER2_FACES_S);
    
    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);
    
    GL.drawElements(GL.TRIANGLES, leher2_S.faces.length, GL.UNSIGNED_SHORT, 0);

    //PIPI
    GL.bindBuffer(GL.ARRAY_BUFFER, KEPALA1_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, KEPALA1_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KEPALA1_FACES_S);
    
    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);
    
    GL.drawElements(GL.TRIANGLES, kepala1_S.faces.length, GL.UNSIGNED_SHORT, 0);

    GL.bindBuffer(GL.ARRAY_BUFFER, KEPALA2_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    
    GL.bindBuffer(GL.ARRAY_BUFFER, KEPALA2_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KEPALA2_FACES_S);
    
    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);
    
    GL.drawElements(GL.TRIANGLES, kepala2_S.faces.length, GL.UNSIGNED_SHORT, 0);


    // MULUT 

    // RAHANG
    GL.bindBuffer(GL.ARRAY_BUFFER, RAHANG_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, RAHANG_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, RAHANG_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);

    GL.drawElements(GL.TRIANGLES, rahang_S.faces.length, GL.UNSIGNED_SHORT, 0);

    // KAKI KANAN
    // PINGGANG KANAN
    GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI1_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI1_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KIRI1_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);

    GL.drawElements(GL.TRIANGLES, kakiKiri1_S.faces.length, GL.UNSIGNED_SHORT, 0);

    // PAHA KANAN
    GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI2_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI2_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KIRI2_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);

    GL.drawElements(GL.TRIANGLES, kakiKiri2_S.faces.length, GL.UNSIGNED_SHORT, 0);

    // LUTUT KANAN

    GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI3_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI3_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KIRI3_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);

    GL.drawElements(GL.TRIANGLES, kakiKiri3_S.faces.length, GL.UNSIGNED_SHORT, 0);


    // BETIS KANAN
    GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI4_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI4_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KIRI4_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);

    GL.drawElements(GL.TRIANGLES, kakiKiri4_S.faces.length, GL.UNSIGNED_SHORT, 0);

    //JARI KAKI KANAN
    GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI5_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI5_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KIRI5_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);

    GL.drawElements(GL.TRIANGLES, kakiKiri5_S.faces.length, GL.UNSIGNED_SHORT, 0);

    // MATA 
    // RETINA KANAN
    GL.bindBuffer(GL.ARRAY_BUFFER, MATA1_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, MATA1_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, MATA1_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);

    GL.drawElements(GL.TRIANGLES, mata1_S.faces.length, GL.UNSIGNED_SHORT, 0);

    // PUPIL KANAN

    GL.bindBuffer(GL.ARRAY_BUFFER, MATA2_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, MATA2_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, MATA2_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);

    GL.drawElements(GL.TRIANGLES, mata2_S.faces.length, GL.UNSIGNED_SHORT, 0);

    // RETINA KIRI
    GL.bindBuffer(GL.ARRAY_BUFFER, MATA3_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, MATA3_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, MATA3_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);

    GL.drawElements(GL.TRIANGLES, mata3_S.faces.length, GL.UNSIGNED_SHORT, 0);


    // PUPIL KIRI
    GL.bindBuffer(GL.ARRAY_BUFFER, MATA4_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, MATA4_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, MATA4_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);

    GL.drawElements(GL.TRIANGLES, mata4_S.faces.length, GL.UNSIGNED_SHORT, 0);
    
    //TELINGA KANAN
    GL.bindBuffer(GL.ARRAY_BUFFER, TELINGA1_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, TELINGA1_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TELINGA1_FACES_S);
    
    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);
    
    GL.drawElements(GL.TRIANGLES, telinga1_S.faces.length, GL.UNSIGNED_SHORT, 0);

    //WARNA TELINGA KANAN
    GL.bindBuffer(GL.ARRAY_BUFFER, TELINGA3_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, TELINGA3_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TELINGA3_FACES_S);
    
    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);
    
    GL.drawElements(GL.TRIANGLES, telinga3_S.faces.length, GL.UNSIGNED_SHORT, 0);

    //TELINGA KIRI
    GL.bindBuffer(GL.ARRAY_BUFFER, TELINGA2_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, TELINGA2_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TELINGA2_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);

    GL.drawElements(GL.TRIANGLES, telinga2_S.faces.length, GL.UNSIGNED_SHORT, 0);

    //WARNA TELINGA KIRI
    var MODEL_MATRIX3_S = LIBS.get_I4();
    LIBS.rotateX(MODEL_MATRIX3_S, Math.PI/2);
    LIBS.rotateZ(MODEL_MATRIX3_S, Math.PI/12);
    LIBS.rotateY(MODEL_MATRIX3_S, theta);
    LIBS.rotateX(MODEL_MATRIX3_S, alpha);
    GL.bindBuffer(GL.ARRAY_BUFFER, TELINGA4_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, TELINGA4_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TELINGA4_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);

    GL.drawElements(GL.TRIANGLES, telinga4_S.faces.length, GL.UNSIGNED_SHORT, 0);

    // HIDUNG
    GL.bindBuffer(GL.ARRAY_BUFFER, HIDUNG_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, HIDUNG_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, HIDUNG_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);

    GL.drawElements(GL.TRIANGLES, hidung_S.faces.length, GL.UNSIGNED_SHORT, 0);

    // KAKI KIRI
    //PINGGANG KIRI
    GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN1_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN1_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KANAN1_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);

    GL.drawElements(GL.TRIANGLES, kakiKanan1_S.faces.length, GL.UNSIGNED_SHORT, 0);

    //PAHA KIRI
    GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN2_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN2_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KANAN2_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);

    GL.drawElements(GL.TRIANGLES, kakiKanan2_S.faces.length, GL.UNSIGNED_SHORT, 0);

    //LUTUT KIRI
    GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN3_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN3_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KANAN3_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);

    GL.drawElements(GL.TRIANGLES, kakiKanan3_S.faces.length, GL.UNSIGNED_SHORT, 0);

    //BETIS KIRI
    GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN4_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN4_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KANAN4_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);

    GL.drawElements(GL.TRIANGLES, kakiKanan4_S.faces.length, GL.UNSIGNED_SHORT, 0);

    //JARI KAKI KIRI
    GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN5_VERTEX_S);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN5_COLORS_S);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KANAN5_FACES_S);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX_S);
    GL.uniformMatrix4fv(_SMatrix, false, SCALE_MATRIX_S);

    GL.drawElements(GL.TRIANGLES, kakiKanan5_S.faces.length, GL.UNSIGNED_SHORT, 0);
    GL.flush();

    window.requestAnimationFrame(animate);
  };

  animate(0);
}

window.addEventListener("load", main);