function generateCircleForTubes(x, y,z, rad, height) {
    var list = [];
    // Center vertex
    list.push(x);
    list.push(y);
    list.push(z); // z-coordinate
    for(var i=0; i < 360;i++){
        var angle1 = (i / 180) * Math.PI;
        var angle2 = ((i + 1) / 180) * Math.PI;
        
        var x1 = rad * Math.cos(angle1) + x;
        var y1 = rad * Math.sin(angle1) + y;
        
        var x2 = rad * Math.cos(angle2) + x;
        var y2 = rad * Math.sin(angle2) + y;

        // First triangle
        list.push(x1);
        list.push(y1);
        list.push(z); // z-coordinate
        
        list.push(x1);
        list.push(y1);
        list.push(height); // z-coordinate
        
        list.push(x2);
        list.push(y2);
        list.push(height); // z-coordinate
        
        // Second triangle
        list.push(x1);
        list.push(y1);
        list.push(z); // z-coordinate
        
        list.push(x2);
        list.push(y2);
        list.push(height); // z-coordinate
        
        list.push(x2);
        list.push(y2);
        list.push(z); // z-coordinate
      
    }
    return list;
}

function generateCircleForCone(x,y,rad){
    var list = [];
    list.push(x);
    list.push(y);
    list.push(3);
    for(var i=0; i < 360;i++){
        var a = rad*Math.cos((i/180)*Math.PI) + x;
        var b = rad*Math.sin((i/180)*Math.PI) + y;
        list.push(a);
        list.push(b);
        list.push(0);   //Location 
      
    }
    return list;
}


function generateCircle(x, y, rad) {

    var list = []
    for (var i = 0; i < 360; i++) {
      var a = rad * Math.cos((i / 180) * Math.PI) + x;
      var b = rad * Math.sin((i / 180) * Math.PI) + y;
      list.push(a);
      list.push(b);
    }
    return list;
  }