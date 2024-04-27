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
  
    //COORDINATE FOR SPIKE
    //COORDINATE FOR SPIKE
    //COORDINATE FOR SPIKE
    //COORDINATE FOR SPIKE

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

    //COORDINATE FOR TREE

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
    //
    var daun1 = generateTube(0, 3, 0, daunColor[0], daunColor[1], daunColor[2], 3, 2.5, .01, 50);
    var daun2 = generateTube(0, 5, 0, daunColor[0], daunColor[1], daunColor[2], 2.5, 2, .01, 50);

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

    //KECILIN SPIKE
    var scaleFactor = 0.1; 
    var childSpike = [
      tanganKiri1_S, tanganKiri2_S, tanganKiri3_S, tanganKiri4_S, tanganKiri5_S,
      tanganKanan1_S, tanganKanan2_S, tanganKanan3_S, tanganKanan4_S, tanganKanan5_S,
      badan1_S, badan2_S,
      badanBawah_S, ekor_S,
      leher1_S, leher2_S,
      kepala1_S, kepala2_S,
      telinga1_S, telinga2_S, telinga3_S, telinga4_S,
      mata1_S, mata2_S, mata3_S, mata4_S,
      rahang_S,
      hidung_S,
      kakiKiri1_S, kakiKiri2_S, kakiKiri3_S, kakiKiri4_S, kakiKiri5_S,
      kakiKanan1_S, kakiKanan2_S, kakiKanan3_S, kakiKanan4_S, kakiKanan5_S
    ];
    
    for(var i = 0;  i < childSpike.length ; i++){
      childSpike[i].vertices = childSpike[i].vertices.map(coord => coord * scaleFactor);
    }

    //KECILIN TREE
    var scaleFactor = 0.7; 
    var childTree = [
      batangPohon, daun1, daun2
    ];
    
    for(var i = 0;  i < childTree.length ; i++){
      childTree[i].vertices = childTree[i].vertices.map(coord => coord * scaleFactor);
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

  // 
  // GESER-GESER TREE
  // 
  var geserX_Tree = 3;
  var geserY_Tree = 0;
  var geserZ_Tree = 6;
  
  for (var i = 0; i < childTree.length; i++) {
      for (var j = 0; j < childTree[i].vertices.length; j += 3) {
          childTree[i].vertices[j] += geserX_Tree;
      }
      for (var j = 1; j < childTree[i].vertices.length; j += 3) {
        childTree[i].vertices[j] += geserY_Tree;
      }
      for (var j = 2; j < childTree[i].vertices.length; j += 3) {
        childTree[i].vertices[j] += geserZ_Tree;
      }
  }

  //
  // GESER-GESER SPIKE

  var geserX_S1 = -1;
  var geserY_S1 = 1.1;
  var geserZ_S1 = 4.5;
  
  for (var i = 0; i < childSpike.length; i++) {
      for (var j = 0; j < childSpike[i].vertices.length; j += 3) {
          childSpike[i].vertices[j] += geserX_S1;
      }
      for (var j = 1; j < childSpike[i].vertices.length; j += 3) {
        childSpike[i].vertices[j] += geserY_S1;
      }
      for (var j = 2; j < childSpike[i].vertices.length; j += 3) {
        childSpike[i].vertices[j] += geserZ_S1;
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
  
  var world = generateWorld(40,40,.3);
  
  var house1 = generateCube(0, 1.6, 0, houseColor[0], houseColor[1], houseColor[2], 6, 4, 3);
  var house2 = generateTube(4.23, -3, 0, houseColor[0], houseColor[1], houseColor[2], 6, 2.3, 2.3, 3);
  var house3 = generateCube(3.4, 3, 0, roofColor[0], roofColor[1], roofColor[2], .2, 8, 5);
  var house4 = generateCube(3.4, 3, 0, roofColor[0], roofColor[1], roofColor[2], .2, 8, 5);
  var house5 = generateTube(6.3, -4, 0, roofColor[0], roofColor[1], roofColor[2], 8, .4, .4, 100);
  
  
  
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

  // BUFFER FOR SPIKE
  // BUFFER FOR SPIKE
  // BUFFER FOR SPIKE
  // BUFFER FOR SPIKE
  // BUFFER FOR SPIKE
  // BUFFER FOR SPIKE
  
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

  
  // BUFFER FOR TREE
  // BUFFER FOR TREE
  // BUFFER FOR TREE
  // BUFFER FOR TREE
  // BUFFER FOR TREE
  // BUFFER FOR TREE

    // BATANG POHON
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
  
  
    LIBS.translateZ(VIEW_MATRIX, -15);
    LIBS.translateY(VIEW_MATRIX, -1);
   
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

  //MATRIX FOR TREE
  var DAUN_MATRIX = LIBS.get_I4();
  LIBS.rotateY(DAUN_MATRIX, theta);


  //MATRIX FOR SPIKE

      var MODEL_MATRIX_S = LIBS.get_I4();
      LIBS.rotateY(MODEL_MATRIX_S, theta);

      scale = 1.0 + 0.01 * Math.sin(Date.now() * 0.002); // Adjust speed as needed
      var SCALE_MATRIX = LIBS.get_I4();
      LIBS.fromScaling(SCALE_MATRIX, [scale, scale, scale]);

      var SCALE_MATRIX_S = LIBS.get_I4();
      LIBS.fromScaling(SCALE_MATRIX_S, [1, 1, 1]);

      
      
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

      // DRAW TREE

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

      // DRAW SPIKE
      // TANGAN KANAN
      // BAHU KANAN
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
  
      window.requestAnimationFrame(animateSpike);
  
    };
  
    animateSpike(0);
  }
  
  window.addEventListener("load", main);