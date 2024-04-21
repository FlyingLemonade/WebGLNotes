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