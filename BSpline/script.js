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
  function normalizeScreen(x,y,width,height){
    var nx = 2*x/width - 1
    var ny = -2*y/height + 1
    return [nx,ny]
  }
  
  function generateBSpline(controlPoint, m, degree){
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
        console.log(C);
        x+=(controlPoint[key*2] * C);
        y+=(controlPoint[key*2+1] * C);
        console.log(t+" "+degree+" "+x+" "+y+" "+C);
      }
      curves.push(x);
      curves.push(y);
     
    }
    console.log(curves)
    return curves;
}

function main() {
    // Canvas setup
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables to store square coordinates
var squares = [];
var clickCount = 0;

// Event listener for mouse clicks
canvas.addEventListener("click", function(event) {
    var x = event.clientX;
    var y = event.clientY;

    // Increment click count
    clickCount++;

    // Draw square
    ctx.beginPath();
    ctx.rect(x - 10, y - 10, 20, 20);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    // Store square coordinates
    squares.push({ x: x, y: y });

    // Draw line if it's the second click or later
    if (clickCount >= 2) {
        var prevSquare = squares[squares.length - 2];
        ctx.beginPath();
        ctx.moveTo(prevSquare.x, prevSquare.y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = "green";
        ctx.stroke();
        ctx.closePath();
    }

    // Draw curve if it's the third click
    if (clickCount >= 3) {
        var firstSquare = squares[0];
        var lastSquare = squares[squares.length - 1];

        ctx.beginPath();
        ctx.moveTo(firstSquare.x, firstSquare.y);
        for (var i = 1; i < squares.length - 1; i++) {
            var controlPointX = (squares[i].x + squares[i + 1].x) / 2;
            var controlPointY = (squares[i].y + squares[i + 1].y) / 2;
            ctx.quadraticCurveTo(squares[i].x, squares[i].y, controlPointX, controlPointY);
        }
        ctx.quadraticCurveTo(lastSquare.x, lastSquare.y, lastSquare.x, lastSquare.y);
        ctx.strokeStyle = "blue";
        ctx.stroke();
        ctx.closePath();
    }
});


}

window.addEventListener('load', main);