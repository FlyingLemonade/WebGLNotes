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


  // COORDINATE FOR JERRY 
  // COORDINATE FOR JERRY 
  // COORDINATE FOR JERRY 
  // COORDINATE FOR JERRY 
  // COORDINATE FOR JERRY 
  // COORDINATE FOR JERRY 


  
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

  
  // 
  // KECILIN JERRY
  // 
  var scaleFactor = 0.02; 
  var childJerry = [
    tanganKiri1, tanganKiri2, tanganKiri3, tanganKiri4, tanganKiri5,
    tanganKanan1, tanganKanan2, tanganKanan3, tanganKanan4, tanganKanan5,
    badan1, badan2,
    badanBawah,
    leher1,
    kepala1,
    telinga1, telinga2, telinga3, telinga4,
    mata1, mata2, mata3, mata4,
    rahang,
    hidung,
    kakiKiri1, kakiKiri2, kakiKiri3, kakiKiri4, kakiKiri5,
    kakiKanan1, kakiKanan2, kakiKanan3, kakiKanan4, kakiKanan5
  ];
  
  for(var i = 0;  i < childJerry.length ; i++){
    childJerry[i].vertices = childJerry[i].vertices.map(coord => coord * scaleFactor);
  }
 
// 
// GESER-GESER JERRY
// 
var geserX = 0;
var geserY = .5;
var geserZ = 5;

for (var i = 0; i < childJerry.length; i++) {
    for (var j = 0; j < childJerry[i].vertices.length; j += 3) {
        childJerry[i].vertices[j] += geserX;
    }
    for (var j = 1; j < childJerry[i].vertices.length; j += 3) {
      childJerry[i].vertices[j] += geserY;
    }
    for (var j = 2; j < childJerry[i].vertices.length; j += 3) {
      childJerry[i].vertices[j] += geserZ;
    }
}


// END COORDINATE FOR JERRY 
// END COORDINATE FOR JERRY 
// END COORDINATE FOR JERRY 
// END COORDINATE FOR JERRY 
// END COORDINATE FOR JERRY 
// END COORDINATE FOR JERRY 

// COORDINATE FOR TOM
// COORDINATE FOR TOM
// COORDINATE FOR TOM
// COORDINATE FOR TOM 
// COORDINATE FOR TOM 
// COORDINATE FOR TOM 


  
  // 
  // COLOR
  // 
  var bodyColor_t = [128/255, 128/255, 128/255]
  var bodyColor2_t = [191/255, 191/255, 191/255]
  var eyeColor_t = [255/255, 255/255, 102/255, 42/255, 42/255, 39/255]

  //
  // EKOR
  //
  var ekor_t = generateTomTail([[-1.65, -2.8,-5], [-2,-4,-6], [2,-2,-7], [1,1,-7]], 100, 4, 0.3);

  // 
  //  TANGAN KIRI
  // 
  var tanganKiri1_t = generateSphere(-4.5, 2, .55, bodyColor_t[0], bodyColor_t[1], bodyColor_t[2], .7, 50);
  var tanganKiri2_t = generateTube(-4.5, -1.4, .05, bodyColor_t[0], bodyColor_t[1], bodyColor_t[2], 3, .6, .6, 1000);
  var tanganKiri3_t = generateSphere(-4.5, -1.5, .55, bodyColor_t[0], bodyColor_t[1], bodyColor_t[2], .6, 50);
  var tanganKiri4_t = generateTube(-4.5, -3.4, .05, bodyColor_t[0], bodyColor_t[1], bodyColor_t[2], 1.6, .5, .5, 100);
  var tanganKiri5_t = generateSphere(-4.5, -3.8, .55, bodyColor2_t[0], bodyColor2_t[1], bodyColor2_t[2], .6, 50);

  // 
  // TANGAN KANAN
  // 
  var tanganKanan1_t = generateSphere(1.2, 2, .55, bodyColor_t[0], bodyColor_t[1], bodyColor_t[2], .7, 50);
  var tanganKanan2_t = generateTube(1.2, -1.4, .05, bodyColor_t[0], bodyColor_t[1], bodyColor_t[2], 3, .6, .6, 100);
  var tanganKanan3_t = generateSphere(1.2, -1.5, .55, bodyColor_t[0], bodyColor_t[1], bodyColor_t[2], .6, 50);
  var tanganKanan4_t = generateTube(1.2, -3.4, .05, bodyColor_t[0], bodyColor_t[1], bodyColor_t[2], 1.6, .5, .5, 100);
  var tanganKanan5_t = generateSphere(1.2, -3.8, .55, bodyColor2_t[0], bodyColor2_t[1], bodyColor2_t[2], .6, 50);

  // 
  // BADAN
  // 
  var badan1_t = generateTube(-1.65, -2.8, 0, bodyColor_t[0], bodyColor_t[1], bodyColor_t[2], 5, 1.8, 2.3, 100);
  var badan2_t = generateTube(-1.6, -2.6, 0.8, bodyColor2_t[0], bodyColor2_t[1], bodyColor2_t[2], 4, 1.35, 1.4, 100);

  // 
  // BADAN BAWAH
  // 
  var badanBawah_t = generateTube(-1.65, -4.2, 0, bodyColor_t[0], bodyColor_t[1], bodyColor_t[2], 2, .8, 1.8, 100);

  // 
  // LEHER 
  //
  var leher1_t = generateTube(-1.65, 2.2, 0, bodyColor_t[0], bodyColor_t[1], bodyColor_t[2], 1, 2.3, 1, 100);

  // 
  // KEPALA 
  //
  var kepala1_t = generateTorus(-1.65, 3.9, .1, bodyColor_t[0], bodyColor_t[1], bodyColor_t[2], 1.2, 0.7, 100, 100, 1.55, 0, 0);
  var kepala2_t = generateTorus(-1.65, 4.9, .1, bodyColor_t[0], bodyColor_t[1], bodyColor_t[2], .1, 1.93, 100, 100, 1.55, 0, 0);

  // 
  // TELINGA
  // 
  var telinga1_t = generateElipticParabloid(.2, 7.2, .1, bodyColor_t[0], bodyColor_t[1], bodyColor_t[2], .7, .5, .5, 100, 1.6, 0, -2.6);
  var telinga2_t = generateElipticParabloid(-3.5, 7.2, .1, bodyColor_t[0], bodyColor_t[1], bodyColor_t[2], .7, .5, .5, 100, 1.6, 0, 2.6);

  var telinga3_t = generateElipticParabloid(.2, 7, .3, bodyColor2_t[0], bodyColor_t[1], bodyColor_t[2], .4, .4, .4, 100, 1.55, 0, -2.6);
  var telinga4_t = generateElipticParabloid(-3.5, 7, .3, bodyColor2_t[0], bodyColor_t[1], bodyColor_t[2], .4, .4, .4, 100, 1.55, 0, 2.6);

  // 
  // MATA
  // 
  var mata1_t = generateEllipsoid(-2.3 , 5, 2 , .5, .6, .2, eyeColor_t[0], eyeColor_t[1], eyeColor_t[2], 100);
  var mata2_t = generateEllipsoid(-2.3, 4.8, 2.1 , .2, .3, .2, eyeColor_t[3], eyeColor_t[4], eyeColor_t[5], 100);
  var mata3_t = generateEllipsoid(-.8 , 5, 2 , .5, .6, .2, eyeColor_t[0], eyeColor_t[1], eyeColor_t[2], 100);
  var mata4_t = generateEllipsoid(-.8, 4.8, 2.1 , .2, .3, .2, eyeColor_t[3], eyeColor_t[4], eyeColor_t[5], 100);
  var mata5_t = generateElipticParabloid(-1, 5.8, 1.9, eyeColor_t[3], eyeColor_t[4], eyeColor_t[5], .3, .1, .1, 100, 0, 3, 0);
  var mata6_t = generateElipticParabloid(-2.1, 5.8, 1.9, eyeColor_t[3], eyeColor_t[4], eyeColor_t[5], .3, .1, .1, 100, 0, 3, 0);
 
  // 
  // MULUT
  // 

  var rahang_t = generateTorus(-1.55, 3.68, 1.3, bodyColor2_t[0], bodyColor2_t[1], bodyColor2_t[2], .5, .8, 100, 100, 1.55, 0, 0);

  // 
  // HIDUNG 
  // 
  var hidung_t = generateEllipsoid(-1.43, 3.8, 2.6, .2, .2, .2, eyeColor_t[3], eyeColor_t[4], eyeColor_t[5], 100);

  // 
  // KAKI KIRI
  // 

  var kakiKiri1_t = generateSphere(-2.8, -3.5, .55, bodyColor_t[0], bodyColor_t[1], bodyColor_t[2], .8, 50);
  var kakiKiri2_t = generateTube(-2.9, -5.4, .05, bodyColor_t[0], bodyColor_t[1], bodyColor_t[2], 1.5, .4, .6, 100);
  var kakiKiri3_t = generateSphere(-2.9, -5.5, .55, bodyColor_t[0], bodyColor_t[1], bodyColor_t[2], .4, 50);
  var kakiKiri4_t = generateTube(-2.9, -6.7, .05, bodyColor_t[0], bodyColor_t[1], bodyColor_t[2], 1, .3, .4, 100);
  var kakiKiri5_t = generateSphere(-2.9, -7.1, .55, bodyColor2_t[0], bodyColor2_t[1], bodyColor2_t[2], .5, 50);

  // 
  // KAKI KANAN
  // 

  var kakiKanan1_t = generateSphere(-.4, -3.5, .55, bodyColor_t[0], bodyColor_t[1], bodyColor_t[2], .8, 50);
  var kakiKanan2_t = generateTube(-.3, -5.4, .05, bodyColor_t[0], bodyColor_t[1], bodyColor_t[2], 1.5, .4, .6, 100);
  var kakiKanan3_t = generateSphere(-.3, -5.5, .55, bodyColor_t[0], bodyColor_t[1], bodyColor_t[2], .4, 50);
  var kakiKanan4_t = generateTube(-.3, -6.7, .05, bodyColor_t[0], bodyColor_t[1], bodyColor_t[2], 1, .3, .4, 100);
  var kakiKanan5_t = generateSphere(-.3, -7.1, .55, bodyColor2_t[0], bodyColor2_t[1], bodyColor2_t[2], .5, 50);

  // 
  // KECILIN TOM
  // 
  var scaleFactor = 0.08; 
  var childTom = [
    ekor_t, tanganKiri1_t, tanganKiri2_t, tanganKiri3_t, tanganKiri4_t, tanganKiri5_t,
    tanganKanan1_t, tanganKanan2_t, tanganKanan3_t, tanganKanan4_t, tanganKanan5_t,
    badan1_t, badan2_t,
    badanBawah_t,
    leher1_t,
    kepala1_t, kepala2_t,
    telinga1_t, telinga2_t, telinga3_t, telinga4_t,
    mata1_t, mata2_t, mata3_t, mata4_t,mata5_t, mata6_t,
    rahang_t,
    hidung_t,
    kakiKiri1_t, kakiKiri2_t, kakiKiri3_t, kakiKiri4_t, kakiKiri5_t,
    kakiKanan1_t, kakiKanan2_t, kakiKanan3_t, kakiKanan4_t, kakiKanan5_t
  ];
  
  for(var i = 0;  i < childTom.length ; i++){
    childTom[i].vertices = childTom[i].vertices.map(coord => coord * scaleFactor);
  }
 
