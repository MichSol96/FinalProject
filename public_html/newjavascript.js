/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//global variables
var canvas, ctx, flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dotFlag = false;

var q, r, b, g, y, x;

var gradOn, shade;

//tracks changes to the canvas for the undo function
var cPushArray = [];
var cStep = -1;

//changes from shapes to lines
var circleOut = false,
        circleSolid = false,
        squareOut = false,
        squareSolid = false,
        diamondSolid = false,
        triangleSolid = false,
        diamondOut = false,
        triangleOut = false,
        line = true;
var shapeSize = 10;


var theBackground = new Image();

//adds event listeners so that you can draw on the canvas
function init() {
    canvas = document.getElementById('theCanvas');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    gradOn = false;

    ctx.save();
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, w, h);
    ctx.restore();

    // theBackground.src = "images/flowerOutline.jpg";
    theBackground.onload = function () {
        ctx.drawImage(theBackground, 0, 0, w, h);
    };
    cPush();

    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e);
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e);
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e);
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e);
    }, false);
}

function selectGradient(obj) {
    switch (obj.id) {
        case "gradientOff":
            gradOn = false;
            break;
        case "gradientOn":
            gradOn = true;
            break;
    }
}

//draws lines
function drawLine() {

    ctx.beginPath();
    ctx.lineJoin = "round";

    y = document.getElementById("brushRange").value; //gets line thickness value

    q = document.getElementById("opacityRange").value; //gets opacity value
    r = document.getElementById("redRange").value; //gets red value
    g = document.getElementById("greenRange").value; // gets green value
    b = document.getElementById("blueRange").value; // gets blue value
    y = document.getElementById("brushRange").value; //gets line thickness value

    ctx.globalAlpha = q; //sets opacity value

    shade = "rgb(" + r + ", " + g + ", " + b + ")";

    if (gradOn) {
        var grad = ctx.createLinearGradient(0, 0, prevX + currX, prevY + currY);
        grad.addColorStop(0, shade);
        grad.addColorStop(1, "white");
        ctx.strokeStyle = grad;
    } else {
        ctx.strokeStyle = shade;
    }

    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    //ctx.strokeStyle = shade;

    ctx.lineWidth = y;

    ctx.closePath();
    ctx.stroke();

}




//changes the shape
function selectShape(obj) {
    switch (obj.id) {
        case "circleOutline":
            circleOut = true;
            circleSolid = false;
            squareOut = false;
            squareSolid = false;
            diamondSolid = false;
            triangleSolid = false;
            diamondOut = false;
            triangleOut = false;
            line = false;
            break;
        case "circleSolid":
            circleOut = false;
            circleSolid = true;
            squareOut = false;
            squareSolid = false;
            diamondSolid = false;
            triangleSolid = false;
            diamondOut = false;
            triangleOut = false;
            line = false;
            break;
        case "squareOutline":
            circleOut = false;
            circleSolid = false;
            squareOut = true;
            squareSolid = false;
            diamondSolid = false;
            triangleSolid = false;
            diamondOut = false;
            triangleOut = false;
            line = false;
            break;
        case "squareSolid":
            circleOut = false;
            circleSolid = false;
            squareOut = false;
            squareSolid = true;
            diamondSolid = false;
            triangleSolid = false;
            diamondOut = false;
            triangleOut = false;
            line = false;
            break;

        case "line":
            circleOut = false;
            circleSolid = false;
            squareOut = false;
            squareSolid = false;
            diamondSolid = false;
            triangleSolid = false;
            diamondOut = false;
            triangleOut = false;
            line = true;
            break;

        case "triangleSolid":
            circleOut = false;
            circleSolid = false;
            squareOut = false;
            squareSolid = false;
            diamondSolid = false;
            triangleSolid = true;
            diamondOut = false;
            triangleOut = false;
            line = false;
            break;
        case "triangleOutline":
            circleOut = false;
            circleSolid = false;
            squareOut = false;
            squareSolid = false;
            diamondSolid = false;
            triangleSolid = false;
            diamondOut = false;
            triangleOut = true;
            line = false;
            break;
        case "diamondSolid":
            circleOut = false;
            circleSolid = false;
            squareOut = false;
            squareSolid = false;
            diamondSolid = true;
            triangleSolid = false;
            diamondOut = false;
            triangleOut = false;
            line = false;
            break;
        case "diamondOutline":
            circleOut = false;
            circleSolid = false;
            squareOut = false;
            squareSolid = false;
            diamondSolid = false;
            triangleSolid = false;
            diamondOut = true;
            triangleOut = false;
            line = false;
            break;

    }

}




