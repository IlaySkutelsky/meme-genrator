'use strict';

function init() {
  var imgs = getImgsForDisplay('All');
  var keywords = getkeywordsForDisplay();
  renderImgs(imgs);
  renderKeywords(keywords);
  renderFilter(keywords);
  renderInput(keywords);
}

function renderImgs(imgs) {
  var strHTML = imgs.map(function(img) {
    return `
    <div class="img-gallery" style="background-image:url('img/${
      img.id
    }.jpg')" onclick="openModal(${img.id})"> </div>
        `;
  });

  document.querySelector('.gallery').innerHTML = strHTML.join('');
}

function renderKeywords(keywords) {
  var strHTML = '';
  for (var key in keywords) {
    var fontsize = getFontSize(key);
    strHTML += `<li class="tag-word" style="font-size: ${fontsize *
      2}px" onclick="onTagCliked('${key}')">
    ${key}
</li>`;
  }

  document.querySelector('.keywords').innerHTML = strHTML;
  // document.querySelector('.keywords2').innerHTML = strHTML;
}

// keep for Ex-9 and safari
function renderFilter(keywords) {
  var strHTML = '<option>All</option>';
  for (var key in keywords) {
    strHTML += `<option >${key} </option>`;
  }
  document.querySelector('.input-select').innerHTML = strHTML;
}

function renderInput(keywords) {
  var strHTML = `<option value="All">`;
  for (var key in keywords) {
    strHTML += `<option value="${key}">`;
  }
  document.querySelector('#browsers').innerHTML = strHTML;
}
function onTagCliked(strTag) {
  var imgs = getImgsForDisplay(strTag);
  updateTagRate(strTag);
  document.querySelector('.input-filter').value = strTag;
  document.querySelector('.input-select').value = strTag;
  renderImgs(imgs);
  var keywords = getkeywordsForDisplay();
  renderKeywords(keywords);
}

function toggleMenu() {
  var menu = document.querySelector('.nav');
  menu.classList.toggle('open');
}

// function onFileInputChange(ev) {
//   openModal(999)
//   handleImageFromInput(ev, renderCanvas);
// }

function onFileInputChange(ev){
  var canvas = document.getElementById('meme-canvas');
  var ctx = canvas.getContext('2d');

  var reader = new FileReader();
  reader.onload = function(event){
      var img = new Image();
      img.onload = function(){
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
      img.src = event.target.result;
  }
  reader.readAsDataURL(ev.target.files[0]);     
  openModal(999)
}

function openModal(id) {
  setNewMeme(id);
  $('.editor').toggleClass('hidden');
  renderCanvas();
  renderTools();
}

function closeModal() {
  $('.editor').toggleClass('hidden');
}

function renderCanvas() {
  // debugger;
  var id = getMemeImgId();
  var canvas = document.getElementById('meme-canvas');
  var ctx = canvas.getContext('2d');
  var img = new Image();
  img.src = getImgById(id).url;
  img.onload = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var originalRatio = img.height / img.width;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.width * originalRatio);
    // canvas.height = canvas.width / originalRatio;

    var meme = getMemeInfo();
    meme.lines.forEach(function(line) {
      ctx.fillStyle = '#' + line.color;
      ctx.font = `${line.size}px ${line.font}`;
      if (line.shadow) {
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 2;
      } else {
        ctx.shadowColor = 'rgba(0,0,0,0)';
        ctx.shadowBlur = 0;
      }
      ctx.fillText(line.txt, line.cordX, line.cordY);
      ctx.lineWidth = 2;
      ctx.strokeText(line.txt, line.cordX, line.cordY);
    });
  };
}