// 
// GESER-GESER TOM
// 
var geserX = 1;
var geserY = .75;
var geserZ = 5;

for (var i = 0; i < childTom.length; i++) {
    for (var j = 0; j < childTom[i].vertices.length; j += 3) {
        childTom[i].vertices[j] += geserX;
    }
    for (var j = 1; j < childTom[i].vertices.length; j += 3) {
      childTom[i].vertices[j] += geserY;
    }
    for (var j = 2; j < childTom[i].vertices.length; j += 3) {
      childTom[i].vertices[j] += geserZ;
    }
}


// END COORDINATE FOR TOM 
// END COORDINATE FOR TOM 
// END COORDINATE FOR TOM 
// END COORDINATE FOR TOM 
// END COORDINATE FOR TOM 
// END COORDINATE FOR TOM

// COORDINATE FOR ENVIRONTMENT
// COORDINATE FOR ENVIRONTMENT
// COORDINATE FOR ENVIRONTMENT
// COORDINATE FOR ENVIRONTMENT
// COORDINATE FOR ENVIRONTMENT
// COORDINATE FOR ENVIRONTMENT

var houseColor = [220/255, 211/255, 195/255];
var roofColor = [165/255, 72/255, 66/255];
var doorColor = [0, 0, 0];
var cloudColor = [211/255, 211/255, 211/255];
var pathColor = [232/255, 160/255, 87/255];

var world = generateWorld(40,40,.3);

var house1 = generateCube(0, 1.6, 0, houseColor[0], houseColor[1], houseColor[2], 6, 4, 3);
var house2 = generateTube(4.23, -3, 0, houseColor[0], houseColor[1], houseColor[2], 6, 2.3, 2.3, 3);
var house3 = generateCube(3.4, 3, 0, roofColor[0], roofColor[1], roofColor[2], .2, 8, 5);
var house4 = generateCube(3.4, 3, 0, roofColor[0], roofColor[1], roofColor[2], .2, 8, 5);
var house5 = generateTube(6.3, -4, 0, roofColor[0], roofColor[1], roofColor[2], 8, .4, .4, 100);
var door = generateElipticParabloid(0, 1.7, 1.9, doorColor[2], doorColor[1], doorColor[2], .4, .4, .4, 100, 1.9, 0, LIBS.degToRad(180));


var cloudA1 = generateSphere(7, 7, 5, cloudColor[0], cloudColor[1], cloudColor[2], 1, 50)
var cloudA2 = generateSphere(8, 7.5, 3.5, cloudColor[0], cloudColor[1], cloudColor[2], 1, 50)
var cloudA3 = generateSphere(6, 6.5, 4.3, cloudColor[0], cloudColor[1], cloudColor[2], 1, 50)
var cloudA4 = generateSphere(7, 8, 5, cloudColor[0], cloudColor[1], cloudColor[2], 1, 50)
var cloudA5 = generateSphere(8.3, 7, 5, cloudColor[0], cloudColor[1], cloudColor[2], 1, 50)
var cloudA6 = generateSphere(8, 7, 6, cloudColor[0], cloudColor[1], cloudColor[2], 1, 50)

var cloudB1 = generateSphere(-7, 7, 2, cloudColor[0], cloudColor[1], cloudColor[2], 1, 50)
var cloudB2 = generateSphere(-8, 7.5, 1.3, cloudColor[0], cloudColor[1], cloudColor[2], 1, 50)
var cloudB3 = generateSphere(-6, 6.5, 2.3, cloudColor[0], cloudColor[1], cloudColor[2], 1, 50)
var cloudB4 = generateSphere(-7, 8, 3, cloudColor[0], cloudColor[1], cloudColor[2], 1, 50)
var cloudB5 = generateSphere(-8.3, 7, 2, cloudColor[0], cloudColor[1], cloudColor[2], 1, 50)
var cloudB6 = generateSphere(-8, 7, 1, cloudColor[0], cloudColor[1], cloudColor[2], 1, 50)

var path = generateCube(0, .12, 9.5, pathColor[0], pathColor[1], pathColor[2], 2, 23, 0.1);

// END COORDINATE FOR ENVIRONTMENT
// END COORDINATE FOR ENVIRONTMENT
// END COORDINATE FOR ENVIRONTMENT
// END COORDINATE FOR ENVIRONTMENT
// END COORDINATE FOR ENVIRONTMENT
// END COORDINATE FOR ENVIRONTMENT



//  BUFFER FOR JERRY
//  BUFFER FOR JERRY
//  BUFFER FOR JERRY
//  BUFFER FOR JERRY
//  BUFFER FOR JERRY

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

  var BUFFER_JERRY = [
    // TANGAN KIRI
    TANGAN_KIRI1_VERTEX, TANGAN_KIRI1_COLORS, TANGAN_KIRI1_FACES,
    TANGAN_KIRI2_VERTEX, TANGAN_KIRI2_COLORS, TANGAN_KIRI2_FACES,
    TANGAN_KIRI3_VERTEX, TANGAN_KIRI3_COLORS, TANGAN_KIRI3_FACES,
    TANGAN_KIRI4_VERTEX, TANGAN_KIRI4_COLORS, TANGAN_KIRI4_FACES,
    TANGAN_KIRI5_VERTEX, TANGAN_KIRI5_COLORS, TANGAN_KIRI5_FACES,

    // TANGAN KANAN
    TANGAN_KANAN1_VERTEX, TANGAN_KANAN1_COLORS, TANGAN_KANAN1_FACES,
    TANGAN_KANAN2_VERTEX, TANGAN_KANAN2_COLORS, TANGAN_KANAN2_FACES,
    TANGAN_KANAN3_VERTEX, TANGAN_KANAN3_COLORS, TANGAN_KANAN3_FACES,
    TANGAN_KANAN4_VERTEX, TANGAN_KANAN4_COLORS, TANGAN_KANAN4_FACES,
    TANGAN_KANAN5_VERTEX, TANGAN_KANAN5_COLORS, TANGAN_KANAN5_FACES,

    // BADAN
    BADAN1_VERTEX, BADAN1_COLORS, BADAN1_FACES,
    BADAN2_VERTEX, BADAN2_COLORS, BADAN2_FACES,

    // BADAN BAWAH
    BADAN_BAWAH_VERTEX, BADAN_BAWAH_COLORS, BADAN_BAWAH_FACES,

    // LEHER
    LEHER1_VERTEX, LEHER1_COLORS, LEHER1_FACES,

    // KEPALA
    KEPALA1_VERTEX, KEPALA1_COLORS, KEPALA1_FACES,

    // HIDUNG
    HIDUNG_VERTEX, HIDUNG_COLORS, HIDUNG_FACES,

    // MATA
    MATA1_VERTEX, MATA1_COLORS, MATA1_FACES,
    MATA2_VERTEX, MATA2_COLORS, MATA2_FACES,
    MATA3_VERTEX, MATA3_COLORS, MATA3_FACES,
    MATA4_VERTEX, MATA4_COLORS, MATA4_FACES,

    // TELINGA
    TELINGA1_VERTEX, TELINGA1_COLORS, TELINGA1_FACES,
    TELINGA2_VERTEX, TELINGA2_COLORS, TELINGA2_FACES,
    TELINGA3_VERTEX, TELINGA3_COLORS, TELINGA3_FACES,
    TELINGA4_VERTEX, TELINGA4_COLORS, TELINGA4_FACES,

    // MULUT
    RAHANG_VERTEX, RAHANG_COLORS, RAHANG_FACES,

    // KAKI KIRI
    KAKI_KIRI1_VERTEX, KAKI_KIRI1_COLORS, KAKI_KIRI1_FACES,
    KAKI_KIRI2_VERTEX, KAKI_KIRI2_COLORS, KAKI_KIRI2_FACES,
    KAKI_KIRI3_VERTEX, KAKI_KIRI3_COLORS, KAKI_KIRI3_FACES,
    KAKI_KIRI4_VERTEX, KAKI_KIRI4_COLORS, KAKI_KIRI4_FACES,
    KAKI_KIRI5_VERTEX, KAKI_KIRI5_COLORS, KAKI_KIRI5_FACES,

    // KAKI KANAN
    KAKI_KANAN1_VERTEX, KAKI_KANAN1_COLORS, KAKI_KANAN1_FACES,
    KAKI_KANAN2_VERTEX, KAKI_KANAN2_COLORS, KAKI_KANAN2_FACES,
    KAKI_KANAN3_VERTEX, KAKI_KANAN3_COLORS, KAKI_KANAN3_FACES,
    KAKI_KANAN4_VERTEX, KAKI_KANAN4_COLORS, KAKI_KANAN4_FACES,
    KAKI_KANAN5_VERTEX, KAKI_KANAN5_COLORS, KAKI_KANAN5_FACES
];


