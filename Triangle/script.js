function InitDemo(){

    var CANVAS = document.getElementById("myCanvas");
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;


    var GL;
    //
    // Call webgl
    //
    try{
    GL = CANVAS.getContext("webgl", {
        antialias: true
    });
    } catch(e){
        console.log("FAILED TO CONNECT TO WEBGL");
    }

    //
    // Buat Source untuk shader dan fragment
    //
    
    var vertex_shader_source =
    `   attribute vec2 position;
        attribute vec3 color;

        varying vec3 outColor;
        void main(){
            gl_Position = vec4(position, 0.0 , 1.0);
            outColor = color;
        }

    `

    var fragment_shader_source = 
    `
        precision mediump float;
        varying vec3 outColor;

        void main(){
            gl_FragColor = vec4(outColor,1.0);
        }

    `;

    //
    // Connect webgl dengan source shader dan fragment
    /*
        1. Buat Shader dari GL
        2. GL diberi tahu shader source dari mana dan shader mana yang mau dikasih source
        3. GL di compile
        4. panggil function buat shader vertex sama fragment
        5. buat program di GL
        6. masukan shader yang tadi dibuat ke dalem program ini dengan attachShader lalu di link
        7. ambil position vao dengan getAttribLocation untuk position dan color
        8. lakukan enable kedua vertex tadi
        9. lalu definisikan program apa yang ingin di jalankan

    */
    //

        function connect_shader(source, shader_type){
            var shader = GL.createShader(shader_type);
            GL.shaderSource(shader, source);
            GL.compileShader(shader);
            return shader;
        }

        var shader_vertex = connect_shader(vertex_shader_source, GL.VERTEX_SHADER);
        var shader_fragment = connect_shader(fragment_shader_source, GL.FRAGMENT_SHADER);
        var program = GL.createProgram();
        GL.attachShader(program, shader_vertex);
        GL.attachShader(program, shader_fragment);
        GL.linkProgram(program);

        var position_vao = GL.getAttribLocation(program, "position");
        var color_vao = GL.getAttribLocation(program, "color");
        GL.enableVertexAttribArray(position_vao);
        GL.enableVertexAttribArray(color_vao);
        GL.useProgram(program);


    //
    // Buat koordinat untuk bangun yang ingin dibuat
    //
    var triangle_vertices = [
        0, 0.5,         1,0,0,
        -0.5,-0.5,      0,1,0,
        0.5,-0.5,        0,0,1
    ]


    // 
    // Buat buffer untuk di masukan ke shader
    /*
        1. Buat buffer dari GL
        2. dari buffer tadi di bind dengan vbonya
        3. lalu di buffer
    */
    //
    
    var triangle_vbo = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, triangle_vbo);
    GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(triangle_vertices), GL.STATIC_DRAW);


    //
    // Gambar dengan fungsi animate
    //
    
    function animate(){
        GL.clearColor(0,0,0,0);
        GL.clear(GL.COLOR_BUFFER_BIT);

        GL.bindBuffer(GL.ARRAY_BUFFER, triangle_vbo);

        GL.vertexAttribPointer(position_vao, 2, GL.FLOAT,false,5*4, 0);
        GL.vertexAttribPointer(color_vao, 3, GL.FLOAT,false,5*4, 2*4);

        GL.drawArrays(GL.TRIANGLES, 0, triangle_vertices.length/2);

        GL.flush();


        window.requestAnimationFrame(animate);
    }
    animate();

}
