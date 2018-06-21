'use strict';

function init() {
  var imgs = getImgsForDisplay('All');
  var keywords = getkeywordsForDisplay();
  renderImgs(imgs);
  renderKeywords(keywords);
  // renderFilter(keywords);
  renderInput(keywords);
}

function renderImgs(imgs) {
  var strHTML = imgs.map(function(img) {
    return `
    <img class="img-gallery" onclick="openModal(${
      img.id
    })" src="img/${img.id}.jpg">
        `;
  });

  document.querySelector('.gallery').innerHTML = strHTML.join('');
}

function renderKeywords(keywords) {
  var strHTML = '';

  for (var key in keywords) {
    strHTML += `<li class="tag-word" style="font-size: ${keywords[key] *
      10}px" onclick="onTagCliked('${key}')">
    ${key}
</li>`;
  }

  document.querySelector('.keywords').innerHTML = strHTML;
}

// function renderFilter(keywords) {
//   var strHTML = '<option>All</option>';
//   for (var key in keywords) {
//     strHTML += `<option >${key} </option>`;
//   }
//   document.querySelector('.input-option').innerHTML = strHTML;
// }

function renderInput(keywords) {
  var strHTML = `<option value="All">`;
  for (var key in keywords) {
    strHTML += `<option value="${key}">`;
  }
  document.querySelector('#browsers').innerHTML = strHTML;
}
function onTagCliked(strTag) {
  var imgs = getImgsForDisplay(strTag);
  // document.querySelector('#browsers').value = strTag;
  renderImgs(imgs);
}

function toggleMenu() {
  var menu = document.querySelector('.nav');
  menu.classList.toggle('open');
}

// function onFileInputChange(ev) {
//   handleImageFromInput(ev, renderCanvas);
// }

function openModal(id) {
  setNewMeme(id);
  $('.editor').toggleClass('hidden');

  renderCanvas();
}

function renderCanvas(id) {
  var id = getMemeImgId();
  var canvas = document.getElementById('meme-canvas');
  var ctx = canvas.getContext('2d');
  var img = new Image();
  img.src = getImgById(id).url;
  img.onload = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var height = img.height;
    var width = img.width;
    var originalRatio = height / width;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.width * originalRatio);

    var meme = getMemeInfo();
    meme.txts.forEach(function(txt) {
      ctx.fillStyle = txt.color;
      ctx.font = `${txt.size}px ${txt.font}`;
      ctx.fillText(txt.line, txt.cordX, txt.cordY);
      ctx.lineWidth = 2;
      ctx.strokeText(txt.line, txt.cordX, txt.cordY);
    });
  };
}

function memeLineTyped(ev) {
  var newText = ev.target.value;
  var inputIdx = ev.target.classList[0].slice(-1);
  setMemeLine(inputIdx, newText);
  renderCanvas();
}
