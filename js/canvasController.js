'use strict'

var gIsMouseUp = true;
var gIsSelected = false;

function onMouseUp(){
    gIsMouseUp = true;
}

function onMouseDown(event) {
    gIsMouseUp = false;
    gIsSelected = false;
    renderCanvas();
    setTimeout(() => {
        const linesCount = getFromMeme('lines').length;
        let currLine;
        for (var i = 0; i < linesCount; i++) {
            let size = getFromLines(i, 'size');
            let y = getFromLines(i, 'y');
            if (event.offsetY > y - size &&
                event.offsetY < y) {
                currLine = i;
                setInMeme('selectedLineIdx', i);
                drawRect();
                switchLine(i);
                gIsSelected = true;
                return;
            }
            
        }
    }, 0);
}

function drawRect() {  
    let currLine = getFromMeme('selectedLineIdx');
    let y = getFromLines(currLine, 'y');
    let size = getFromLines(currLine, 'size');
    gCtx.beginPath();
    gCtx.strokeStyle = 'black';
    gCtx.rect(0, y + 5, getCanvasSize().width, -size);
    gCtx.stroke();
    gCtx.closePath();
}

function onMouseMove(event) {
    if(gIsMouseUp) return;
    if(!gIsSelected) return;
    let currLine = getFromMeme('selectedLineIdx');
    setInLines(currLine,'y',event.offsetY);
    renderCanvas();
    setTimeout(() => {
        drawRect()
    }, 20);
}

function drawImg() {
    let img = new Image();
    let canvasCtx = getCanvasCtx();
    let canvasSize = getCanvasSize();
    img.src = getCurrImg().url;
    img.onload = () => {
        canvasCtx.drawImage(img, 0, 0, canvasSize.width, canvasSize.height);
    }
    setFocus();
}

function drawText() {
    let lineCounter = getFromMeme('lines');
    for (var i = 0; i < lineCounter.length; i++) {
        let x = getCanvasSize().width / 2;
        let y = getFromLines(i, 'y');
        // let y = getCanvasSize().height - getCanvasSize().height + getFromLines(i,'y');
        let text = getFromLines(i, 'txt');
        let font = getFromLines(i, 'font');
        setCanvasCtx('lineWidth', getFromLines(i, 'strokeWidth'));
        setCanvasCtx('strokeStyle', getFromLines(i, 'stroke'));
        setCanvasCtx('fillStyle', getFromLines(i, 'fill'));
        setCanvasCtx('font', getFromLines(i, 'size') + 'px ' + font);
        gCtx.textAlign = getFromLines(i, 'align');
        gCtx.fillText(text, x, y);
        gCtx.strokeText(text, x, y);
    }
}

function renderCanvas() {
    drawImg();
    setTimeout(() => {
        drawText();
    }, 0);
    resizeCanvas();
}