'use strict'

var gId = 2
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
        id: 0,
        txt: 'I never ate Falafel',
        size: 45,
        align: 'center',
        fill: 'white',
        stroke: 'black',
        strokeWidth: 3,
        font: 'IMPACT',
        x: 0,
        y: 45
    },
    {
        id: 1,
        txt: 'In my life',
        size: 45,
        align: 'center',
        fill: 'white',
        stroke: 'black',
        strokeWidth: 3,
        font: 'IMPACT',
        x: 0,
        y: getCanvasSize().height - 110
    }
]
}

function setInMeme(key,value) {
    gMeme[key] = value;
}

function getFromMeme(key) {
    return gMeme[key]
}

function setInLines(lineNumber, key, value) {
    gMeme.lines[lineNumber][key] = value;
}

function getFromLines(lineNumber, key) {
    return gMeme.lines[lineNumber][key]
}

function createLine(){
    let line = {
        id: gId++,
        txt: '',
        size: 45,
        align: 'center',
        fill: 'white',
        stroke: 'black',
        strokeWidth: 3,
        font: 'IMPACT',
        x: 0,
        y: getCanvasSize().height/2 + 20
    }
    gMeme.lines.push(line);
}