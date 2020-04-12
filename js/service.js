'use strict';

var gCanvas = document.querySelector('#my-canvas');
var gCtx = gCanvas.getContext('2d');
var gIdx = 1;
var gTotalImgs = 28;
var gImgs;
var gCurrImg;


function getCurrImg() {
    return gCurrImg;
}

function setCurrImg(imgId) {
    gCurrImg = gImgs.find(({ id }) => id === imgId);
}

function setImgs() {
    gImgs = createImgs();
}

function createImgs() {
    let imgs = [];
    for (var i = 0; i < gTotalImgs; i++) {
        imgs.push(createImg());
    }
    return imgs;
}

function createImg() {
    let img = {
        url: `imgs/${gIdx}.jpg`,
        id: gIdx++,
        keywords: ['happy']
    };
    return img;
}

function getImgs() {
    return gImgs;
}

function getCanvasCtx() {
    return gCtx;
}

function getCanvasSize() {
    const canvasSize = { width: gCanvas.width, height: gCanvas.height };
    return canvasSize;
}

function setCanvasCtx(key, value) {
    gCtx[key] = value;
}

function getFromCanvasCtx(key) {
    return gCtx[key];
}