//draw small solid square
function drawSolidSquare() {


    ctx.beginPath();
    ctx.moveTo(currX, currY);

    shapeSize = document.getElementById("sizeRange").value;


    q = document.getElementById("opacityRange").value; //gets opacity value

    r = document.getElementById("redRange").value; //gets red value
    g = document.getElementById("greenRange").value; // gets green value
    b = document.getElementById("blueRange").value; // gets blue value
    y = document.getElementById("brushRange").value; //gets line thickness value

    ctx.globalAlpha = q;

    shade = "rgb(" + r + ", " + g + ", " + b + ")";

    if (gradOn) {
        var grad = ctx.createLinearGradient(0, 0, currX + (shapeSize - (shapeSize / 20)), 0);
        grad.addColorStop(0, shade);
        grad.addColorStop(1, "white");
        ctx.fillStyle = grad;
    } else {
        ctx.fillStyle = shade;
    }

    ctx.fillRect(currX, currY, shapeSize, shapeSize);



    ctx.fill();
    ctx.closePath();
}


//draw small outline square
function drawOutlineSquare() {

    ctx.beginPath();
    ctx.moveTo(currX, currY);

    shapeSize = document.getElementById("sizeRange").value;

    q = document.getElementById("opacityRange").value; //gets opacity value
    r = document.getElementById("redRange").value; //gets red value
    g = document.getElementById("greenRange").value; // gets green value
    b = document.getElementById("blueRange").value; // gets blue value
    y = document.getElementById("brushRange").value; //gets line thickness value

    ctx.globalAlpha = q;

    shade = "rgb(" + r + ", " + g + ", " + b + ")";

    if (gradOn) {
        var grad = ctx.createLinearGradient(0, 0, currX + (shapeSize - (shapeSize / 20)), 0);
        grad.addColorStop(0, shade);
        grad.addColorStop(1, "white");
        ctx.strokeStyle = grad;
    } else {
        ctx.strokeStyle = shade;
    }

    ctx.strokeRect(currX, currY, shapeSize, shapeSize);
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();

}


//draw small solid circle
function drawSolidCircle() {

    ctx.beginPath();

    shapeSize = document.getElementById("sizeRange").value;

    ctx.arc(currX, currY, shapeSize, 0, 2 * Math.PI, false);

    q = document.getElementById("opacityRange").value; //gets opacity value
    r = document.getElementById("redRange").value; //gets red value
    g = document.getElementById("greenRange").value; // gets green value
    b = document.getElementById("blueRange").value; // gets blue value
    y = document.getElementById("brushRange").value; //gets line thickness value


    ctx.globalAlpha = q;

    shade = "rgb(" + r + ", " + g + ", " + b + ")";

    if (gradOn) {
        var grad = ctx.createLinearGradient(0, 0, currX + (shapeSize - (shapeSize / 20)), 0);
        grad.addColorStop(0, shade);
        grad.addColorStop(1, "white");
        ctx.fillStyle = grad;
    } else {
        ctx.fillStyle = shade;
    }
    ctx.fill();
    ctx.closePath();

}


//draw small outline circle
function drawOutlineCircle() {

    ctx.beginPath();

    shapeSize = document.getElementById("sizeRange").value;

    ctx.arc(currX, currY, shapeSize, 0, 2 * Math.PI, false);


    q = document.getElementById("opacityRange").value; //gets opacity value
    r = document.getElementById("redRange").value; //gets red value
    g = document.getElementById("greenRange").value; // gets green value
    b = document.getElementById("blueRange").value; // gets blue value
    y = document.getElementById("brushRange").value; //gets line thickness value


    ctx.globalAlpha = q;
    ctx.lineWidth = y;

    shade = "rgb(" + r + ", " + g + ", " + b + ")";

    if (gradOn) {
        var grad = ctx.createLinearGradient(0, 0, currX + (shapeSize - (shapeSize / 20)), 0);
        grad.addColorStop(0, shade);
        grad.addColorStop(1, "white");
        ctx.strokeStyle = grad;
    } else {
        ctx.strokeStyle = shade;
    }


    ctx.stroke();
    ctx.closePath();

}

