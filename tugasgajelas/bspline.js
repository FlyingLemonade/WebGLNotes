function normalizeScreen(x,y,width,height){
    var nx = 2*x/width - 1
    var ny = -2*y/height + 1
 
    return [nx,ny]
  }
 
function generateBSpline(controlPoint, m, degree, centered){
    var curves = [];
    var knotVector = []


    var n = controlPoint.length/2;




    // Calculate the knot values based on the degree and number of control points
    for (var i = 0; i < n + degree+1; i++) {
        if (i < degree + 1) {
        knotVector.push(0);
        } else if (i >= n) {
        knotVector.push(n - degree);
        } else {
        knotVector.push(i - degree);
        }
    }






    var basisFunc = function(i,j,t){
        if (j == 0){
            if(knotVector[i] <= t && t<(knotVector[(i+1)])){
            return 1;
            }else{
            return 0;
            }
        }


        var den1 = knotVector[i + j] - knotVector[i];
        var den2 = knotVector[i + j + 1] - knotVector[i + 1];
       
        var term1 = 0;
        var term2 = 0;
       


        if (den1 != 0 && !isNaN(den1)) {
            term1 = ((t - knotVector[i]) / den1) * basisFunc(i,j-1,t);
        }
       
        if (den2 != 0 && !isNaN(den2)) {
            term2 = ((knotVector[i + j + 1] - t) / den2) * basisFunc(i+1,j-1,t);
        }
       
        return term1 + term2;
    }




    for(var t=0;t<m;t++){
        var x=0;
        var y=0;
       
        var u = (t/m * (knotVector[controlPoint.length/2] - knotVector[degree]) ) + knotVector[degree] ;


        //C(t)
        for(var key =0;key<n;key++){


        var C = basisFunc(key,degree,u);
        // console.log(C);
        x+=(controlPoint[key*2] * C);
        y+=(controlPoint[key*2+1] * C);
        // console.log(t+" "+degree+" "+x+" "+y+" "+C);
        }
        curves.push(x);
        curves.push(y);
        if (centered) {
            curves.push(0);
            curves.push(0.4);
        }
    }
    // console.log(curves)
    return curves;
}


function generateCircle(x, y, rad, aspectRatio) {
    var list = [];
    for (var i=0;i<360;i++) {
        var a = rad*Math.cos((i/180)*Math.PI) + x;
        var b = rad*Math.sin((i/180)*Math.PI) * (aspectRatio * 1.1) + y;


        list.push(a);
        list.push(b);
    }
    return list;
}


function generateFaces(len) {
    var list = [];
    for (var i=0;i<len;i+=2) {
        list.push(i);
        list.push(i+1);
        list.push(i+2);
    }
    return list;
}


