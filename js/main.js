'use strict';

function init() {
  var imgs = getImgsForDisplay('All');
  var keywords = getkeywordsForDisplay();
  renderImgs(imgs);
  renderKeywords(keywords);
  renderInput(keywords);
}

// ***************************************** render gallery and tags  ********************************************

function renderImgs(imgs) {
  var strHTML = `<ul id="hexGrid">`;
  imgs.forEach(function(img) {
    strHTML += `
      <li class="hex">
      <div class="hexIn">
        <a class="hexLink" onclick="openModal(${img.id})">
          <img class="img-gallery" src="img/${img.id}.jpg"/>
        </a>
      </div>
    </li>
      `;
  });
  strHTML += `</ul>`;
  document.querySelector('.gallery').innerHTML = strHTML;
}

function renderKeywords(keywords) {
  var strHTML = '';
  for (var key in keywords) {
    var fontsize = getFontSize(key);
    strHTML += `<li class="tag-word" style="font-size: ${fontsize *
      2}px" onclick="onTagClicked('${key}')">
    ${key}
</li>`;
  }

  document.querySelector('.keywords').innerHTML = strHTML;
}

function renderInput(keywords) {
  var strHTML = `<option value="All">`;
  for (var key in keywords) {
    strHTML += `<option value="${key}">`;
  }
  document.querySelector('#keywords').innerHTML = strHTML;
}
function onTagClicked(strTag) {
  var imgs = getImgsForDisplay(strTag);
  updateTagRate(strTag);
  document.querySelector('.input-filter').value = strTag;
  renderImgs(imgs);
  var keywords = getkeywordsForDisplay();
  renderKeywords(keywords);
}
// ***************************************** nav bar  ****************************************************

function OpenNavBtn() {
  var menu = document.querySelector('.nav');
  menu.classList.toggle('open');
}

function closeNavBtn() {
  var menu = document.querySelector('.nav');
  menu.classList.toggle('open');
}

// ***************************************** render meme on canvas  *****************************************

function onFileInputChange(ev) {
  var canvas = document.getElementById('meme-canvas');
  var ctx = canvas.getContext('2d');

  var reader = new FileReader();
  reader.onload = function(event) {
    setUploadedImgSrc(event.target.result);

    var img = new Image();
    img.src = event.target.result;
    img.onload = function() {
      var originalRatio = img.height / img.width;
      canvas.height = canvas.width * originalRatio;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.width * originalRatio);
    };
  };
  reader.readAsDataURL(ev.target.files[0]);

  openModal(999);
}

function openModal(id) {
  setNewMeme(id);

  $('.editor').toggleClass('hidden');
  $('.container').toggleClass('hidden');
  $('.about').toggleClass('hidden');
  $('.contact').toggleClass('hidden');
  $('html').toggleClass('overflow');

  renderCanvas();
  renderTools();
}

function closeModal() {
  var canvas = document.getElementById('meme-canvas');
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  $('.editor').toggleClass('hidden');
  $('.container').toggleClass('hidden');
  $('.about').toggleClass('hidden');
  $('.contact').toggleClass('hidden');
}

function renderCanvas() {
  var canvas = document.getElementById('meme-canvas');
  var body = document.querySelector('body');
  if (body.offsetWidth < 500) {
    canvas.width = body.offsetWidth;
  }
  var id = getMemeImgId();
  var ctx = canvas.getContext('2d');
  var img = new Image();

  img.onload = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var originalRatio = img.height / img.width;

    canvas.height = canvas.width * originalRatio;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.width * originalRatio);

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

  if (id !== 999) {
    img.src = getImgById(id).url;
  } else {
    img.src = getUploadedImgSrc();
  }
}