function drawOutlineDiamond() {

    ctx.beginPath();
    //ctx.moveTo(currX, currY);

    shapeSize = document.getElementById("sizeRange").value;

    q = document.getElementById("opacityRange").value; //gets opacity value
    r = document.getElementById("redRange").value; //gets red value
    g = document.getElementById("greenRange").value; // gets green value
    b = document.getElementById("blueRange").value; // gets blue value
    y = document.getElementById("brushRange").value; //gets line thickness value

    ctx.globalAlpha = q;

    shade = "rgb(" + r + ", " + g + ", " + b + ")";

    if (gradOn) {
        var grad = ctx.createLinearGradient(0, 0, currX + (shapeSize - (shapeSize / 20)), 0);
        grad.addColorStop(0, shade);
        grad.addColorStop(1, "white");
        ctx.strokeStyle = grad;
    } else {
        ctx.strokeStyle = shade;
    }

    ctx.save();

    ctx.translate(currX + shapeSize / 2, currY + shapeSize / 2);
    ctx.rotate(45 * Math.PI / 180);

    ctx.strokeRect(-shapeSize / 2, -shapeSize / 2, shapeSize, shapeSize);

    ctx.restore();

    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

function drawSolidDiamond() {

    ctx.beginPath();
    ctx.moveTo(currX, currY);

    shapeSize = document.getElementById("sizeRange").value;

    q = document.getElementById("opacityRange").value; //gets opacity value
    r = document.getElementById("redRange").value; //gets red value
    g = document.getElementById("greenRange").value; // gets green value
    b = document.getElementById("blueRange").value; // gets blue value
    y = document.getElementById("brushRange").value; //gets line thickness value

    ctx.globalAlpha = q;

    shade = "rgb(" + r + ", " + g + ", " + b + ")";

    if (gradOn) {
        var grad = ctx.createLinearGradient(0, 0, currX + (shapeSize - (shapeSize / 20)), 0);
        grad.addColorStop(0, shade);
        grad.addColorStop(1, "white");
        ctx.fillStyle = grad;
    } else {
        ctx.fillStyle = shade;
    }

    ctx.save();

    ctx.translate(currX + shapeSize / 2, currY + shapeSize / 2);
    ctx.rotate(45 * Math.PI / 180);

    ctx.fillRect(-shapeSize / 2, -shapeSize / 2, shapeSize, shapeSize);
    ctx.fill();
    ctx.restore();

    
    ctx.closePath();
}

function drawOutlineTriangle() {
    ctx.beginPath();
    ctx.moveTo(currX, currY);

    shapeSize = document.getElementById("sizeRange").value;

    q = document.getElementById("opacityRange").value; //gets opacity value
    r = document.getElementById("redRange").value; //gets red value
    g = document.getElementById("greenRange").value; // gets green value
    b = document.getElementById("blueRange").value; // gets blue value
    y = document.getElementById("brushRange").value; //gets line thickness value

    ctx.globalAlpha = q;

    shade = "rgb(" + r + ", " + g + ", " + b + ")";

    if (gradOn) {
        var grad = ctx.createLinearGradient(0, 0, currX + (shapeSize - (shapeSize / 20)), 0);
        grad.addColorStop(0, shade);
        grad.addColorStop(1, "white");
        ctx.strokeStyle = grad;
    } else {
        ctx.strokeStyle = shade;
    }

    ctx.lineTo(currX + (shapeSize / 2), currY + (shapeSize / 2));
    ctx.lineTo(currX - (shapeSize / 2), currY + (shapeSize / 2));
    ctx.lineTo(currX, currY);
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

function drawSolidTriangle() {
    ctx.beginPath();
    ctx.moveTo(currX, currY);

    shapeSize = document.getElementById("sizeRange").value;

    q = document.getElementById("opacityRange").value; //gets opacity value
    r = document.getElementById("redRange").value; //gets red value
    g = document.getElementById("greenRange").value; // gets green value
    b = document.getElementById("blueRange").value; // gets blue value
    y = document.getElementById("brushRange").value; //gets line thickness value

    ctx.globalAlpha = q;

    shade = "rgb(" + r + ", " + g + ", " + b + ")";

    if (gradOn) {
        var grad = ctx.createLinearGradient(0, 0, currX + (shapeSize - (shapeSize / 20)), 0);
        grad.addColorStop(0, shade);
        grad.addColorStop(1, "white");
        ctx.fillStyle = grad;
    } else {
        ctx.fillStyle = shade;
    }

    ctx.lineTo(currX + (shapeSize / 2), currY + (shapeSize / 2));
    ctx.lineTo(currX - (shapeSize / 2), currY + (shapeSize / 2));
    ctx.lineTo(currX, currY);

    ctx.fill();
    ctx.closePath();
}





//pushes the current canvas onto an array of images
function cPush() {
    cStep++;
    if (cStep < cPushArray.length) {
        cPushArray.length = cStep;
    }

    cPushArray.push(canvas.toDataURL());

}

//clears the entire canvas
function erase() {
    var k = confirm("Are you sure you want to erase everything?");
    if (k) {
        ctx.clearRect(0, 0, w, h);
        cPush();
        document.getElementById("theCanvas").style.background = 'white';
        //theBackground.src = "images/flowerOutline.jpg";
        theBackground.onload = function () {
            ctx.drawImage(theBackground, 0, 0, w, h);
        };
    }
}


//undos using images from the array of saved canvas images
function undo() {
    if (cStep > 0) {
        cStep--;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[(cStep - 1)];

        canvasPic.onload = function () {
            ctx.drawImage(canvasPic, 0, 0);
        };
    }
    document.getElementById("theCanvas").style.background = 'white';
}

function save() {
    document.getElementById("canvasimg").style.border = "1px solid";
    var dataURL = canvas.toDataURL();
    document.getElementById("canvasimg").src = dataURL;
    document.getElementById("canvasimg").style.display = "inline";
}


function selectBackground(obj) {
    switch (obj.id) {
        case "flowerOutline":
            theBackground.src = "images/flowerOutline.jpg";
            break;
        case "blankBackground":
            theBackground.src = "images/blankBackground.jpg";
            break;
        case "butterflyBackground":
            theBackground.src = "images/butterflyBackground.jpg";
            break;
        case "lionBackground":
            theBackground.src = "images/lionBackground.jpg";
            break;
        case "elephantBackground":
            theBackground.src = "images/elephantBackground.jpg";
            break;
        case "fishBackground":
            theBackground.src = "images/fishBackground.jpg";
            break;
    }
}

//this is how it finds the current (x, y) coordinate of the mouse so it will draw the line/shape in that place
function findxy(res, e) {
    if (res === 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dotFlag = true;
        if (line) {
            if (dotFlag) {
                ctx.beginPath();
                ctx.fillStyle = x;
                ctx.fillRect(currX, currY, y, y);
                ctx.closePath();
                dotFlag = false;
            }

        } else {
            if (squareSolid) {
                drawSolidSquare();
            } else {
                if (circleSolid) {
                    drawSolidCircle();
                } else {
                    if (squareOut) {
                        drawOutlineSquare();
                    } else {
                        if (circleOut) {
                            drawOutlineCircle();
                        } else {
                            if (diamondSolid) {
                                drawSolidDiamond();
                            } else {
                                if (triangleSolid) {
                                    drawSolidTriangle();
                                } else {
                                    if (diamondOut) {
                                        drawOutlineDiamond();
                                    } else {
                                        if (triangleOut) {
                                            drawOutlineTriangle();
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }


    if (res === 'up' || res === "out") {
        cPush();
        flag = false;
        eraser = false;
    }
    if (res === 'move' && line) {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            drawLine();
        }
    }
}