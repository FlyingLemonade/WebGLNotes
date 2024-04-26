
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
    console.log(x, y); // Log final X and Y coordinates
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