function renderTools() {
  var lines = getMemeLines();
  var currLine = lines[getCurrLineIdx()];

  var strHtml = `<div class="tools-line">
              <input class="line-input" type="text" value="${
                currLine.txt
              }" onkeyup="memeLineTyped(event)">
              <button class="btn btn-font-size-up fas fa-plus" onclick="scaleFont(1, event)"></button>
              <button class="btn btn-font-size-down fas fa-minus" onclick="scaleFont(-1, event)"></button>
              <span class="fas fa-palette"></span>
              <input class="jscolor color-input" value="${
                currLine.color
              }" onchange="onChangeFontColor(event)">
              <select class="font-menu" onchange="onFontChange(event)">
              <option value="impact">Impact</option>
              <option value="arial">Arial</option>
              <option value="david">David</option>
              <option value="miriam">Miriam</option>
              </select>
              <ul class="tg-list clean-list">
              <li class="tg-list-item flex-center">
              <span>shadow</span>
              <input class="tgl tgl-flat" id="cb4" type="checkbox" onchange="onToggleShadow(event)"/>
              <label class="tgl-btn" for="cb4"></label>
            </li>
            </ul>
              
              </div>`;
  var generalTools = `<div class="edit-lines">
                      <button class="add-line-btn btn" onclick="onAddLine()">Add line</button>
                      <button class="btn-delete-line btn" onclick="onDeleteLine(event)">Del line</button>
                      </div>
                      <div class="done-btns">
                        <button class="btn btn-download" href="#" download="my-meme.jpg"><a href="#" class="fas fa-download" onclick="onDownloadClicked(this)"></a></button>
                        <form class="share-form" action="" method="POST" enctype="multipart/form-data" onsubmit="uploadImg(this, event)">
    <input name="img" id="imgData" type="hidden"/>
    <button class="btn fas fa-share-alt btn-share" type="submit"></button>
  </form>
  <div id="fb-root"></div>
                    <div class="share-container"></div>
                    </div> `;
  $('.tools').html(strHtml + generalTools);
  jscolor.installByClassName('jscolor');
}

function canvasMouseDown(ev) {
  var canvas = document.getElementById('meme-canvas');
  var ctx = canvas.getContext('2d');
  var canvasRect = canvas.getBoundingClientRect();
  var canvasMouseX = ev.clientX - canvasRect.left;
  var canvasMouseY = ev.clientY - canvasRect.top;
  var lines = getMemeLines();
  var currLine = lines.find(function(line) {
    return (
      canvasMouseX > line.cordX &&
      canvasMouseX < line.cordX + ctx.measureText(line.txt).width &&
      canvasMouseY > line.cordY - line.size &&
      canvasMouseY < line.cordY
    );
  });
  if (!currLine) {
    setCurrLine(null);
    return;
  }
  setCurrLine(
    lines.indexOf(currLine),
    canvasMouseX - currLine.cordX,
    canvasMouseY - currLine.cordY
  );
  canvas.onmousemove = moveLine;
  renderTools();
}

function canvasMouseUp(ev) {
  var canvas = document.getElementById('meme-canvas');
  var canvasRect = canvas.getBoundingClientRect();
  var canvasMouseX = ev.clientX - canvasRect.left;
  var canvasMouseY = ev.clientY - canvasRect.top;

  var currLine = getCurrLine();
  if (currLine) {
    setLineCords(
      canvasMouseX - currLine.mouseDiffX,
      canvasMouseY - currLine.mouseDiffY
    );
    canvas.onmousemove = null;
    renderCanvas();
  }
}

function moveLine(ev) {
  var canvas = document.getElementById('meme-canvas');
  var canvasRect = canvas.getBoundingClientRect();
  var canvasMouseX = ev.clientX - canvasRect.left;
  var canvasMouseY = ev.clientY - canvasRect.top;

  var currLine = getCurrLine();

  setLineCords(
    canvasMouseX - currLine.mouseDiffX,
    canvasMouseY - currLine.mouseDiffY
  );
  renderCanvas();
}

function onAddLine() {
  var lines = getMemeLines();
  setCurrLine(lines.length);
  addLine();
  renderTools();
  renderCanvas();
}

function memeLineTyped(ev) {
  var newText = ev.target.value;
  var inputIdx = getCurrLineIdx();
  setMemeLine(inputIdx, newText);
  renderCanvas();
}

function scaleFont(diff, ev) {
  var inputIdx = getCurrLineIdx();
  changeLineSize(inputIdx, diff);
  renderCanvas();
}

function onChangeFontColor(ev) {
  var inputIdx = getCurrLineIdx();
  var newColor = ev.target.value;
  changeFontColor(inputIdx, newColor);
  renderCanvas();
}

function onFontChange(ev) {
  var inputIdx = getCurrLineIdx();
  var newFont = ev.target.value;
  changeFont(inputIdx, newFont);
  renderCanvas();
}

function onToggleShadow(ev) {
  var lineIdx = getCurrLineIdx();
  toggleShdow(lineIdx);
  renderCanvas();
}

function onDeleteLine(ev) {
  var lineIdx = getCurrLineIdx();
  deleteLine(lineIdx);
  renderCanvas();
  renderTools();
}

function onDownloadClicked(elLink) {
  downloadCanvasMeme(elLink);
}

// ***************************************** contact us send mail  *****************************************
function sendMsg() {
  var msgSubject = $('.msg-subject').val();
  var msgBody = $('.msg-body').val();
  var msgUrl = `
            https://mail.google.com/mail/?view=cm&fs=1&to=ilay.skutelsky@gmail.com,nuritlh@gmail.com&su=${msgSubject}&body=${msgBody}
                 `;
  window.open(msgUrl, '_blank');
}