function renderTools() {
  var memeLines = getMemeLines();
  var strHtmls = memeLines.map(function(line, lineIdx) {
    return `<div class="tools-line-${lineIdx}">
              <input class="line-input-${lineIdx}" type="text" value="${line.txt}" onkeyup="memeLineTyped(event)">
              <button class="btn btn-font-size-up-${lineIdx}" onclick="scaleFont(1, event)">+</button>
              <button class="btn btn-font-size-down-${lineIdx}" onclick="scaleFont(-1, event)">-</button>
              <button class="btn btn-toggle-shadow-${lineIdx}" onclick="onToggleShadow(event)">Shadow</button>
              <input class="jscolor color-input-${lineIdx}" value="${line.color}" onchange="onChangeFontColor(event)">
              <select class="font-menu-${lineIdx}" onchange="onFontChange(event)">
                  <option value="impact">Impact</option>
                  <option value="arial">Arial</option>
                  <option value="david">David</option>
                  <option value="miriam">Miriam</option>
              </select>
              <button class="btn btn-delete-line-${lineIdx}" onclick="onDeleteLine(event)">X</button>
            </div>`;
  });
  var generalTools = `<button class="btn add-line-btn" onclick="onAddLine()">add line</button>
                    <div class="done-btns">
                        <button class="btn btn-download" href="#" onclick="downloadImg(this)" download="my-meme.jpg">download</button>
                        <button class="btn btn-share">share</button>
                    </div> `;
  $('.tools').html(strHtmls.join('') + generalTools);
  jscolor.installByClassName('jscolor');
}

function canvasMouseDown(ev) {
  var canvas = document.getElementById('meme-canvas');
  var ctx = canvas.getContext('2d');
  var canvasRect = canvas.getBoundingClientRect();
  var lines = getMemeLines();
  var currLine = lines.findIndex(function(line) {
    var canvasMouseX = ev.clientX - canvasRect.left;
    var canvasMouseY = ev.clientY - canvasRect.top;
    return (
      canvasMouseX > line.cordX &&
      canvasMouseX < line.cordX + ctx.measureText(line.txt).width &&
      canvasMouseY > line.cordY - line.size &&
      canvasMouseY < line.cordY
    );
  });
  setCurrMoveLine(currLine);
  console.log(currLine);
}

function canvasMouseUp(ev) {
  var canvas = document.getElementById('meme-canvas');
  var canvasRect = canvas.getBoundingClientRect();
  var canvasMouseX = ev.clientX - canvasRect.left;
  var canvasMouseY = ev.clientY - canvasRect.top;

  var currLine = getCurrMoveLine();
  if (currLine !== -1) {
    setLineCords(canvasMouseX, canvasMouseY);
    renderCanvas();
  }
}

function onAddLine() {
  addLine();
  renderTools();
  renderCanvas();
}

function memeLineTyped(ev) {
  var newText = ev.target.value;
  var inputIdx = ev.target.classList[0].slice(-1);
  setMemeLine(inputIdx, newText);
  renderCanvas();
}

function scaleFont(diff, ev) {
  var inputIdx = ev.target.classList[1].slice(-1);
  changeLineSize(inputIdx, diff);
  renderCanvas();
}

function onChangeFontColor(ev) {
  var inputIdx = ev.target.classList[1].slice(-1);
  var newColor = ev.target.value;
  console.log(inputIdx, newColor);

  changeFontColor(inputIdx, newColor);
  renderCanvas();
}

function onFontChange(ev) {
  var inputIdx = ev.target.classList[0].slice(-1);
  var newFont = ev.target.value;
  changeFont(inputIdx, newFont);
  renderCanvas();
}

function onToggleShadow(ev) {
  var lineIdx = ev.target.classList[1].slice(-1);
  toggleShdow(lineIdx);
  renderCanvas();
}

function onDeleteLine(ev) {
  var lineIdx = ev.target.classList[1].slice(-1);
  deleteLine(lineIdx);
  renderCanvas();
  renderTools();
}

function sendMsg() {
    var msgSubject = $('.msg-subject').val();
    var msgBody = $('.msg-body').val();
    var msgUrl = `
            https://mail.google.com/mail/?view=cm&fs=1&to=ilay.skutelsky@gmail.com,nuritlh@gmail.com&su=${msgSubject}&body=${msgBody}
                 `
    window.open(msgUrl,'_blank');
}
// function downloadImg(elLink) {
// var canvas = document.getElementById('meme-canvas');
// var imgContent = canvas.toDataURL('image/jpeg');
// console.log(imgContent);

// elLink.href = imgContent
// }