//  END BUFFER FOR JERRY
//  END BUFFER FOR JERRY
//  END BUFFER FOR JERRY
//  END BUFFER FOR JERRY
//  END BUFFER FOR JERRY
//  END BUFFER FOR JERRY
//  END BUFFER FOR JERRY

//  BUFFER FOR TOM
//  BUFFER FOR TOM
//  BUFFER FOR TOM
//  BUFFER FOR TOM
//  BUFFER FOR TOM

  //
  // EKOR
  //
  var EKOR_VERTEX_t = createVertexBuffer(GL, ekor_t);
  var EKOR_COLORS_t = createColorBuffer(GL, ekor_t);
  var EKOR_FACES_t = createFacesBuffer(GL, ekor_t);

  // 
  // TANGAN KIRI
  // 
  var TANGAN_KIRI1_VERTEX_t = createVertexBuffer(GL, tanganKiri1_t);
  var TANGAN_KIRI1_COLORS_t = createColorBuffer(GL, tanganKiri1_t);
  var TANGAN_KIRI1_FACES_t = createFacesBuffer(GL, tanganKiri1_t);

  var TANGAN_KIRI2_VERTEX_t = createVertexBuffer(GL, tanganKiri2_t);
  var TANGAN_KIRI2_COLORS_t = createColorBuffer(GL, tanganKiri2_t);
  var TANGAN_KIRI2_FACES_t = createFacesBuffer(GL, tanganKiri2_t);

  var TANGAN_KIRI3_VERTEX_t = createVertexBuffer(GL, tanganKiri3_t);
  var TANGAN_KIRI3_COLORS_t = createColorBuffer(GL, tanganKiri3_t);
  var TANGAN_KIRI3_FACES_t = createFacesBuffer(GL, tanganKiri3_t);

  var TANGAN_KIRI4_VERTEX_t = createVertexBuffer(GL, tanganKiri4_t);
  var TANGAN_KIRI4_COLORS_t = createColorBuffer(GL, tanganKiri4_t);
  var TANGAN_KIRI4_FACES_t = createFacesBuffer(GL, tanganKiri4_t);
  
  var TANGAN_KIRI5_VERTEX_t = createVertexBuffer(GL, tanganKiri5_t);
  var TANGAN_KIRI5_COLORS_t = createColorBuffer(GL, tanganKiri5_t);
  var TANGAN_KIRI5_FACES_t = createFacesBuffer(GL, tanganKiri5_t);

  // 
  // TANGAN KANAN
  // 
  var TANGAN_KANAN1_VERTEX_t = createVertexBuffer(GL, tanganKanan1_t);
  var TANGAN_KANAN1_COLORS_t = createColorBuffer(GL, tanganKanan1_t);
  var TANGAN_KANAN1_FACES_t = createFacesBuffer(GL, tanganKanan1_t);

  var TANGAN_KANAN2_VERTEX_t = createVertexBuffer(GL, tanganKanan2_t);
  var TANGAN_KANAN2_COLORS_t = createColorBuffer(GL, tanganKanan2_t);
  var TANGAN_KANAN2_FACES_t = createFacesBuffer(GL, tanganKanan2_t);

  var TANGAN_KANAN3_VERTEX_t = createVertexBuffer(GL, tanganKanan3_t);
  var TANGAN_KANAN3_COLORS_t = createColorBuffer(GL, tanganKanan3_t);
  var TANGAN_KANAN3_FACES_t = createFacesBuffer(GL, tanganKanan3_t);

  var TANGAN_KANAN4_VERTEX_t = createVertexBuffer(GL, tanganKanan4_t);
  var TANGAN_KANAN4_COLORS_t = createColorBuffer(GL, tanganKanan4_t);
  var TANGAN_KANAN4_FACES_t = createFacesBuffer(GL, tanganKanan4_t);
  
  var TANGAN_KANAN5_VERTEX_t = createVertexBuffer(GL, tanganKanan5_t);
  var TANGAN_KANAN5_COLORS_t = createColorBuffer(GL, tanganKanan5_t);
  var TANGAN_KANAN5_FACES_t = createFacesBuffer(GL, tanganKanan5_t);


  // 
  // BADAN
  // 
  var BADAN1_VERTEX_t = createVertexBuffer(GL, badan1_t);
  var BADAN1_COLORS_t = createColorBuffer(GL, badan1_t);
  var BADAN1_FACES_t = createFacesBuffer(GL, badan1_t);

  var BADAN2_VERTEX_t = createVertexBuffer(GL, badan2_t);
  var BADAN2_COLORS_t = createColorBuffer(GL, badan2_t);
  var BADAN2_FACES_t = createFacesBuffer(GL, badan2_t);

  // 
  // BADAN BAWAH
  // 
  var BADAN_BAWAH_VERTEX_t = createVertexBuffer(GL, badanBawah_t);
  var BADAN_BAWAH_COLORS_t = createColorBuffer(GL, badanBawah_t);
  var BADAN_BAWAH_FACES_t = createFacesBuffer(GL, badanBawah_t);

  // 
  // LEHER
  // 
  var LEHER1_VERTEX_t = createVertexBuffer(GL, leher1_t);
  var LEHER1_COLORS_t = createColorBuffer(GL, leher1_t);
  var LEHER1_FACES_t = createFacesBuffer(GL, leher1_t);

  // 
  // KEPALA
  // 
  var KEPALA1_VERTEX_t = createVertexBuffer(GL, kepala1_t);
  var KEPALA1_COLORS_t = createColorBuffer(GL, kepala1_t);
  var KEPALA1_FACES_t = createFacesBuffer(GL, kepala1_t);

  var KEPALA2_VERTEX_t = createVertexBuffer(GL, kepala2_t);
  var KEPALA2_COLORS_t = createColorBuffer(GL, kepala2_t);
  var KEPALA2_FACES_t = createFacesBuffer(GL, kepala2_t);

  // 
  // HIDUNG
  // 

  var HIDUNG_VERTEX_t = createVertexBuffer(GL, hidung_t);
  var HIDUNG_COLORS_t = createColorBuffer(GL, hidung_t);
  var HIDUNG_FACES_t = createFacesBuffer(GL, hidung_t);

  // 
  // MATA
  // 
  var MATA1_VERTEX_t = createVertexBuffer(GL, mata1_t);
  var MATA1_COLORS_t = createColorBuffer(GL, mata1_t);
  var MATA1_FACES_t = createFacesBuffer(GL, mata1_t);

  var MATA2_VERTEX_t = createVertexBuffer(GL, mata2_t);
  var MATA2_COLORS_t = createColorBuffer(GL, mata2_t);
  var MATA2_FACES_t = createFacesBuffer(GL, mata2_t);

  var MATA3_VERTEX_t = createVertexBuffer(GL, mata3_t);
  var MATA3_COLORS_t = createColorBuffer(GL, mata3_t);
  var MATA3_FACES_t = createFacesBuffer(GL, mata3_t);

  var MATA4_VERTEX_t = createVertexBuffer(GL, mata4_t);
  var MATA4_COLORS_t = createColorBuffer(GL, mata4_t);
  var MATA4_FACES_t = createFacesBuffer(GL, mata4_t);

  // 
  // TELINGA
  // 
  var TELINGA1_VERTEX_t = createVertexBuffer(GL, telinga1_t);
  var TELINGA1_COLORS_t = createColorBuffer(GL, telinga1_t);
  var TELINGA1_FACES_t = createFacesBuffer(GL, telinga1_t);

  var TELINGA2_VERTEX_t = createVertexBuffer(GL, telinga2_t);
  var TELINGA2_COLORS_t = createColorBuffer(GL, telinga2_t);
  var TELINGA2_FACES_t = createFacesBuffer(GL, telinga2_t);

  var TELINGA3_VERTEX_t = createVertexBuffer(GL, telinga3_t);
  var TELINGA3_COLORS_t = createColorBuffer(GL, telinga3_t);
  var TELINGA3_FACES_t = createFacesBuffer(GL, telinga3_t);

  var TELINGA4_VERTEX_t = createVertexBuffer(GL, telinga4_t);
  var TELINGA4_COLORS_t = createColorBuffer(GL, telinga4_t);
  var TELINGA4_FACES_t = createFacesBuffer(GL, telinga4_t);


  // 
  // MULUT
  // 

  // RAHANG
  var RAHANG_VERTEX_t = createVertexBuffer(GL, rahang_t);
  var RAHANG_COLORS_t = createColorBuffer(GL, rahang_t);
  var RAHANG_FACES_t = createFacesBuffer(GL, rahang_t);



  // 
  // KAKI KIRI
  // 
  var KAKI_KIRI1_VERTEX_t = createVertexBuffer(GL, kakiKiri1_t);
  var KAKI_KIRI1_COLORS_t = createColorBuffer(GL, kakiKiri1_t);
  var KAKI_KIRI1_FACES_t = createFacesBuffer(GL, kakiKiri1_t);

  var KAKI_KIRI2_VERTEX_t = createVertexBuffer(GL, kakiKiri2_t);
  var KAKI_KIRI2_COLORS_t = createColorBuffer(GL, kakiKiri2_t);
  var KAKI_KIRI2_FACES_t = createFacesBuffer(GL, kakiKiri2_t);

  var KAKI_KIRI3_VERTEX_t = createVertexBuffer(GL, kakiKiri3_t);
  var KAKI_KIRI3_COLORS_t = createColorBuffer(GL, kakiKiri3_t);
  var KAKI_KIRI3_FACES_t = createFacesBuffer(GL, kakiKiri3_t);

  var KAKI_KIRI4_VERTEX_t = createVertexBuffer(GL, kakiKiri4_t);
  var KAKI_KIRI4_COLORS_t = createColorBuffer(GL, kakiKiri4_t);
  var KAKI_KIRI4_FACES_t = createFacesBuffer(GL, kakiKiri4_t);
  
  var KAKI_KIRI5_VERTEX_t = createVertexBuffer(GL, kakiKiri5_t);
  var KAKI_KIRI5_COLORS_t = createColorBuffer(GL, kakiKiri5_t);
  var KAKI_KIRI5_FACES_t = createFacesBuffer(GL, kakiKiri5_t);

  // 
  // KAKI KANAN
  // 
  var KAKI_KANAN1_VERTEX_t = createVertexBuffer(GL, kakiKanan1_t);
  var KAKI_KANAN1_COLORS_t = createColorBuffer(GL, kakiKanan1_t);
  var KAKI_KANAN1_FACES_t = createFacesBuffer(GL, kakiKanan1_t);

  var KAKI_KANAN2_VERTEX_t = createVertexBuffer(GL, kakiKanan2_t);
  var KAKI_KANAN2_COLORS_t = createColorBuffer(GL, kakiKanan2_t);
  var KAKI_KANAN2_FACES_t = createFacesBuffer(GL, kakiKanan2_t);

  var KAKI_KANAN3_VERTEX_t = createVertexBuffer(GL, kakiKanan3_t);
  var KAKI_KANAN3_COLORS_t = createColorBuffer(GL, kakiKanan3_t);
  var KAKI_KANAN3_FACES_t = createFacesBuffer(GL, kakiKanan3_t);

  var KAKI_KANAN4_VERTEX_t = createVertexBuffer(GL, kakiKanan4_t);
  var KAKI_KANAN4_COLORS_t = createColorBuffer(GL, kakiKanan4_t);
  var KAKI_KANAN4_FACES_t = createFacesBuffer(GL, kakiKanan4_t);
  
  var KAKI_KANAN5_VERTEX_t = createVertexBuffer(GL, kakiKanan5_t);
  var KAKI_KANAN5_COLORS_t = createColorBuffer(GL, kakiKanan5_t);
  var KAKI_KANAN5_FACES_t = createFacesBuffer(GL, kakiKanan5_t);

  var BUFFER_TOM = [
    // EKOR
    EKOR_VERTEX_t, EKOR_COLORS_t, EKOR_FACES_t,

    // TANGAN KIRI
    TANGAN_KIRI1_VERTEX_t, TANGAN_KIRI1_COLORS_t, TANGAN_KIRI1_FACES_t,
    TANGAN_KIRI2_VERTEX_t, TANGAN_KIRI2_COLORS_t, TANGAN_KIRI2_FACES_t,
    TANGAN_KIRI3_VERTEX_t, TANGAN_KIRI3_COLORS_t, TANGAN_KIRI3_FACES_t,
    TANGAN_KIRI4_VERTEX_t, TANGAN_KIRI4_COLORS_t, TANGAN_KIRI4_FACES_t,
    TANGAN_KIRI5_VERTEX_t, TANGAN_KIRI5_COLORS_t, TANGAN_KIRI5_FACES_t,

    // TANGAN KANAN
    TANGAN_KANAN1_VERTEX_t, TANGAN_KANAN1_COLORS_t, TANGAN_KANAN1_FACES_t,
    TANGAN_KANAN2_VERTEX_t, TANGAN_KANAN2_COLORS_t, TANGAN_KANAN2_FACES_t,
    TANGAN_KANAN3_VERTEX_t, TANGAN_KANAN3_COLORS_t, TANGAN_KANAN3_FACES_t,
    TANGAN_KANAN4_VERTEX_t, TANGAN_KANAN4_COLORS_t, TANGAN_KANAN4_FACES_t,
    TANGAN_KANAN5_VERTEX_t, TANGAN_KANAN5_COLORS_t, TANGAN_KANAN5_FACES_t,

    // BADAN
    BADAN1_VERTEX_t, BADAN1_COLORS_t, BADAN1_FACES_t,
    BADAN2_VERTEX_t, BADAN2_COLORS_t, BADAN2_FACES_t,

    // BADAN BAWAH
    BADAN_BAWAH_VERTEX_t, BADAN_BAWAH_COLORS_t, BADAN_BAWAH_FACES_t,

    // LEHER
    LEHER1_VERTEX_t, LEHER1_COLORS_t, LEHER1_FACES_t,

    // KEPALA
    KEPALA1_VERTEX_t, KEPALA1_COLORS_t, KEPALA1_FACES_t,
    KEPALA2_VERTEX_t, KEPALA2_COLORS_t, KEPALA2_FACES_t,

    // HIDUNG
    HIDUNG_VERTEX_t, HIDUNG_COLORS_t, HIDUNG_FACES_t,

    // MATA
    MATA1_VERTEX_t, MATA1_COLORS_t, MATA1_FACES_t,
    MATA2_VERTEX_t, MATA2_COLORS_t, MATA2_FACES_t,
    MATA3_VERTEX_t, MATA3_COLORS_t, MATA3_FACES_t,
    MATA4_VERTEX_t, MATA4_COLORS_t, MATA4_FACES_t,

    // TELINGA
    TELINGA1_VERTEX_t, TELINGA1_COLORS_t, TELINGA1_FACES_t,
    TELINGA2_VERTEX_t, TELINGA2_COLORS_t, TELINGA2_FACES_t,
    TELINGA3_VERTEX_t, TELINGA3_COLORS_t, TELINGA3_FACES_t,
    TELINGA4_VERTEX_t, TELINGA4_COLORS_t, TELINGA4_FACES_t,

    // MULUT
    RAHANG_VERTEX_t, RAHANG_COLORS_t, RAHANG_FACES_t,

    // KAKI KIRI
    KAKI_KIRI1_VERTEX_t, KAKI_KIRI1_COLORS_t, KAKI_KIRI1_FACES_t,
    KAKI_KIRI2_VERTEX_t, KAKI_KIRI2_COLORS_t, KAKI_KIRI2_FACES_t,
    KAKI_KIRI3_VERTEX_t, KAKI_KIRI3_COLORS_t, KAKI_KIRI3_FACES_t,
    KAKI_KIRI4_VERTEX_t, KAKI_KIRI4_COLORS_t, KAKI_KIRI4_FACES_t,
    KAKI_KIRI5_VERTEX_t, KAKI_KIRI5_COLORS_t, KAKI_KIRI5_FACES_t,

    // KAKI KANAN
    KAKI_KANAN1_VERTEX_t, KAKI_KANAN1_COLORS_t, KAKI_KANAN1_FACES_t,
    KAKI_KANAN2_VERTEX_t, KAKI_KANAN2_COLORS_t, KAKI_KANAN2_FACES_t,
    KAKI_KANAN3_VERTEX_t, KAKI_KANAN3_COLORS_t, KAKI_KANAN3_FACES_t,
    KAKI_KANAN4_VERTEX_t, KAKI_KANAN4_COLORS_t, KAKI_KANAN4_FACES_t,
    KAKI_KANAN5_VERTEX_t, KAKI_KANAN5_COLORS_t, KAKI_KANAN5_FACES_t
];

