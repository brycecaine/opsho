$(document).ready(function() {
    var canvas = document.querySelector("#myCanvas");
    var context = canvas.getContext("2d");

    var x = 300;
    var y = 300;
    var radius = 200;
    var startAngle = 1.5 * Math.PI;
    var endAngle = (2 * Math.random() + 1.5) * Math.PI;
    var angleDegrees = (endAngle - startAngle) * 57.2957795;
    var counterClockwise = false;

    context.beginPath();
    context.moveTo(x, y);        // Top Corner
    context.lineTo(x, y - radius); // Bottom Right
    context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
    context.lineTo(x, y);         // Bottom Left
    context.lineWidth = 10;

    // line color
    context.strokeStyle = 'black';
    context.stroke();
    console.log(angleDegrees);
});
