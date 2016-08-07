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

var m = 1, x = "rgba(0, 0, 0, " + m + ")", y = 2;

//tracks changes to the canvas for the undo function
var cPushArray = [];
var cStep = -1;

//changes from shapes to lines
var lCircleOut = false,
        sCircleOut = false,
        lCircleSolid = false,
        sCircleSolid = false,
        lSquareOut = false,
        sSquareOut = false,
        lSquareSolid = false,
        sSquareSolid = false,
        line = true;



//adds event listeners so that you can draw on the canvas
function init() {
    canvas = document.getElementById('theCanvas');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    ctx.save();
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
    
    var background = new Image();
    background.src = 'flowerOutline.jpg';
    window.onload = function () {
            ctx.drawImage(background, 300, 300, 300, 300);
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

//colors the object
function color(obj) {
    switch (obj.id) {
        case "green":
            x = "rgba(0, 128, 0, " + m + ")";
            break;
        case "blue":
            x = "rgba(0, 0, 255, " + m + ")";
            break;
        case "red":
            x = "rgba(255, 0, 0, " + m + ")";
            break;
        case "yellow":
            x = "rgba(255, 255, 0, " + m + ")";
            break;
        case "orange":
            x = "rgba(255, 165, 0, " + m + ")";
            break;
        case "black":
            x = "rgba(0 ,0, 0, " + m + ")";
            break;
        case "white":
            x = "white";
            break;
    }
    if (x === "white") {
        line = true;
        y = 14;
        m = 1;
    }


}

//changes the brush thickness
function selectThickness(obj) {
    switch (obj.id) {
        case "thin":
            y = 2;
            break;
        case "thicker":
            y = 5;
            break;
        case "thickest":
            y = 8;
            break;

    }
}

//changes the shape
function selectShape(obj) {
    switch (obj.id) {
        case "circleSOutline":
            lCircleOut = false;
            sCircleOut = true;
            lCircleSolid = false;
            sCircleSolid = false;
            lSquareOut = false;
            sSquareOut = false;
            lSquareSolid = false;
            sSquareSolid = false;
            line = false;
            break;
        case "circleSSolid":
            lCircleOut = false;
            sCircleOut = false;
            lCircleSolid = false;
            sCircleSolid = true;
            lSquareOut = false;
            sSquareOut = false;
            lSquareSolid = false;
            sSquareSolid = false;
            line = false;
            break;
        case "squareSOutline":
            lCircleOut = false;
            sCircleOut = false;
            lCircleSolid = false;
            sCircleSolid = false;
            lSquareOut = false;
            sSquareOut = true;
            lSquareSolid = false;
            sSquareSolid = false;
            line = false;
            break;
        case "squareSSolid":
            lCircleOut = false;
            sCircleOut = false;
            lCircleSolid = false;
            sCircleSolid = false;
            lSquareOut = false;
            sSquareOut = false;
            lSquareSolid = false;
            sSquareSolid = true;
            line = false;
            break;
        case "squareLOutline":
            lCircleOut = false;
            sCircleOut = false;
            lCircleSolid = false;
            sCircleSolid = false;
            lSquareOut = true;
            sSquareOut = false;
            lSquareSolid = false;
            sSquareSolid = false;
            line = false;
            break;
        case "circleLSolid":
            lCircleOut = false;
            sCircleOut = false;
            lCircleSolid = true;
            sCircleSolid = false;
            lSquareOut = false;
            sSquareOut = false;
            lSquareSolid = false;
            sSquareSolid = false;
            line = false;
            break;
        case "circleLOutline":
            lCircleOut = true;
            sCircleOut = false;
            lCircleSolid = false;
            sCircleSolid = false;
            lSquareOut = false;
            sSquareOut = false;
            lSquareSolid = false;
            sSquareSolid = false;
            line = false;
            break;
        case "squareLSolid":
            lCircleOut = false;
            sCircleOut = false;
            lCircleSolid = false;
            sCircleSolid = false;
            lSquareOut = false;
            sSquareOut = false;
            lSquareSolid = true;
            sSquareSolid = false;
            line = false;
            break;
        case "line":
            lCircleOut = false;
            sCircleOut = false;
            lCircleSolid = false;
            sCircleSolid = false;
            lSquareOut = false;
            sSquareOut = false;
            lSquareSolid = false;
            sSquareSolid = false;
            line = true;
            break;

    }
}

//changes the opacity
function selectOpacity(obj) {
    switch (obj.id) {
        case "fullOpacity":
            m = 1;
            break;
        case "halfOpacity":
            m = 0.6;
            break;
        case "twentyPerOpacity":
            m = 0.2;
            break;
    }
}
//draws lines
function drawLine() {
    ctx.beginPath();
    ctx.lineJoin = "round";
    ctx.globalAlpha = m;
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.closePath();
    ctx.stroke();
}

//draw small solid square
function drawSmallSolidSquare() {

    ctx.beginPath();
    ctx.moveTo(currX, currY);
    ctx.fillRect(currX, currY, 40, 40);
    ctx.fillStyle = x;
    ctx.fill();
    ctx.closePath();
}

//draws a large solid square
function drawLargeSolidSquare() {

    ctx.beginPath();
    ctx.moveTo(currX, currY);
    ctx.fillRect(currX, currY, 100, 100);
    ctx.fillStyle = x;
    ctx.fill();
    ctx.closePath();
    return true;
}

//draw small outline square
function drawSmallOutlineSquare() {

    ctx.beginPath();
    ctx.moveTo(currX, currY);
    ctx.strokeRect(currX, currY, 40, 40);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();

}

//draw large outline square
function drawLargeOutlineSquare() {

    ctx.beginPath();
    ctx.moveTo(currX, currY);
    ctx.strokeRect(currX, currY, 100, 100);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();

}

//draw small solid circle
function drawSmallSolidCircle() {

    ctx.beginPath();
    ctx.arc(currX, currY, 40, 0, 2 * Math.PI, false);
    ctx.fillStyle = x;
    ctx.fill();
    ctx.closePath();

}

//draw large solid circle
function drawLargeSolidCircle() {

    ctx.beginPath();
    ctx.arc(currX, currY, 100, 0, 2 * Math.PI, false);
    ctx.fillStyle = x;
    ctx.fill();
    ctx.closePath();

}

//draw small outline circle
function drawSmallOutlineCircle() {

    ctx.beginPath();
    ctx.arc(currX, currY, 40, 0, 2 * Math.PI, false);
    ctx.lineWidth = y;
    ctx.strokeStyle = x;
    ctx.stroke();
    ctx.closePath();

}

//draw large outline circle
function drawLargeOutlineCircle() {

    ctx.beginPath();
    ctx.arc(currX, currY, 100, 0, 2 * Math.PI, false);
    ctx.lineWidth = y;
    ctx.strokeStyle = x;
    ctx.stroke();
    ctx.closePath();
}

//clears the entire canvas
function erase() {
    var k = confirm("Are you sure you want to erase everything?");
    if (k) {
        ctx.clearRect(0, 0, w, h);
        cPush();
        document.getElementById("theCanvas").style.background = 'white'; //keeps the white background up after clear (can change that if we decide to make background color changes an option)
    }
}

//pushes the current canvas onto an array of images
function cPush() {
    cStep++;
    if (cStep < cPushArray.length) {
        cPushArray.length = cStep;
    }

    cPushArray.push(canvas.toDataURL());

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
}

function save() {
        document.getElementById("canvasimg").style.border = "2px solid";
        var dataURL = canvas.toDataURL();
        document.getElementById("canvasimg").src = dataURL;
        document.getElementById("canvasimg").style.display = "inline";
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
            if (sSquareSolid) {
                drawSmallSolidSquare();

            } else {
                if (lSquareSolid) {
                    drawLargeSolidSquare();
                } else {
                    if (sCircleSolid) {
                        drawSmallSolidCircle();
                    } else {
                        if (lCircleSolid) {
                            drawLargeSolidCircle();
                        } else {
                            if (sSquareOut) {
                                drawSmallOutlineSquare();
                            } else {
                                if (lSquareOut) {
                                    drawLargeOutlineSquare();
                                } else {
                                    if (sCircleOut) {
                                        drawSmallOutlineCircle();
                                    } else {
                                        if (lCircleOut) {
                                            drawLargeOutlineCircle();
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
    }
    if (res === 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            drawLine();
        }
    }
}