//  END BUFFER FOR TOM
//  END BUFFER FOR TOM
//  END BUFFER FOR TOM
//  END BUFFER FOR TOM
//  END BUFFER FOR TOM

// BUFFER FOR WORLD
// BUFFER FOR WORLD
// BUFFER FOR WORLD
// BUFFER FOR WORLD
// BUFFER FOR WORLD

var WORLD_VERTEX = createVertexBuffer(GL, world);
var WORLD_COLORS = createColorBuffer(GL, world);
var WORLD_FACES = createFacesBuffer(GL, world);

var HOUSE1_VERTEX = createVertexBuffer(GL, house1);
var HOUSE1_COLORS = createColorBuffer(GL, house1);
var HOUSE1_FACES = createFacesBuffer(GL, house1);

var HOUSE2_VERTEX = createVertexBuffer(GL, house2);
var HOUSE2_COLORS = createColorBuffer(GL, house2);
var HOUSE2_FACES = createFacesBuffer(GL, house2);

var HOUSE3_VERTEX = createVertexBuffer(GL, house3);
var HOUSE3_COLORS = createColorBuffer(GL, house3);
var HOUSE3_FACES = createFacesBuffer(GL, house3);

var HOUSE4_VERTEX = createVertexBuffer(GL, house4);
var HOUSE4_COLORS = createColorBuffer(GL, house4);
var HOUSE4_FACES = createFacesBuffer(GL, house4);

var HOUSE5_VERTEX = createVertexBuffer(GL, house5);
var HOUSE5_COLORS = createColorBuffer(GL, house5);
var HOUSE5_FACES = createFacesBuffer(GL, house5);

