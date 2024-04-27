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
  var tanganKiri1 = generateSphere(-4.9, 2, .55, bodyColor[0], bodyColor[1], bodyColor[2], .8, 50);
  var tanganKiri2 = generateTube(-4.9, 3.4, .05, bodyColor[0], bodyColor[1], bodyColor[2], 3, .8, .8, 100);
  var tanganKiri3 = generateSphere(-4.9, 3.5, .55, bodyColor[0], bodyColor[1], bodyColor[2], .8, 50);
  var tanganKiri4 = generateTube(-4.9, 5.6, .05, bodyColor[0], bodyColor[1], bodyColor[2], 1.6, .6, .6, 100);
  var tanganKiri5 = generateSphere(-4.9, 5.9, .55, bodyColor[0], bodyColor[1], bodyColor[2], .6, 50);

  // 
  // TANGAN KANAN
  // 
  var tanganKanan1 = generateSphere(1.6, 2, .55, bodyColor[0], bodyColor[1], bodyColor[2], .8, 50);
  var tanganKanan2 = generateTube(1.6, 3.4, .05, bodyColor[0], bodyColor[1], bodyColor[2], 3, .8, .8, 100);
  var tanganKanan3 = generateSphere(1.6, 3.5, .55, bodyColor[0], bodyColor[1], bodyColor[2], .8, 50);
  var tanganKanan4 = generateTube(1.6, 5.6, .05, bodyColor[0], bodyColor[1], bodyColor[2], 1.6, .6, .6, 100);
  var tanganKanan5 = generateSphere(1.6, 5.9, .55, bodyColor[0], bodyColor[1], bodyColor[2], .6, 50);

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
  var scaleFactor = 0.04; 
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
var geserZ = 4;

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



// COORDINATE FOR ENVIRONTMENT
// COORDINATE FOR ENVIRONTMENT
// COORDINATE FOR ENVIRONTMENT
// COORDINATE FOR ENVIRONTMENT
// COORDINATE FOR ENVIRONTMENT
// COORDINATE FOR ENVIRONTMENT

var houseColor = [220/255, 211/255, 195/255];
var roofColor = [165/255, 72/255, 66/255];
var beefColor = [156/255, 0/255, 1/255];
var beefColor2 = [202/255,197/255,135/255];
var boneColor = [253/255,255/255,243/255];


var world = generateWorld(40,40,.3);

var house1 = generateCube(0, 1.6, 0, houseColor[0], houseColor[1], houseColor[2], 6, 4, 3);
var house2 = generateTube(4.23, -3, 0, houseColor[0], houseColor[1], houseColor[2], 6, 2.3, 2.3, 3);
var house3 = generateCube(3.4, 3, 0, roofColor[0], roofColor[1], roofColor[2], .2, 8, 5);
var house4 = generateCube(3.4, 3, 0, roofColor[0], roofColor[1], roofColor[2], .2, 8, 5);
var house5 = generateTube(6.3, -4, 0, roofColor[0], roofColor[1], roofColor[2], 8, .4, .4, 100);


var beef1 = generateCurveMeat(-.08, .8001, 4, beefColor[0], beefColor[1], beefColor[2], .1, .2, .2, 100);
var beef2 = generateCurveMeat(-.08, .8, 4, beefColor2[0], beefColor2[1], beefColor2[2], .1, .3, .3, 100);
var beef3 = generateTube(-.165, .8002, 3.96, boneColor[0], boneColor[1], boneColor[2], .1, .07, .07, 100);

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

//  END BUFFER FOR JERRY
//  END BUFFER FOR JERRY
//  END BUFFER FOR JERRY
//  END BUFFER FOR JERRY
//  END BUFFER FOR JERRY
//  END BUFFER FOR JERRY
//  END BUFFER FOR JERRY



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

var BEEF1_VERTEX = createVertexBuffer(GL, beef1);
var BEEF1_COLORS = createColorBuffer(GL, beef1);
var BEEF1_FACES = createFacesBuffer(GL, beef1);

var BEEF2_VERTEX = createVertexBuffer(GL, beef2);
var BEEF2_COLORS = createColorBuffer(GL, beef2);
var BEEF2_FACES = createFacesBuffer(GL, beef2);

var BEEF3_VERTEX = createVertexBuffer(GL, beef3);
var BEEF3_COLORS = createColorBuffer(GL, beef3);
var BEEF3_FACES = createFacesBuffer(GL, beef3);

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
  var BEEF_MATRIX = LIBS.get_I4();

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

  LIBS.translateZ(VIEW_MATRIX, -12);
  LIBS.translateY(VIEW_MATRIX, -1);
  // LIBS.translateX(VIEW_MATRIX, 1);