function main(){
    var canvas = document.getElementById("myCanvas"); //canvas dari html
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    /**
     * @type {WebGLRenderingContext}
     */
    var gl;
    try{
        gl = canvas.getContext("webgl",{antialias:false});
    }catch(e){
        alert(e);
        return false;
    }


    aspectRatio = canvas.width/canvas.height;


    var leftEye = generateCircle(-0.155, -0.5, 0.075, aspectRatio);
    var rightEye = generateCircle(0.125, -0.48, 0.075, aspectRatio);


    var bottom = [
        -0.5, 0.2,   
        -0.3, 0.3,   
        -0.1, 0.4,   
        0.1, 0.45,   
        0.3, 0.4,    
        0.5, 0.3,    
        0.6, 0.2,    
        0.5, 0,      
        0.3, -0.1,   
        0.1, -0.15,  
        -0.1, -0.1,  
        -0.3, 0,   
        -0.4, 0,
        -0.6, 0.2,
        -0.4, 0.24,
    
    
    
    ];


    var leftHorn = [-0.3, 0,
                    -0.34, 0.1,
                    -0.34, 0.1,
                    -0.395, 0.3,
                    -0.395, 0.3,
                    -0.395, 0.4,
                    -0.395, 0.4,
                    -0.395, 0.6,
                    -0.395, 0.6,
                    -0.34, 0.75,
                    -0.34, 0.75,
                    -0.3, 0.85,
                    -0.3, 0.85,
                    -0.27, 0.9,
                    -0.27, 0.9,
                    -0.22, 0.95,
                    -0.22, 0.95,
                    -0.18, 0.97,
                    -0.18, 0.97,
                    -0.12, 0.94,
                    -0.12, 0.94,
                    -0.2, 0.85,
                    -0.2, 0.85,
                    -0.22, 0.84,
                    -0.22, 0.84,
                    -0.2, 0.85,
                    -0.2, 0.85,
                    -0.2, 0.85,
                    -0.2, 0.85,
                    -0.125, 0.83,


                    -0.18, 0.81,
                    -0.18, 0.81,
                    -0.24, 0.68,
                    -0.24, 0.68,
                    -0.3, 0.53,
                    -0.3, 0.53,
                    -0.3, 0.41,
                    -0.3, 0.41,
                    -0.28, 0.29,
                    -0.29, 0.29,
                    -0.23, 0.17,
                    -0.23, 0.17,
                    -0.23, 0.17,
                    -0.23, 0.17,
                    -0.23, 0.17,
                    -0.225, 0.165,
        ];


        var rightHorn = [0.27, 0.04,
            0.31, 0.14,
            0.31, 0.14,
            0.365, 0.34,
            0.365, 0.34,
            0.365, 0.44,
            0.365, 0.44,
            0.365, 0.67,
            0.365, 0.67,
            0.33, 0.79,
            0.33, 0.79,
            0.27, 0.89,
            0.27, 0.89,
            0.24, 0.94,
            0.24, 0.94,
            0.19, 0.95,
            0.19, 0.95,
            0.15, 0.94,
            0.15, 0.94,
            0.1, 0.9,
            0.1, 0.9,


            0.23, 0.825,
            0.23, 0.825,
            0.14, 0.82,
            0.14, 0.82,


            0.15, 0.795,
            0.15, 0.795,
            0.19, 0.78,
            0.19, 0.78,
            0.23, 0.68,
            0.23, 0.68,
            0.26, 0.54,
            0.26, 0.54,
            0.26, 0.38,
            0.26, 0.38,
            0.23, 0.26,
            0.24, 0.26,
            0.17, 0.17,
            0.17, 0.17,
            0.155, 0.157,
            0.155, 0.157,
    ];
   
    var lines = [
                // -0.23, 0.17,
                // 0.17, 0.17,
    ]
    var drawline = false; 
    
    var faces = [];
    var flattenedLength = bottom.flat().length;
    for (let i = 0; i < flattenedLength / 2; i++) {
      faces.push(i);
    }
   
    var curve = [];
    var curve2 = [];
    var curve3 = [];
    var count = 0;
   
    curve = generateBSpline(bottom,100, 3, false);
    // curve2 = generateBSpline(leftHorn,100, 8, false);
    // curve3 = generateBSpline(rightHorn,100, 8, false);


    //shader vertex
    var shader_vertex_source = `
        attribute vec2 position;
        attribute vec3 color;


        varying vec3 vColor;
        void main(void){
            gl_Position = vec4(position, 0, 1.);
            vColor = color;
        }


    `;


    //shader fragment
    var shader_fragment_source =`
        precision mediump float;
        varying vec3 vColor;
            void main(void){
                gl_FragColor = vec4(vColor,1.);
            }
    `;




    shader_vertex_source = `
        attribute vec2 position;


        void main(void){
            gl_Position = vec4(position, 0., 1.);
        }
   
    `;
    shader_fragment_source = `
        precision mediump float;
        uniform vec3 outColor;
       
        void main(void){
            gl_FragColor = vec4(outColor,1.);
        }
    `;


    //function untuk membuat shader
    //source = text bahasa GL diatas
    //type = vertex/fragment
    //typeString = string untuk kita tau kalo error
    var compile_shader = function(source, type, typeString) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          alert("ERROR IN " + typeString + " SHADER: " + gl.getShaderInfoLog(shader));
          return false;
        }
        return shader;
    };
    //create shader vertex dengan  function
    var shader_vertex = compile_shader(shader_vertex_source, gl.VERTEX_SHADER, "VERTEX");
    //create shader fragment dengan  function
    var shader_fragment = compile_shader(shader_fragment_source, gl.FRAGMENT_SHADER, "FRAGMENT");
    //buat programnya
    var SHADER_PROGRAM = gl.createProgram();
    //attach kedua shader ke program
    gl.attachShader(SHADER_PROGRAM, shader_vertex);
    gl.attachShader(SHADER_PROGRAM, shader_fragment);


    gl.linkProgram(SHADER_PROGRAM);


    //tangkap error linking
    if (!gl.getProgramParameter(SHADER_PROGRAM, gl.LINK_STATUS)) {
        console.error('ERROR linking program: ', gl.getProgramInfoLog(SHADER_PROGRAM));
        return;
    }
    //tangkap error validating
    gl.validateProgram(SHADER_PROGRAM);
    if (!gl.getProgramParameter(SHADER_PROGRAM, gl.VALIDATE_STATUS)) {
        console.error('ERROR validating program: ', gl.getProgramInfoLog(SHADER_PROGRAM));
    }






    //membuat vertices




    //memanggil variabel position untuk dihubungkan ke dalam shader
    //vao merupakan sebuah jembatan yang mengubungkan aja antara html ke gl dia sebagai bridge
    var position_vao = gl.getAttribLocation(SHADER_PROGRAM, "position");
    gl.enableVertexAttribArray(position_vao);


    var uniform_color = gl.getUniformLocation(SHADER_PROGRAM, "outColor");
    /*
    GETARTTRIBLOCATION AMBIL VARIABEL ATTRIBUTE DARI STRING GL DIATAS


    GETUNIFORMLOCATION AMBIL VARIABEL UNIFORM
    */


    gl.enableVertexAttribArray(uniform_color);


    gl.useProgram(SHADER_PROGRAM);








 
 
    //vbo variable buffer object merupakan sebuahcara untuk memasukkan data nya ke vao
    var circle_vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, circle_vbo);
    gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array(leftEye),
    gl.STATIC_DRAW
    );


    var circle_vbo2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, circle_vbo2);
    gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array(rightEye),
    gl.STATIC_DRAW
    );


    var triangle_vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangle_vbo);
    gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array(bottom),
    gl.STATIC_DRAW
    );


    var horn1_vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, horn1_vbo);
    gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array(leftHorn),
    gl.STATIC_DRAW
    );


    var horn2_vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, horn2_vbo);
    gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array(rightHorn),
    gl.STATIC_DRAW
    );


    var lines_vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, lines_vbo);
    gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array(lines),
    gl.STATIC_DRAW
    );


    var curve_vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, curve_vbo);
    gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array(curve),
    gl.STATIC_DRAW
    );


    var curve_vbo2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, curve_vbo2);
    gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array(curve2),
    gl.STATIC_DRAW
    );


    var curve_vbo3 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, curve_vbo3);
    gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array(curve3),
    gl.STATIC_DRAW
    );
   
    var animate = function(time){
        var triangle_vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, triangle_vbo);
        gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(bottom),
        gl.STATIC_DRAW
        );  


        var curve_vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, curve_vbo);
        gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(curve),
        gl.STATIC_DRAW
        );


        gl.clearColor(0,0,0,0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.D_BUFFER_BIT);


       
       
       
        //params = (vertexAttribLocation, elements, element type, size of vertex/berapa titik, offset)



       
           
        gl.bindBuffer(gl.ARRAY_BUFFER, lines_vbo);
        gl.vertexAttribPointer(position_vao, 2, gl.FLOAT, false, 2*4, 0);
        gl.uniform3f(uniform_color, 1, 1, 1);
        gl.drawArrays(gl.LINES, 0, lines.length/2);


        gl.bindBuffer(gl.ARRAY_BUFFER, curve_vbo);
        gl.vertexAttribPointer(position_vao, 2, gl.FLOAT, false, 2*4, 0);
        gl.uniform3f(uniform_color, 1, 1, 1);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, curve.length/2);

        gl.bindBuffer(gl.ARRAY_BUFFER, curve_vbo);
        gl.vertexAttribPointer(position_vao, 2, gl.FLOAT, false, 2*4, 0);
        gl.uniform3f(uniform_color, 1, 1, 1);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, curve.length/2);


        gl.flush();


       


        window.requestAnimationFrame(animate);


    }
    animate(0);


}
//siapkan semua data nya dulu
//ketika window nay dalam kondisi load aku apnggil main
window.addEventListener("load", main);
//shader pertama akaan menerima titik2 koordinat kita dan akan diterima ke fragment