var DOOR_VERTEX = createVertexBuffer(GL, door);
var DOOR_COLORS = createColorBuffer(GL, door);
var DOOR_FACES = createFacesBuffer(GL, door);

var CLOUDA1_VERTEX = createVertexBuffer(GL, cloudA1);
var CLOUDA1_COLORS = createColorBuffer(GL, cloudA1);
var CLOUDA1_FACES = createFacesBuffer(GL, cloudA1);

var CLOUDA2_VERTEX = createVertexBuffer(GL, cloudA2);
var CLOUDA2_COLORS = createColorBuffer(GL, cloudA2);
var CLOUDA2_FACES = createFacesBuffer(GL, cloudA2);

var CLOUDA3_VERTEX = createVertexBuffer(GL, cloudA3);
var CLOUDA3_COLORS = createColorBuffer(GL, cloudA3);
var CLOUDA3_FACES = createFacesBuffer(GL, cloudA3);

var CLOUDA4_VERTEX = createVertexBuffer(GL, cloudA4);
var CLOUDA4_COLORS = createColorBuffer(GL, cloudA4);
var CLOUDA4_FACES = createFacesBuffer(GL, cloudA4);

var CLOUDA5_VERTEX = createVertexBuffer(GL, cloudA5);
var CLOUDA5_COLORS = createColorBuffer(GL, cloudA5);
var CLOUDA5_FACES = createFacesBuffer(GL, cloudA5);

var CLOUDA6_VERTEX = createVertexBuffer(GL, cloudA6);
var CLOUDA6_COLORS = createColorBuffer(GL, cloudA6);
var CLOUDA6_FACES = createFacesBuffer(GL, cloudA6);

var CLOUDB1_VERTEX = createVertexBuffer(GL, cloudB1);
var CLOUDB1_COLORS = createColorBuffer(GL, cloudB1);
var CLOUDB1_FACES = createFacesBuffer(GL, cloudB1);

var CLOUDB2_VERTEX = createVertexBuffer(GL, cloudB2);
var CLOUDB2_COLORS = createColorBuffer(GL, cloudB2);
var CLOUDB2_FACES = createFacesBuffer(GL, cloudB2);

var CLOUDB3_VERTEX = createVertexBuffer(GL, cloudB3);
var CLOUDB3_COLORS = createColorBuffer(GL, cloudB3);
var CLOUDB3_FACES = createFacesBuffer(GL, cloudB3);

var CLOUDB4_VERTEX = createVertexBuffer(GL, cloudB4);
var CLOUDB4_COLORS = createColorBuffer(GL, cloudB4);
var CLOUDB4_FACES = createFacesBuffer(GL, cloudB4);

var CLOUDB5_VERTEX = createVertexBuffer(GL, cloudB5);
var CLOUDB5_COLORS = createColorBuffer(GL, cloudB5);
var CLOUDB5_FACES = createFacesBuffer(GL, cloudB5);

var CLOUDB6_VERTEX = createVertexBuffer(GL, cloudB6);
var CLOUDB6_COLORS = createColorBuffer(GL, cloudB6);
var CLOUDB6_FACES = createFacesBuffer(GL, cloudB6);

var PATH_VERTEX = createVertexBuffer(GL, path);
var PATH_COLORS = createColorBuffer(GL, path);
var PATH_FACES = createFacesBuffer(GL, path);

// END BUFFER FOR WORLD
// END BUFFER FOR WORLD
// END BUFFER FOR WORLD
// END BUFFER FOR WORLD
// END BUFFER FOR WORLD
// END BUFFER FOR WORLD





  /*=========================================================== */
  /*========================= MATRIX ========================= */
  /*=========================================================== */




  var PROJECTION_MATRIX = LIBS.get_projection(40, CANVAS.width / CANVAS.height, 1, 100);
  var VIEW_MATRIX = LIBS.get_I4();

  // MATRIX FOR JERRY
  // MATRIX FOR JERRY
  // MATRIX FOR JERRY
  // MATRIX FOR JERRY
  // MATRIX FOR JERRY
  // MATRIX FOR JERRY

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

  var JERRY_MATRIX = [
    // BADAN
    BADAN_MATRIX,

    // KEPALA
    KEPALA_MATRIX,

    // TANGAN KIRI
    TANGAN_KIRI_ATAS_MATRIX, TANGAN_KIRI_BAWAH_MATRIX,

    // TANGAN KANAN
    TANGAN_KANAN_ATAS_MATRIX, TANGAN_KANAN_BAWAH_MATRIX,

    // KAKI KIRI
    KAKI_KIRI_ATAS_MATRIX, KAKI_KIRI_BAWAH_MATRIX,

    // KAKI KANAN
    KAKI_KANAN_ATAS_MATRIX, KAKI_KANAN_BAWAH_MATRIX
];


  LIBS.translateZ(VIEW_MATRIX, -15);
  LIBS.translateY(VIEW_MATRIX, -1);
 
// END MATRIX FOR JERRY
// END MATRIX FOR JERRY
// END MATRIX FOR JERRY
// END MATRIX FOR JERRY
// END MATRIX FOR JERRY
// END MATRIX FOR JERRY

// MATRIX FOR TOM
// MATRIX FOR TOM
// MATRIX FOR TOM
// MATRIX FOR TOM
// MATRIX FOR TOM
// MATRIX FOR TOM

//
// TANGAN KIRI
// 
var TANGAN_KIRI_ATAS_MATRIX_t = LIBS.get_I4();
var TANGAN_KIRI_BAWAH_MATRIX_t = LIBS.get_I4();

//
// TANGAN KANAN
// 
var TANGAN_KANAN_ATAS_MATRIX_t = LIBS.get_I4();
var TANGAN_KANAN_BAWAH_MATRIX_t = LIBS.get_I4();

//
// KAKI KIRI
// 
var KAKI_KIRI_ATAS_MATRIX_t = LIBS.get_I4();
var KAKI_KIRI_BAWAH_MATRIX_t = LIBS.get_I4();

//
// KAKI KANAN
// 
var KAKI_KANAN_ATAS_MATRIX_t = LIBS.get_I4();
var KAKI_KANAN_BAWAH_MATRIX_t = LIBS.get_I4();


// 
// BADAN
// 
var BADAN_MATRIX_t =  LIBS.get_I4();

// 
// KEPALA
// 
  var KEPALA_MATRIX_t =  LIBS.get_I4();

  var TOM_MATRIX = [
    // BADAN
    BADAN_MATRIX_t,

    // KEPALA
    KEPALA_MATRIX_t,

    // TANGAN KIRI
    TANGAN_KIRI_ATAS_MATRIX_t, TANGAN_KIRI_BAWAH_MATRIX_t,

    // TANGAN KANAN
    TANGAN_KANAN_ATAS_MATRIX_t, TANGAN_KANAN_BAWAH_MATRIX_t,

    // KAKI KIRI
    KAKI_KIRI_ATAS_MATRIX_t, KAKI_KIRI_BAWAH_MATRIX_t,

    // KAKI KANAN
    KAKI_KANAN_ATAS_MATRIX_t, KAKI_KANAN_BAWAH_MATRIX_t
];

  LIBS.translateZ(VIEW_MATRIX, -15);
  LIBS.translateY(VIEW_MATRIX, -1);
 
// END MATRIX FOR TOM
// END MATRIX FOR TOM
// END MATRIX FOR TOM
// END MATRIX FOR TOM
// END MATRIX FOR TOM
// END MATRIX FOR TOM

// MATRIX FOR WORLD
// MATRIX FOR WORLD
// MATRIX FOR WORLD
// MATRIX FOR WORLD
// MATRIX FOR WORLD


var WORLD_MATRIX = LIBS.get_I4();

var HOUSE2_MATRIX = LIBS.get_I4();
var HOUSE3_MATRIX = LIBS.get_I4();
var HOUSE4_MATRIX = LIBS.get_I4();
var HOUSE5_MATRIX = LIBS.get_I4();

