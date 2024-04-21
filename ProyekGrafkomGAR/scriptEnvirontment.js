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


var houseColor = [220/255, 211/255, 195/255];
var roofColor = [165/255, 72/255, 66/255];

// COORDINATE FOR ENVIRONTMENT
// COORDINATE FOR ENVIRONTMENT
// COORDINATE FOR ENVIRONTMENT
// COORDINATE FOR ENVIRONTMENT
// COORDINATE FOR ENVIRONTMENT
// COORDINATE FOR ENVIRONTMENT



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
  /*========================= MATRIX ========================== */
  /*=========================================================== */


  var PROJECTION_MATRIX = LIBS.get_projection(40, CANVAS.width / CANVAS.height, 1, 100);
  var VIEW_MATRIX = LIBS.get_I4();



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
  LIBS.translateZ(VIEW_MATRIX, -30);

  GL.clearColor(0.0, 0.0, 0.0, 0.0);

  GL.enable(GL.DEPTH_TEST);
  GL.depthFunc(GL.LEQUAL);


  var then = 0;


  /*=========================================================== */
  /*========================= ANIMATE ========================= */
  /*=========================================================== */
  var animateSpike = function (time) {
    GL.viewport(0, 0, CANVAS.width, CANVAS.height);
    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
  
    time *= 0.001

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


  // WORLD TIME CONTROL
  // WORLD TIME CONTROL
  // WORLD TIME CONTROL
  // WORLD TIME CONTROL
  // WORLD TIME CONTROL


  WORLD_MATRIX = LIBS.get_I4();
  LIBS.rotateY(WORLD_MATRIX, theta);
  LIBS.rotateX(WORLD_MATRIX, alpha);

  HOUSE2_MATRIX = LIBS.get_I4();
  LIBS.rotateZ(HOUSE2_MATRIX, LIBS.degToRad(90));
  LIBS.rotateY(HOUSE2_MATRIX, theta);
  LIBS.rotateX(HOUSE2_MATRIX, alpha);

  HOUSE3_MATRIX = LIBS.get_I4();
  LIBS.rotateY(HOUSE3_MATRIX, LIBS.degToRad(-90));
  LIBS.rotateX(HOUSE3_MATRIX, LIBS.degToRad(-30));
  LIBS.rotateY(HOUSE3_MATRIX, theta);
  LIBS.rotateX(HOUSE3_MATRIX, alpha);

  HOUSE4_MATRIX = LIBS.get_I4();
  LIBS.rotateY(HOUSE4_MATRIX, LIBS.degToRad(90));
  LIBS.rotateX(HOUSE4_MATRIX, LIBS.degToRad(30));
  LIBS.rotateY(HOUSE4_MATRIX, theta);
  LIBS.rotateX(HOUSE4_MATRIX, alpha);

  HOUSE5_MATRIX = LIBS.get_I4();
  LIBS.rotateZ(HOUSE5_MATRIX, LIBS.degToRad(90));
  LIBS.rotateY(HOUSE5_MATRIX, theta);
  LIBS.rotateX(HOUSE5_MATRIX, alpha);


  // END WORLD TIME CONTROL
  // END WORLD TIME CONTROL
  // END WORLD TIME CONTROL
  // END WORLD TIME CONTROL
  // END WORLD TIME CONTROL

    
  /*=========================================================== */
  /*=========================== DRAW ========================== */
  /*=========================================================== */
    
    
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
