'use strict'

function init() {
    var imgs = getImgsForDisplay()
    renderImgs(imgs)
    renderKeywords()
}

function renderImgs(imgs) {

}

function renderKeywords() {

}

function openModal(id) {
    setNewMeme(id)
    $('.editor').toggleClass('hidden');

    
    renderCanvas()
}

function renderCanvas(id) {
    var id = getMemeImgId()
    var canvas = document.getElementById('meme-canvas');
    var ctx = canvas.getContext('2d');
    var img = new Image()
    img.src = getImgById(id).url
    img.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        var height = img.height;
        var width = img.width;
        var originalRatio = height/width;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.width*originalRatio)
 
        var meme = getMemeInfo()
        meme.txts.forEach(function(txt) {
            ctx.fillStyle = txt.color;
            ctx.font = `${txt.size}px ${txt.font}`
            ctx.fillText(txt.line, txt.cordX, txt.cordY);
            ctx.lineWidth = 2;
            ctx.strokeText(txt.line, txt.cordX, txt.cordY)
        })
    }
}

function memeLineTyped(ev) {
    var newText = ev.target.value;
    var inputIdx = ev.target.classList[0].slice(-1);    
    setMemeLine(inputIdx, newText);
    renderCanvas()
}
