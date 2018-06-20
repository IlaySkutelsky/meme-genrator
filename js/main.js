'use strict';

function init() {
  var imgs = getImgsForDisplay('All');
  var keywords = getketwordsForDisplay();
  renderImgs(imgs);
  renderKeywords(keywords);
  renderFilter(keywords);
}

function renderImgs(imgs) {
  var strHTML = imgs.map(function(img) {
    return `
    <img class="img-gallery" src="img/${img.id}.jpg">
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

function renderFilter(keywords) {
  var strHTML = '';
  for (var key in keywords) {
    strHTML += `<option >${key} </option>`;
  }
  document.querySelector('.input-option').innerHTML = strHTML;
}

function onTagCliked(strTag) {
  var imgs = getImgsForDisplay(strTag);
  renderImgs(imgs);
}

function openModal(id) {
  $('.editor').toggle('hidden');
  renderCanvas(id);
}

function renderCanvas(id) {}
