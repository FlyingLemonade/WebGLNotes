function main(){
    //setup
    var CANVAS  = document.getElementById("myCanvas");
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;

    var drag = false;
    var X_prev = 0;
    var Y_prev = 0;
    
    var dX = 0;
    var dY = 0;

    var THETA = 0;
    var ALPHA = 0;

    var FRICTION = 0.95;
    
    var keyState = {};

    var mouseDown = function(e){
        drag = true;
        X_prev = e.pageX;
        Y_prev = e.pageY;
    }
    
    var mouseUp = function(e){
        drag = false;
    }
    
    var mouseMove = function(e){
        if(!drag){return false;}
        dX = e.pageX - X_prev;
        dY = e.pageY - Y_prev;
        console.log(dX + " " + dY);
        X_prev = e.pageX;
        Y_prev = e.pageY;

        THETA += dX * 2*Math.PI / CANVAS.width;
        ALPHA += dY * 2*Math.PI / CANVAS.height;
    }

    var keyDownHandler = function(e) {
        keyState[e.key] = true;
    }

    var keyUpHandler = function(e) {
        keyState[e.key] = false;
    }

    

    
    
    CANVAS.addEventListener("mousedown", mouseDown, false);
    CANVAS.addEventListener("mouseup", mouseUp, false);
    CANVAS.addEventListener("mouseout", mouseUp, false);
    CANVAS.addEventListener("mousemove", mouseMove, false);
    window.addEventListener('keydown', keyDownHandler, false);
    window.addEventListener('keyup', keyUpHandler, false);

    

    var GL;
    try{
        GL = CANVAS.getContext("webgl",{antialias: true});
    }catch(e){
        alert(e);
        return false;
    }


    //shader
    var shader_vertex_source = `
        attribute vec3 position;
        attribute vec3 color;

        uniform mat4 PMatrix; // Projection
        uniform mat4 VMatrix; // View
        uniform mat4 MMatrix; // Model

        varying vec3 outColor;
        void main(void){
            gl_Position = PMatrix * VMatrix * MMatrix * vec4(position, 1.);
            outColor = color;

            gl_PointSize=20.0;
        }
    `;
    var shader_fragment_source = `
        precision mediump float;

        varying vec3 outColor;

        void main(void){
            gl_FragColor = vec4(outColor,1.);
        }
    `;


    var compile_shader = function(source, type, typeString) {
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
    GL.attachShader(SHADER_PROGRAM,shader_vertex);
    GL.attachShader(SHADER_PROGRAM,shader_fragment);


    GL.linkProgram(SHADER_PROGRAM);


    //vao
    var position_vao = GL.getAttribLocation(SHADER_PROGRAM, "position");
    var color_vao = GL.getAttribLocation(SHADER_PROGRAM, "color");

    //uniform
    var _PMatrix = GL.getUniformLocation(SHADER_PROGRAM, "PMatrix");
    var _VMatrix = GL.getUniformLocation(SHADER_PROGRAM, "VMatrix");
    var _MMatrix = GL.getUniformLocation(SHADER_PROGRAM, "MMatrix");

    GL.enableVertexAttribArray(position_vao);
    GL.enableVertexAttribArray(color_vao);
    GL.useProgram(SHADER_PROGRAM);

    var cube = [
        //belakang
        -1,-1,-1,   1,1,0,
        1,-1,-1,     1,1,0,
        1,1,-1,     1,1,0,
        -1,1,-1,    1,1,0,
  
  
        //depan
        -1,-1,1,    0,0,1,
        1,-1,1,     0,0,1,
        1,1,1,      0,0,1,
        -1,1,1,     0,0,1,
  
  
        //kiri
        -1,-1,-1,   0,1,1,
        -1,1,-1,    0,1,1,
        -1,1,1,     0,1,1,
        -1,-1,1,    0,1,1,
  
  
        //kanan
        1,-1,-1,    1,0,0,
        1,1,-1,     1,0,0,
        1,1,1,      1,0,0,
        1,-1,1,     1,0,0,
  
  
        //bawah
        -1,-1,-1,   1,0,1,
        -1,-1,1,    1,0,1,
        1,-1,1,     1,0,1,
        1,-1,-1,    1,0,1,
  
  
        //atas
        -1,1,-1,    0,1,0,
        -1,1,1,     0,1,0,
        1,1,1,      0,1,0,
        1,1,-1,     0,1,0
      ]
  
  
  var cube_faces = [
          0,1,2,
          0,2,3,
  
  
          4,5,6,
          4,6,7,
  
  
          8,9,10,
          8,10,11,
  
  
          12,13,14,
          12,14,15,
  
  
          16,17,18,
          16,18,19,
  
  
          20,21,22,
          20,22,23
        ];
  
  
    var triangle_face = [0,1,2]
    var TRIANGLE_FACE = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TRIANGLE_FACE)
    GL.bufferData(GL.ELEMENT_ARRAY_BUFFER,
                    new Uint16Array(cube_faces),
                    GL.STATIC_DRAW);

    //coord
    var triangle_vertices = [
        0, 0.5,         1,0,0,
        -0.5, -0.5,     0,1,0,
        0.5, -0.5,      0,0,1
    ];


    //vbo
    var triangle_vbo = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, triangle_vbo);
    GL.bufferData(GL.ARRAY_BUFFER,
        new Float32Array(cube),
        GL.STATIC_DRAW);


        GL.clearColor(0,0,0,0);


        // matrix
        var PROJECTION_MATRIX = LIBS.get_projection(40,
            CANVAS.width/CANVAS.height,1,100);
        var MODEL_MATRIX = LIBS.get_I4();
        var VIEW_MATRIX = LIBS.get_I4();


        LIBS.translateZ(VIEW_MATRIX, -5);

        GL.enable(GL.DEPTH_TEST);
        GL.depthFunc(GL.LEQUAL);

    var prev_time = 0;        
    var animate = function(time){
        var dt = time-prev_time;
        prev_time = time;

        GL.viewport(0,0, CANVAS.width , CANVAS.height);
        GL.clear(GL.COLOR_BUFFER_BIT);

        if(!drag){
            dX *= FRICTION;
            dY *= FRICTION;

            THETA += dX * 2*Math.PI / CANVAS.width;
            ALPHA += dY * 2*Math.PI / CANVAS.height;

            if (keyState['w']) {
                ALPHA += 0.03;
            }
            if (keyState['s']) {
                ALPHA -= 0.03;
            }
            if (keyState['a']) {
                THETA -= 0.03;
            }
            if (keyState['d']) {
                THETA += 0.03;
            }
    
        }

        // LIBS.rotateZ(MODEL_MATRIX, LIBS.degToRad(90*dt/1000))
        // LIBS.rotateX(MODEL_MATRIX, LIBS.degToRad(30*dt/1000))
        // LIBS.rotateY(MODEL_MATRIX, LIBS.degToRad(50*dt/1000))

        MODEL_MATRIX = LIBS.get_I4();
        LIBS.rotateY(MODEL_MATRIX, THETA);
        LIBS.rotateX(MODEL_MATRIX, ALPHA);


        GL.bindBuffer(GL.ARRAY_BUFFER, triangle_vbo);
        GL.vertexAttribPointer(position_vao, 3, GL.FLOAT, false, 4*(3+3), 0);
        GL.vertexAttribPointer(color_vao, 3, GL.FLOAT, false, 4*(3+3), 3*4);

        // GL.drawArrays(GL.LINES, 0, cube.length/2);
        GL.drawElements(GL.TRIANGLES, cube_faces.length, GL.UNSIGNED_SHORT, 0);

        GL.uniformMatrix4fv(_PMatrix,false, PROJECTION_MATRIX);
        GL.uniformMatrix4fv(_VMatrix,false, VIEW_MATRIX);
        GL.uniformMatrix4fv(_MMatrix,false, MODEL_MATRIX);


        GL.flush();
        

        window.requestAnimationFrame(animate);
    }
    animate(0);
}


window.addEventListener("load", main);