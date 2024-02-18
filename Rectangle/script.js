function main(){
    //setup
    var CANVAS  = document.getElementById("myCanvas");
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;


    var GL;
    try{
        GL = CANVAS.getContext("webgl",{antialias: true});
    }catch(e){
        alert(e);
        return false;
    }


    //shader
    var shader_vertex_source = `
        attribute vec2 position;

        void main(void){
            gl_Position = vec4(position, 0., 1.);
            
        
        }
    `;

    // GL_FRAGCOLOR change the object color
    var shader_fragment_source = `
        precision mediump float;
        uniform vec3 outColor;
  
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

    GL.enableVertexAttribArray(position_vao);

    GL.useProgram(SHADER_PROGRAM);
    
    var uniform_color = GL.getUniformLocation(SHADER_PROGRAM,"outColor")



    // RECTANGLE
    //coord
    var triangle_vertices = [
        -0.25, 0.25,  
        0.25,0.25,      
        -0.25, -0.25,    
        0.25, -0.25,
        ];

        

    //vbo
    var triangle_vbo = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, triangle_vbo);
    GL.bufferData(GL.ARRAY_BUFFER,
        new Float32Array(triangle_vertices),
        GL.STATIC_DRAW);

    var triangle_elements = [
        0,2,3,
        1,2,3,
        0,1,3

    ]


    // EBO 
    var triangle_ebo = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, triangle_ebo);
    GL.bufferData(GL.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(triangle_elements),
        GL.STATIC_DRAW);

        
    var animate = function(){
        GL.clearColor(0,0,0,0);
        GL.clear(GL.COLOR_BUFFER_BIT);

        GL.uniform3f(uniform_color,1,1,0);
        GL.bindBuffer(GL.ARRAY_BUFFER, triangle_vbo);
        GL.vertexAttribPointer(position_vao, 2, GL.FLOAT, false, 2*4, 0);
        GL.drawElements(GL.TRIANGLES, triangle_elements.length, GL.UNSIGNED_SHORT,0);

        GL.flush();


        window.requestAnimationFrame(animate);
    }
    animate();
}


window.addEventListener("load", main);