// END MATRIX FOR WORLD
// END MATRIX FOR WORLD
// END MATRIX FOR WORLD
// END MATRIX FOR WORLD

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

  var KF_KakiKiriAtas = 0;
  var KF_KakiKiriBawah = 0;

  //
  // KAKI KANAN
  // 
  var KakiKananTime = 0;
  var KakiKananReverse = false;

  var KF_KakiKananAtas = 0;
  var KF_KakiKananBawah = 0;

  // 
  // BADAN MUTER
  // 
  var BodyTime = 0;
  var BodyTurn = "KANAN";
  var KF_BodyThen = 0;
  var KF_Body = 0;

  /*=========================================================== */
  /*========================= ANIMATE ========================= */
  /*=========================================================== */
  var animateSpike = function (time) {
    GL.viewport(0, 0, CANVAS.width, CANVAS.height);
    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
  
    time *= 0.001

    var deltaTime = (time - then)*10;
    then = time;

  /*=========================================================== */
  /*======================= TIME CONTROL ====================== */
  /*=========================================================== */
  
  // JERRY TIME CONTROL
  // JERRY TIME CONTROL
  // JERRY TIME CONTROL
  // JERRY TIME CONTROL
  // JERRY TIME CONTROL
  // JERRY TIME CONTROL
  // JERRY TIME CONTROL
  // JERRY TIME CONTROL
  
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

  
// END JERRY TIME CONTROL
// END JERRY TIME CONTROL
// END JERRY TIME CONTROL
// END JERRY TIME CONTROL
// END JERRY TIME CONTROL
// END JERRY TIME CONTROL

// TOM TIME CONTROL
// TOM TIME CONTROL
// TOM TIME CONTROL
// TOM TIME CONTROL
// TOM TIME CONTROL
// TOM TIME CONTROL
// TOM TIME CONTROL
// TOM TIME CONTROL

LIBS.rotateY(TOM_MATRIX, LIBS.degToRad(90));

//   
// BADAN
// 
  BADAN_MATRIX_t = LIBS.get_I4();

//   
// KEPALA
// 
  KEPALA_MATRIX_t =  LIBS.get_I4();

// 
// TANGAN KIRI
// 
  TANGAN_KIRI_ATAS_MATRIX_t = LIBS.get_I4();
  TANGAN_KIRI_BAWAH_MATRIX_t = LIBS.get_I4();

// 
// TANGAN KANAN
// 
  TANGAN_KANAN_ATAS_MATRIX_t = LIBS.get_I4();
  TANGAN_KANAN_BAWAH_MATRIX_t = LIBS.get_I4();

  
// END TOM TIME CONTROL
// END TOM TIME CONTROL
// END TOM TIME CONTROL
// END TOM TIME CONTROL
// END TOM TIME CONTROL
// END TOM TIME CONTROL

// WORLD TIME CONTROL
// WORLD TIME CONTROL
// WORLD TIME CONTROL
// WORLD TIME CONTROL
// WORLD TIME CONTROL


WORLD_MATRIX = LIBS.get_I4();
LIBS.rotateY(WORLD_MATRIX, theta);

HOUSE2_MATRIX = LIBS.get_I4();
LIBS.rotateZ(HOUSE2_MATRIX, LIBS.degToRad(90));
LIBS.rotateY(HOUSE2_MATRIX, theta);

HOUSE3_MATRIX = LIBS.get_I4();
LIBS.rotateY(HOUSE3_MATRIX, LIBS.degToRad(-90));
LIBS.rotateX(HOUSE3_MATRIX, LIBS.degToRad(-30));
LIBS.rotateY(HOUSE3_MATRIX, theta);

HOUSE4_MATRIX = LIBS.get_I4();
LIBS.rotateY(HOUSE4_MATRIX, LIBS.degToRad(90));
LIBS.rotateX(HOUSE4_MATRIX, LIBS.degToRad(30));
LIBS.rotateY(HOUSE4_MATRIX, theta);

HOUSE5_MATRIX = LIBS.get_I4();
LIBS.rotateZ(HOUSE5_MATRIX, LIBS.degToRad(90));
LIBS.rotateY(HOUSE5_MATRIX, theta);


// END WORLD TIME CONTROL
// END WORLD TIME CONTROL
// END WORLD TIME CONTROL
// END WORLD TIME CONTROL
// END WORLD TIME CONTROL

    
  /*=========================================================== */
  /*=========================== DRAW ========================== */
  /*=========================================================== */

// DRAW JERRY
// DRAW JERRY
// DRAW JERRY
// DRAW JERRY
// DRAW JERRY
// DRAW JERRY
// DRAW JERRY



    // 
    // KAKI NAIK TURUN
    // 

      KAKI_KIRI_ATAS_MATRIX = LIBS.get_I4();
      KAKI_KIRI_BAWAH_MATRIX = LIBS.get_I4();

      if(time < 20){
        if(KakiKiriTime <= -.2){
          KakiKiriReverse = false;
        }else if(KakiKiriTime >= .2){
          KakiKiriReverse = true;
        }

        if(KakiKiriReverse){
          KakiKiriTime -= deltaTime;
        }else{
          KakiKiriTime += deltaTime;
        }
        
        KF_KakiKiriAtas = LIBS.degToRad(KakiKiriTime);
        KF_KakiKiriBawah = LIBS.degToRad(KakiKiriTime);
      }

      KAKI_KANAN_ATAS_MATRIX = LIBS.get_I4();
      KAKI_KANAN_BAWAH_MATRIX = LIBS.get_I4();


      if(time < 20){
      if(KakiKananTime <= -.2){
        KakiKananReverse = true;
      }else if(KakiKananTime >= .2){
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

    LIBS.rotateX(KAKI_KIRI_ATAS_MATRIX, KF_KakiKiriAtas);
    LIBS.rotateX(KAKI_KIRI_BAWAH_MATRIX, KF_KakiKiriBawah);

    LIBS.rotateX(KAKI_KANAN_ATAS_MATRIX, KF_KakiKananAtas);
    LIBS.rotateX(KAKI_KANAN_BAWAH_MATRIX, KF_KakiKananBawah);

    //
    // BADAN
    //

    // Rotate Mouse
    LIBS.rotateY(BADAN_MATRIX, theta);
    LIBS.rotateY(KEPALA_MATRIX, theta);

    LIBS.rotateY(TANGAN_KIRI_ATAS_MATRIX, theta);
    LIBS.rotateY(TANGAN_KIRI_BAWAH_MATRIX, theta);

    LIBS.rotateY(TANGAN_KANAN_ATAS_MATRIX, theta);
    LIBS.rotateY(TANGAN_KANAN_BAWAH_MATRIX, theta);

    LIBS.rotateY(KAKI_KANAN_ATAS_MATRIX, theta);
    LIBS.rotateY(KAKI_KANAN_BAWAH_MATRIX, theta);
    
    LIBS.rotateY(KAKI_KIRI_ATAS_MATRIX, theta);
    LIBS.rotateY(KAKI_KIRI_BAWAH_MATRIX, theta);

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
    



    // END DRAW JERRY
    // END DRAW JERRY
    // END DRAW JERRY
    // END DRAW JERRY
    // END DRAW JERRY
    // END DRAW JERRY
    // END DRAW JERRY
    
// DRAW TOM
// DRAW TOM
// DRAW TOM
// DRAW TOM
// DRAW TOM
// DRAW TOM
// DRAW TOM



    // 
    // KAKI NAIK TURUN
    // 

    KAKI_KIRI_ATAS_MATRIX_t = LIBS.get_I4();
    KAKI_KIRI_BAWAH_MATRIX_t = LIBS.get_I4();

    if(time < 40){
      if(KakiKiriTime <= -.2){
        KakiKiriReverse = false;
      }else if(KakiKiriTime >= .2){
        KakiKiriReverse = true;
      }

      if(KakiKiriReverse){
        KakiKiriTime -= deltaTime;
      }else{
        KakiKiriTime += deltaTime;
      }
      
      KF_KakiKiriAtas = LIBS.degToRad(KakiKiriTime);
      KF_KakiKiriBawah = LIBS.degToRad(KakiKiriTime);
    }

    KAKI_KANAN_ATAS_MATRIX_t = LIBS.get_I4();
    KAKI_KANAN_BAWAH_MATRIX_t = LIBS.get_I4();


    if(time < 40){
    if(KakiKananTime <= -.2){
      KakiKananReverse = true;
    }else if(KakiKananTime >= .2){
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

  LIBS.rotateX(KAKI_KIRI_ATAS_MATRIX_t, KF_KakiKiriAtas);
  LIBS.rotateX(KAKI_KIRI_BAWAH_MATRIX_t, KF_KakiKiriBawah);

  LIBS.rotateX(KAKI_KANAN_ATAS_MATRIX_t, KF_KakiKananAtas);
  LIBS.rotateX(KAKI_KANAN_BAWAH_MATRIX_t, KF_KakiKananBawah);

  //
  // BADAN
  //


  // Rotate Mouse
  LIBS.rotateY(BADAN_MATRIX_t, theta);
  LIBS.rotateY(KEPALA_MATRIX_t, theta);

  LIBS.rotateY(TANGAN_KIRI_ATAS_MATRIX_t, theta);
  LIBS.rotateY(TANGAN_KIRI_BAWAH_MATRIX_t, theta);

  LIBS.rotateY(TANGAN_KANAN_ATAS_MATRIX_t, theta);
  LIBS.rotateY(TANGAN_KANAN_BAWAH_MATRIX_t, theta);

  LIBS.rotateY(KAKI_KANAN_ATAS_MATRIX_t, theta);
  LIBS.rotateY(KAKI_KANAN_BAWAH_MATRIX_t, theta);
  
  LIBS.rotateY(KAKI_KIRI_ATAS_MATRIX_t, theta);
  LIBS.rotateY(KAKI_KIRI_BAWAH_MATRIX_t, theta);

  // TUBE ATAS
  GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI1_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI1_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KIRI1_FACES_t);

  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, TANGAN_KIRI_ATAS_MATRIX_t);

  GL.drawElements(GL.TRIANGLES, tanganKiri1_t.faces.length, GL.UNSIGNED_SHORT, 0);

  // EKOR
  GL.bindBuffer(GL.ARRAY_BUFFER, EKOR_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ARRAY_BUFFER, EKOR_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, EKOR_FACES_t);

  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, BADAN_MATRIX_t);


  GL.drawArrays(GL.LINE_STRIP, 0, ekor_t.vertices.length/3);

  //BALL ATAS

  GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI2_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI2_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KIRI2_FACES_t);

  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, TANGAN_KIRI_ATAS_MATRIX_t);


  GL.drawElements(GL.TRIANGLES, tanganKiri2_t.faces.length, GL.UNSIGNED_SHORT, 0);


  //BALL Bawah

  GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI3_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI3_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KIRI3_FACES_t);

  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, TANGAN_KIRI_BAWAH_MATRIX_t);

  GL.drawElements(GL.TRIANGLES, tanganKiri3_t.faces.length, GL.UNSIGNED_SHORT, 0);


  // TUBE BAWAH
  GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI4_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI4_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KIRI4_FACES_t);

  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, TANGAN_KIRI_BAWAH_MATRIX_t);

  GL.drawElements(GL.TRIANGLES, tanganKiri4_t.faces.length, GL.UNSIGNED_SHORT, 0);

  // SPHERE TANGAN
  GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI5_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KIRI5_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KIRI5_FACES_t);

  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, TANGAN_KIRI_BAWAH_MATRIX_t);

  GL.drawElements(GL.TRIANGLES, tanganKiri5_t.faces.length, GL.UNSIGNED_SHORT, 0);

  // 
  // TANGAN KANAN
  //

  // TUBE ATAS
  GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN1_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN1_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KANAN1_FACES_t);

  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, TANGAN_KANAN_ATAS_MATRIX_t);

  GL.drawElements(GL.TRIANGLES, tanganKanan1_t.faces.length, GL.UNSIGNED_SHORT, 0);

  //BALL ATAS

  GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN2_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN2_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KANAN2_FACES_t);

  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, TANGAN_KANAN_ATAS_MATRIX_t);


  GL.drawElements(GL.TRIANGLES, tanganKanan2_t.faces.length, GL.UNSIGNED_SHORT, 0);


  //BALL Bawah

  GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN3_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN3_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KANAN3_FACES_t);

  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, TANGAN_KANAN_BAWAH_MATRIX_t);

  GL.drawElements(GL.TRIANGLES, tanganKanan3_t.faces.length, GL.UNSIGNED_SHORT, 0);


  // TUBE BAWAH
  GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN4_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN4_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KANAN4_FACES_t);

  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, TANGAN_KANAN_BAWAH_MATRIX_t);

  GL.drawElements(GL.TRIANGLES, tanganKanan4_t.faces.length, GL.UNSIGNED_SHORT, 0);

  // SPHERE TANGAN
  GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN5_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ARRAY_BUFFER, TANGAN_KANAN5_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TANGAN_KANAN5_FACES_t);

  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, TANGAN_KANAN_BAWAH_MATRIX_t);

  GL.drawElements(GL.TRIANGLES, tanganKanan5_t.faces.length, GL.UNSIGNED_SHORT, 0);


  // 
  // BADAN
  // 

  GL.bindBuffer(GL.ARRAY_BUFFER, BADAN1_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
  GL.bindBuffer(GL.ARRAY_BUFFER, BADAN1_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, BADAN1_FACES_t);
  
  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, BADAN_MATRIX_t);
  
  GL.drawElements(GL.TRIANGLES, badan1_t.faces.length, GL.UNSIGNED_SHORT, 0);

  // Badan Warna
  GL.bindBuffer(GL.ARRAY_BUFFER, BADAN2_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
  GL.bindBuffer(GL.ARRAY_BUFFER, BADAN2_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, BADAN2_FACES_t);
  
  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, BADAN_MATRIX_t);
  
  GL.drawElements(GL.TRIANGLES, badan2_t.faces.length, GL.UNSIGNED_SHORT, 0);


  // 
  // BADAN BAWAH
  // 

  GL.bindBuffer(GL.ARRAY_BUFFER, BADAN_BAWAH_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
  GL.bindBuffer(GL.ARRAY_BUFFER, BADAN_BAWAH_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, BADAN_BAWAH_FACES_t);
  
  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, BADAN_MATRIX_t);
  
  GL.drawElements(GL.TRIANGLES, badanBawah_t.faces.length, GL.UNSIGNED_SHORT, 0);

  // 
  // LEHER
  // 

  GL.bindBuffer(GL.ARRAY_BUFFER, LEHER1_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
  GL.bindBuffer(GL.ARRAY_BUFFER, LEHER1_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, LEHER1_FACES_t);
  
  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, BADAN_MATRIX_t);
  
  GL.drawElements(GL.TRIANGLES, leher1_t.faces.length, GL.UNSIGNED_SHORT, 0);

  // 
  // KEPALA
  // 

  GL.bindBuffer(GL.ARRAY_BUFFER, KEPALA1_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
  GL.bindBuffer(GL.ARRAY_BUFFER, KEPALA1_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KEPALA1_FACES_t);
  
  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, KEPALA_MATRIX_t);
  
  GL.drawElements(GL.TRIANGLES, kepala1_t.faces.length, GL.UNSIGNED_SHORT, 0);



  GL.bindBuffer(GL.ARRAY_BUFFER, KEPALA2_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
  GL.bindBuffer(GL.ARRAY_BUFFER, KEPALA2_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KEPALA2_FACES_t);
  
  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, KEPALA_MATRIX_t);
  
  GL.drawElements(GL.TRIANGLES, kepala2_t.faces.length, GL.UNSIGNED_SHORT, 0);

  // 
  // TELINGA
  // 

  // Kanan

  GL.bindBuffer(GL.ARRAY_BUFFER, TELINGA1_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
  GL.bindBuffer(GL.ARRAY_BUFFER, TELINGA1_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TELINGA1_FACES_t);
  
  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, KEPALA_MATRIX_t);
  
  GL.drawElements(GL.TRIANGLES, telinga1_t.faces.length, GL.UNSIGNED_SHORT, 0);

  // Kiri

  GL.bindBuffer(GL.ARRAY_BUFFER, TELINGA2_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
  GL.bindBuffer(GL.ARRAY_BUFFER, TELINGA2_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TELINGA2_FACES_t);
  
  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, KEPALA_MATRIX_t);
  
  GL.drawElements(GL.TRIANGLES, telinga2_t.faces.length, GL.UNSIGNED_SHORT, 0);

   // Kanan

   GL.bindBuffer(GL.ARRAY_BUFFER, TELINGA3_VERTEX_t);
   GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
   
   GL.bindBuffer(GL.ARRAY_BUFFER, TELINGA3_COLORS_t);
   GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
   
   GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TELINGA3_FACES_t);
   
   GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
   GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
   GL.uniformMatrix4fv(_MMatrix, false, KEPALA_MATRIX_t);
   
   GL.drawElements(GL.TRIANGLES, telinga3_t.faces.length, GL.UNSIGNED_SHORT, 0);

   // Kiri

   GL.bindBuffer(GL.ARRAY_BUFFER, TELINGA4_VERTEX_t);
   GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
   
   GL.bindBuffer(GL.ARRAY_BUFFER, TELINGA4_COLORS_t);
   GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
   
   GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TELINGA4_FACES_t);
   
   GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
   GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
   GL.uniformMatrix4fv(_MMatrix, false, KEPALA_MATRIX_t);
   
   GL.drawElements(GL.TRIANGLES, telinga4_t.faces.length, GL.UNSIGNED_SHORT, 0);

  // 
  // MULUT 
  // 

  // RAHANG
  GL.bindBuffer(GL.ARRAY_BUFFER, RAHANG_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ARRAY_BUFFER, RAHANG_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, RAHANG_FACES_t);

  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, KEPALA_MATRIX_t);

  GL.drawElements(GL.TRIANGLES, rahang_t.faces.length, GL.UNSIGNED_SHORT, 0);

  // 
  // KAKI KIRI
  //

  // TUBE ATAS
  GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI1_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI1_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KIRI1_FACES_t);

  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, KAKI_KIRI_ATAS_MATRIX_t);

  GL.drawElements(GL.TRIANGLES, kakiKiri1_t.faces.length, GL.UNSIGNED_SHORT, 0);

  //BALL ATAS

  GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI2_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI2_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KIRI2_FACES_t);

  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, KAKI_KIRI_ATAS_MATRIX_t);


  GL.drawElements(GL.TRIANGLES, kakiKiri2_t.faces.length, GL.UNSIGNED_SHORT, 0);


  //BALL Bawah

  GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI3_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI3_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KIRI3_FACES_t);

  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, KAKI_KIRI_BAWAH_MATRIX_t);

  GL.drawElements(GL.TRIANGLES, kakiKiri3_t.faces.length, GL.UNSIGNED_SHORT, 0);


  // TUBE BAWAH
  GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI4_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI4_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KIRI4_FACES_t);

  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, KAKI_KIRI_BAWAH_MATRIX_t);

  GL.drawElements(GL.TRIANGLES, kakiKiri4_t.faces.length, GL.UNSIGNED_SHORT, 0);

  // SPHERE KAKI
  GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI5_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KIRI5_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KIRI5_FACES_t);

  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, KAKI_KIRI_BAWAH_MATRIX_t);

  GL.drawElements(GL.TRIANGLES, kakiKiri5_t.faces.length, GL.UNSIGNED_SHORT, 0);

  // 
  // MATA 
  // 
  
  // RETINA
  GL.bindBuffer(GL.ARRAY_BUFFER, MATA1_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ARRAY_BUFFER, MATA1_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, MATA1_FACES_t);

  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, KEPALA_MATRIX_t);

  GL.drawElements(GL.TRIANGLES, mata1_t.faces.length, GL.UNSIGNED_SHORT, 0);

  // PUPIL

  GL.bindBuffer(GL.ARRAY_BUFFER, MATA2_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ARRAY_BUFFER, MATA2_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, MATA2_FACES_t);

  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, KEPALA_MATRIX_t);


  GL.drawElements(GL.TRIANGLES, mata2_t.faces.length, GL.UNSIGNED_SHORT, 0);


  // RETINA
  GL.bindBuffer(GL.ARRAY_BUFFER, MATA3_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ARRAY_BUFFER, MATA3_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, MATA3_FACES_t);

  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, KEPALA_MATRIX_t);

  GL.drawElements(GL.TRIANGLES, mata3_t.faces.length, GL.UNSIGNED_SHORT, 0);


  // PUPIL
  GL.bindBuffer(GL.ARRAY_BUFFER, MATA4_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ARRAY_BUFFER, MATA4_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, MATA4_FACES_t);

  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, KEPALA_MATRIX_t);

  GL.drawElements(GL.TRIANGLES, mata4_t.faces.length, GL.UNSIGNED_SHORT, 0);

  // HIDUNG
  GL.bindBuffer(GL.ARRAY_BUFFER, HIDUNG_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ARRAY_BUFFER, HIDUNG_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, HIDUNG_FACES_t);

  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, KEPALA_MATRIX_t);

  GL.drawElements(GL.TRIANGLES, hidung_t.faces.length, GL.UNSIGNED_SHORT, 0);


  // 
  // KAKI KANAN
  //

  // TUBE ATAS
  GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN1_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN1_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KANAN1_FACES_t);

  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, KAKI_KANAN_ATAS_MATRIX_t);

  GL.drawElements(GL.TRIANGLES, kakiKanan1_t.faces.length, GL.UNSIGNED_SHORT, 0);

  //BALL ATAS

  GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN2_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN2_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KANAN2_FACES_t);

  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, KAKI_KANAN_ATAS_MATRIX_t);


  GL.drawElements(GL.TRIANGLES, kakiKanan2_t.faces.length, GL.UNSIGNED_SHORT, 0);


  //BALL Bawah

  GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN3_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN3_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KANAN3_FACES_t);

  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, KAKI_KANAN_BAWAH_MATRIX_t);

  GL.drawElements(GL.TRIANGLES, kakiKanan3_t.faces.length, GL.UNSIGNED_SHORT, 0);


  // TUBE BAWAH
  GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN4_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN4_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KANAN4_FACES_t);

  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, KAKI_KANAN_BAWAH_MATRIX_t);

  GL.drawElements(GL.TRIANGLES, kakiKanan4_t.faces.length, GL.UNSIGNED_SHORT, 0);

  // SPHERE KAKI
  GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN5_VERTEX_t);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ARRAY_BUFFER, KAKI_KANAN5_COLORS_t);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, KAKI_KANAN5_FACES_t);

  GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
  GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
  GL.uniformMatrix4fv(_MMatrix, false, KAKI_KANAN_BAWAH_MATRIX_t);

  GL.drawElements(GL.TRIANGLES, kakiKanan5_t.faces.length, GL.UNSIGNED_SHORT, 0);
  



  // END DRAW TOM
  // END DRAW TOM
  // END DRAW TOM
  // END DRAW TOM
  // END DRAW TOM
  // END DRAW TOM
  // END DRAW TOM
    
    // DRAW WORLD
    // DRAW WORLD
    // DRAW WORLD
    // DRAW WORLD
    // DRAW WORLD


    GL.bindBuffer(GL.ARRAY_BUFFER, WORLD_VERTEX);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ARRAY_BUFFER, WORLD_COLORS);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, WORLD_FACES);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, WORLD_MATRIX);

    GL.drawElements(GL.TRIANGLES, world.faces.length, GL.UNSIGNED_SHORT, 0);



    GL.bindBuffer(GL.ARRAY_BUFFER, HOUSE1_VERTEX);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ARRAY_BUFFER, HOUSE1_COLORS);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, HOUSE1_FACES);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, WORLD_MATRIX);

    GL.drawElements(GL.TRIANGLES, house1.faces.length, GL.UNSIGNED_SHORT, 0);


    
    GL.bindBuffer(GL.ARRAY_BUFFER, HOUSE2_VERTEX);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ARRAY_BUFFER, HOUSE2_COLORS);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, HOUSE2_FACES);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, HOUSE2_MATRIX);

    GL.drawElements(GL.TRIANGLES, house2.faces.length, GL.UNSIGNED_SHORT, 0);

    
    GL.bindBuffer(GL.ARRAY_BUFFER, HOUSE3_VERTEX);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ARRAY_BUFFER, HOUSE3_COLORS);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, HOUSE3_FACES);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, HOUSE3_MATRIX);

    GL.drawElements(GL.TRIANGLES, house3.faces.length, GL.UNSIGNED_SHORT, 0);

    
    GL.bindBuffer(GL.ARRAY_BUFFER, HOUSE4_VERTEX);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ARRAY_BUFFER, HOUSE4_COLORS);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, HOUSE4_FACES);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, HOUSE4_MATRIX);

    GL.drawElements(GL.TRIANGLES, house4.faces.length, GL.UNSIGNED_SHORT, 0);


    GL.bindBuffer(GL.ARRAY_BUFFER, HOUSE5_VERTEX);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ARRAY_BUFFER, HOUSE5_COLORS);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, HOUSE5_FACES);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, HOUSE5_MATRIX);

    GL.drawElements(GL.TRIANGLES, house5.faces.length, GL.UNSIGNED_SHORT, 0);


    GL.bindBuffer(GL.ARRAY_BUFFER, DOOR_VERTEX);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ARRAY_BUFFER, DOOR_COLORS);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, DOOR_FACES);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, WORLD_MATRIX);

    GL.drawElements(GL.TRIANGLES, door.faces.length, GL.UNSIGNED_SHORT, 0);


    GL.bindBuffer(GL.ARRAY_BUFFER, CLOUDA1_VERTEX);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ARRAY_BUFFER, CLOUDA1_COLORS);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, CLOUDA1_FACES);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, WORLD_MATRIX);

    GL.drawElements(GL.TRIANGLES, cloudA1.faces.length, GL.UNSIGNED_SHORT, 0);


    GL.bindBuffer(GL.ARRAY_BUFFER, CLOUDA2_VERTEX);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ARRAY_BUFFER, CLOUDA2_COLORS);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, CLOUDA2_FACES);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, WORLD_MATRIX);

    GL.drawElements(GL.TRIANGLES, cloudA2.faces.length, GL.UNSIGNED_SHORT, 0);


    GL.bindBuffer(GL.ARRAY_BUFFER, CLOUDA3_VERTEX);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ARRAY_BUFFER, CLOUDA3_COLORS);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, CLOUDA3_FACES);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, WORLD_MATRIX);

    GL.drawElements(GL.TRIANGLES, cloudA3.faces.length, GL.UNSIGNED_SHORT, 0);


    GL.bindBuffer(GL.ARRAY_BUFFER, CLOUDA4_VERTEX);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ARRAY_BUFFER, CLOUDA4_COLORS);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, CLOUDA4_FACES);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, WORLD_MATRIX);

    GL.drawElements(GL.TRIANGLES, cloudA4.faces.length, GL.UNSIGNED_SHORT, 0);


    GL.bindBuffer(GL.ARRAY_BUFFER, CLOUDA5_VERTEX);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ARRAY_BUFFER, CLOUDA5_COLORS);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, CLOUDA5_FACES);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, WORLD_MATRIX);

    GL.drawElements(GL.TRIANGLES, cloudA5.faces.length, GL.UNSIGNED_SHORT, 0);


    GL.bindBuffer(GL.ARRAY_BUFFER, CLOUDA6_VERTEX);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ARRAY_BUFFER, CLOUDA6_COLORS);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, CLOUDA6_FACES);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, WORLD_MATRIX);

    GL.drawElements(GL.TRIANGLES, cloudA6.faces.length, GL.UNSIGNED_SHORT, 0);


    GL.bindBuffer(GL.ARRAY_BUFFER, CLOUDB1_VERTEX);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ARRAY_BUFFER, CLOUDB1_COLORS);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, CLOUDB1_FACES);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, WORLD_MATRIX);

    GL.drawElements(GL.TRIANGLES, cloudB1.faces.length, GL.UNSIGNED_SHORT, 0);


    GL.bindBuffer(GL.ARRAY_BUFFER, CLOUDB2_VERTEX);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ARRAY_BUFFER, CLOUDB2_COLORS);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, CLOUDB2_FACES);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, WORLD_MATRIX);

    GL.drawElements(GL.TRIANGLES, cloudB2.faces.length, GL.UNSIGNED_SHORT, 0);


    GL.bindBuffer(GL.ARRAY_BUFFER, CLOUDB3_VERTEX);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ARRAY_BUFFER, CLOUDB3_COLORS);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, CLOUDB3_FACES);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, WORLD_MATRIX);

    GL.drawElements(GL.TRIANGLES, cloudB3.faces.length, GL.UNSIGNED_SHORT, 0);


    GL.bindBuffer(GL.ARRAY_BUFFER, CLOUDB4_VERTEX);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ARRAY_BUFFER, CLOUDB4_COLORS);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, CLOUDB4_FACES);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, WORLD_MATRIX);

    GL.drawElements(GL.TRIANGLES, cloudB4.faces.length, GL.UNSIGNED_SHORT, 0);


    GL.bindBuffer(GL.ARRAY_BUFFER, CLOUDB5_VERTEX);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ARRAY_BUFFER, CLOUDB5_COLORS);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, CLOUDB5_FACES);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, WORLD_MATRIX);

    GL.drawElements(GL.TRIANGLES, cloudB5.faces.length, GL.UNSIGNED_SHORT, 0);

    GL.bindBuffer(GL.ARRAY_BUFFER, CLOUDB6_VERTEX);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ARRAY_BUFFER, CLOUDB6_COLORS);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, CLOUDB6_FACES);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, WORLD_MATRIX);

    GL.drawElements(GL.TRIANGLES, cloudB6.faces.length, GL.UNSIGNED_SHORT, 0);


    GL.bindBuffer(GL.ARRAY_BUFFER, PATH_VERTEX);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ARRAY_BUFFER, PATH_COLORS);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, PATH_FACES);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, WORLD_MATRIX);

    GL.drawElements(GL.TRIANGLES, path.faces.length, GL.UNSIGNED_SHORT, 0);
    // END DRAW WORLD
    // END DRAW WORLD
    // END DRAW WORLD
    // END DRAW WORLD
    // END DRAW WORLD
    // END DRAW WORLD

    GL.flush();

    window.requestAnimationFrame(animateSpike);

  };

  animateSpike(0);
}

window.addEventListener("load", main);
