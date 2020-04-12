'use strict';

function init() {
    setImgs();
    _renderGallery();
}

function _renderGallery() {
    let strHTML = '';
    const imgs = getImgs();

    imgs.map(img => {
        strHTML += `<div class="img-container flex center"><img class="img img${img.id} cursor-pointer" href="editor.html" 
        onclick="onImgClicked(${img.id})" src="${img.url}"></div>`
    });
    document.querySelector('.gallery-container').innerHTML = strHTML;
}

function onImgClicked(imgId) {
    setInMeme('selectedImgId', imgId);
    setCurrImg(imgId);
    _renderPage();
    resizeCanvas();
    renderCanvas();
    renderButtons()
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth;
    gCanvas.height = elContainer.offsetHeight;
}

function _renderPage() {
    document.querySelector('.mime-maker').classList.toggle('hide');
    document.querySelector('.img-selection').classList.toggle('hide');
    let canvasContainer = document.querySelector('.canvas-container');
    let memeEditor = document.querySelector('.meme-editor');
    canvasContainer.style.display = 'inline-block';
    memeEditor.style.display = 'inline-block';
}

function onTextInput() {
    let currLine = getFromMeme('selectedLineIdx');
    let value = document.querySelector('.text-input').value;
    setInLines(currLine, 'txt', value);
    renderCanvas();
    setTimeout(() => {
        drawRect()
    }, 20);
}

function onTextSize(add) {
    let currLine = getFromMeme('selectedLineIdx');
    let size = getFromLines(currLine, 'size');
    let y = getFromLines(currLine, 'y');
    if (y < size) setInLines(currLine, 'y', size); //if the txt get to big
    setInLines(currLine, 'size', size + add);
    renderCanvas();
}

function onTextPos(add) {
    let currLine = getFromMeme('selectedLineIdx');
    let size = getFromLines(currLine, 'y');
    setInLines(currLine, 'y', size + add);
    console.log(size);
    renderCanvas();
}

function onSwitchLine() {
    let linesCount = getFromMeme('lines').length;
    let currLine = getFromMeme('selectedLineIdx');
    if (currLine >= linesCount - 1) {
        currLine = 0;
        setInMeme('selectedLineIdx', currLine);
    } else {
        setInMeme('selectedLineIdx', ++currLine);
    }
    currLine = getFromMeme('selectedLineIdx');
    document.querySelector('.text-input').value = getFromLines(currLine, 'txt');
    setFocus();
    onTextInput();
    setTimeout(() => {
        drawRect()
    }, 20);
}

function switchLine(line){
    setInMeme('selectedLineIdx', line);
    document.querySelector('.text-input').value = getFromLines(line, 'txt');
    setTimeout(() => {
        setFocus();
    }, 100);
}

function onAddLine() {
    let linesCount = getFromMeme('lines').length - 1;
    createLine();
    setInMeme('selectedLineIdx', linesCount);
    onSwitchLine();
}

function onSetFont(value){
    let currLine = getFromMeme('selectedLineIdx');
    setInLines(currLine,'font',value)
    renderCanvas()
}

function onDelete() {
    let currLine = getFromMeme('selectedLineIdx');
    let lines = getFromMeme('lines');
    if (lines.length === 1) return;
    let nextLine = currLine + 1;
    if (currLine >= lines.length - 1) nextLine = 1;
    lines.splice(currLine, 1);
    for (var i = 0; i < lines.length; i++) {
        setInLines(i, 'id', i);
    }
    setInMeme('selectedLineIdx', nextLine - 1);
    renderCanvas();
    setFocus();
    setTimeout(() => {
        drawRect()
    }, 100);
}

function onSetAlign() {
    let aligns = ['start', 'center', 'end'];
    setScrollSettings('align', aligns, '.align-controller');
}

function setScrollSettings(key, values, selector) {
    let currLine = getFromMeme('selectedLineIdx');
    let currValue = getFromLines(currLine, key);
    let nextValueIdx = (values.indexOf(currValue)) + 1;
    if (nextValueIdx > values.length - 1) nextValueIdx = 0;
    let nextValue = values[nextValueIdx];
    setInLines(currLine, key, nextValue);
    _renderButton(nextValue, selector);
    renderCanvas();
}

function _renderButton(value, selector) {
    console.log(value);
    
    document.querySelector(selector).innerHTML = `<img src="ICONS/${value}.png">`;
}

function onSetColor(el, key){
    let currLine = getFromMeme('selectedLineIdx');
    let color = el.value;
    setInLines(currLine, key, color);
    renderCanvas();
}

function onGalleryDisplay(){
    document.querySelector('.mime-maker').classList.add('hide');
    document.querySelector('.img-selection').classList.remove('hide');
}

function setFocus() {
    document.querySelector('.text-input').focus();
}

function renderButtons(){
    document.querySelector('.text-size-plus').innerHTML = '<img src="ICONS/increase.png">';
    document.querySelector('.text-size-min').innerHTML = '<img src="ICONS/decrease.png">';
    document.querySelector('.text-pos-up').innerHTML = '<img src="ICONS/arrow.png">';
    document.querySelector('.text-pos-down').innerHTML = '<img src="ICONS/arrow.png">';
    document.querySelector('.delete').innerHTML = '<img src="ICONS/trash.png">';
    document.querySelector('.add-line').innerHTML = '<img src="ICONS/add.png">';
    document.querySelector('.stroke').innerHTML = '<img src="ICONS/stroke.png">';
    document.querySelector('.lines-controller').innerHTML = '<img src="ICONS/switch.png">';
    document.querySelector('.align-controller').innerHTML = '<img src="ICONS/center.png">';
}