// END MATRIX FOR JERRY
// END MATRIX FOR JERRY
// END MATRIX FOR JERRY
// END MATRIX FOR JERRY
// END MATRIX FOR JERRY
// END MATRIX FOR JERRY


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
  // BADAN GOYANG 
  // 
  var BadanTime = 0;
  var BadanReverse = false;
  var KF_Badan = 0;


  // 
  // BADAN MUTER
  // 
  var RunningTime = 0;

  var EndingTime = 0;
  /*=========================================================== */
  /*========================= ANIMATE ========================= */
  /*=========================================================== */
  var animateSpike = function (time) {
    GL.viewport(0, 0, CANVAS.width, CANVAS.height);
    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
  
    time *= 0.001

    var deltaTime = (time - then)*10;
    then = time;
// CAMERA CONTROL 
// CAMERA CONTROL 
// CAMERA CONTROL 
// CAMERA CONTROL
// CAMERA CONTROL 
// CAMERA CONTROL 
// CAMERA CONTROL 
// CAMERA CONTROL 

if(drag){
  LIBS.rotateY(VIEW_MATRIX, LIBS.degToRad(theta));
  // LIBS.rotateX(VIEW_MATRIX, LIBS.degToRad(alpha));
}

// END CAMERA CONTROL 
// END CAMERA CONTROL 
// END CAMERA CONTROL 
// END CAMERA CONTROL 
// END CAMERA CONTROL 
// END CAMERA CONTROL 
// END CAMERA CONTROL 
// END CAMERA CONTROL 




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


// WORLD TIME CONTROL
// WORLD TIME CONTROL
// WORLD TIME CONTROL
// WORLD TIME CONTROL
// WORLD TIME CONTROL


WORLD_MATRIX = LIBS.get_I4();
// LIBS.rotateY(WORLD_MATRIX, theta);

HOUSE2_MATRIX = LIBS.get_I4();
LIBS.rotateZ(HOUSE2_MATRIX, LIBS.degToRad(90));
// LIBS.rotateY(HOUSE2_MATRIX, theta);

HOUSE3_MATRIX = LIBS.get_I4();
LIBS.rotateY(HOUSE3_MATRIX, LIBS.degToRad(-90));
LIBS.rotateX(HOUSE3_MATRIX, LIBS.degToRad(-30));
// LIBS.rotateY(HOUSE3_MATRIX, theta);

HOUSE4_MATRIX = LIBS.get_I4();
LIBS.rotateY(HOUSE4_MATRIX, LIBS.degToRad(90));
LIBS.rotateX(HOUSE4_MATRIX, LIBS.degToRad(30));
// LIBS.rotateY(HOUSE4_MATRIX, theta);

HOUSE5_MATRIX = LIBS.get_I4();
LIBS.rotateZ(HOUSE5_MATRIX, LIBS.degToRad(90));
// LIBS.rotateY(HOUSE5_MATRIX, theta);


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

     
        if(KakiKiriTime <= -.4){
          KakiKiriReverse = false;
        }else if(KakiKiriTime >= .4){
          KakiKiriReverse = true;
        }

        if(KakiKiriReverse){
          KakiKiriTime -= deltaTime;
        }else{
          KakiKiriTime += deltaTime;
        }
        
        KF_KakiKiriAtas = LIBS.degToRad(KakiKiriTime);
        KF_KakiKiriBawah = LIBS.degToRad(KakiKiriTime);

      KAKI_KANAN_ATAS_MATRIX = LIBS.get_I4();
      KAKI_KANAN_BAWAH_MATRIX = LIBS.get_I4();


      
      if(KakiKananTime <= -.4){
        KakiKananReverse = true;
      }else if(KakiKananTime >= .4){
        KakiKananReverse = false;
      }
      
      if(KakiKananReverse){
        KakiKananTime += deltaTime;
      }else{
        KakiKananTime -= deltaTime;
      }
        KF_KakiKananAtas = LIBS.degToRad(KakiKananTime);
        KF_KakiKananBawah = LIBS.degToRad(KakiKananTime);
      

    LIBS.rotateX(KAKI_KIRI_ATAS_MATRIX, KF_KakiKiriAtas);
    LIBS.rotateX(KAKI_KIRI_BAWAH_MATRIX, KF_KakiKiriBawah);

    LIBS.rotateX(KAKI_KANAN_ATAS_MATRIX, KF_KakiKananAtas);
    LIBS.rotateX(KAKI_KANAN_BAWAH_MATRIX, KF_KakiKananBawah);

    //
    // BADAN
    //
    
    //
    // BADAN GOYANG IKUT KAKI  
    // 

   
      if(BadanTime <= -.25){
        BadanReverse = false;
      }else if(BadanTime >= .25){
        BadanReverse = true;
      }

      if(BadanReverse){
        BadanTime -= deltaTime;
      }else{
        BadanTime += deltaTime;
      }
    
    KF_Badan = LIBS.degToRad(BadanTime);
    LIBS.rotateX(BADAN_MATRIX, KF_Badan);
    LIBS.rotateX(KEPALA_MATRIX, KF_Badan);
    LIBS.rotateX(TANGAN_KIRI_BAWAH_MATRIX, KF_Badan);
    LIBS.rotateX(TANGAN_KIRI_ATAS_MATRIX, KF_Badan);
    LIBS.rotateX(TANGAN_KANAN_ATAS_MATRIX, KF_Badan);
    LIBS.rotateX(TANGAN_KANAN_BAWAH_MATRIX, KF_Badan);


    //
    // LARI KELILING RUMAH
    // 

    if(time < 6.3){
    RunningTime += deltaTime*0.2

    LIBS.rotateY(BADAN_MATRIX, RunningTime);
    LIBS.rotateY(KEPALA_MATRIX, RunningTime);

    LIBS.rotateY(TANGAN_KIRI_ATAS_MATRIX, RunningTime);
    LIBS.rotateY(TANGAN_KIRI_BAWAH_MATRIX, RunningTime);

    LIBS.rotateY(TANGAN_KANAN_ATAS_MATRIX, RunningTime);
    LIBS.rotateY(TANGAN_KANAN_BAWAH_MATRIX, RunningTime);

    LIBS.rotateY(KAKI_KANAN_ATAS_MATRIX, RunningTime);
    LIBS.rotateY(KAKI_KANAN_BAWAH_MATRIX, RunningTime);
    
    LIBS.rotateY(KAKI_KIRI_ATAS_MATRIX, RunningTime);
    LIBS.rotateY(KAKI_KIRI_BAWAH_MATRIX, RunningTime);

    LIBS.rotateY(BEEF_MATRIX, RunningTime);
    }else{
      EndingTime += deltaTime*0.2

      LIBS.translateZ(BADAN_MATRIX, EndingTime);
      LIBS.translateZ(KEPALA_MATRIX, EndingTime);
  
      LIBS.translateZ(TANGAN_KIRI_ATAS_MATRIX, EndingTime);
      LIBS.translateZ(TANGAN_KIRI_BAWAH_MATRIX, EndingTime);
  
      LIBS.translateZ(TANGAN_KANAN_ATAS_MATRIX, EndingTime);
      LIBS.translateZ(TANGAN_KANAN_BAWAH_MATRIX, EndingTime);
  
      LIBS.translateZ(KAKI_KANAN_ATAS_MATRIX, EndingTime);
      LIBS.translateZ(KAKI_KANAN_BAWAH_MATRIX, EndingTime);
      
      LIBS.translateZ(KAKI_KIRI_ATAS_MATRIX, EndingTime);
      LIBS.translateZ(KAKI_KIRI_BAWAH_MATRIX, EndingTime);
  
      LIBS.translateZ(BEEF_MATRIX, EndingTime);
    }



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


    // DAGING

    GL.bindBuffer(GL.ARRAY_BUFFER, BEEF1_VERTEX);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ARRAY_BUFFER, BEEF1_COLORS);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, BEEF1_FACES);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, TANGAN_KANAN_ATAS_MATRIX);

    GL.drawElements(GL.TRIANGLE_STRIP, beef1.faces.length, GL.UNSIGNED_SHORT, 0);

    // BEEF
    GL.bindBuffer(GL.ARRAY_BUFFER, BEEF2_VERTEX);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ARRAY_BUFFER, BEEF2_COLORS);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, BEEF2_FACES);

    GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    GL.uniformMatrix4fv(_MMatrix, false, TANGAN_KANAN_ATAS_MATRIX);

    GL.drawElements(GL.TRIANGLE_STRIP, beef2.faces.length, GL.UNSIGNED_SHORT, 0);

        // TULANG
        GL.bindBuffer(GL.ARRAY_BUFFER, BEEF3_VERTEX);
        GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    
        GL.bindBuffer(GL.ARRAY_BUFFER, BEEF3_COLORS);
        GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, BEEF3_FACES);
    
        GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
        GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
        GL.uniformMatrix4fv(_MMatrix, false, TANGAN_KANAN_ATAS_MATRIX);
    
        GL.drawElements(GL.TRIANGLE_STRIP, beef3.faces.length, GL.UNSIGNED_SHORT, 0);
    
    
    
    // END DRAW JERRY
    // END DRAW JERRY
    // END DRAW JERRY
    // END DRAW JERRY
    // END DRAW JERRY
    // END DRAW JERRY
    // END DRAW JERRY
    
    
    
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
