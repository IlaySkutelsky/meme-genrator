'use strict';

var gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['happy'] },
  { id: 2, url: 'img/2.jpg', keywords: ['happy', 'success'] },
  { id: 3, url: 'img/3.jpg', keywords: ['trump', 'politics'] },
  { id: 4, url: 'img/4.jpg', keywords: ['animals', 'dogs'] },
  { id: 5, url: 'img/5.jpg', keywords: ['animals', 'dogs', 'babies'] },
  { id: 6, url: 'img/6.jpg', keywords: ['animals', 'cats'] },
  { id: 7, url: 'img/7.jpg', keywords: ['funny'] },
  { id: 8, url: 'img/8.jpg', keywords: ['babies'] },
  { id: 9, url: 'img/9.jpg', keywords: ['israeli'] },
  { id: 10, url: 'img/10.jpg', keywords: ['shocked'] },
  { id: 11, url: 'img/11.jpg', keywords: ['funny', 'aliens'] },
  { id: 12, url: 'img/12.jpg', keywords: ['funny'] },
  { id: 13, url: 'img/13.jpg', keywords: ['babies', 'dancing'] },
  { id: 14, url: 'img/14.jpg', keywords: ['trump', 'politics'] },
  { id: 15, url: 'img/15.jpg', keywords: ['babies', 'shocked'] },
  { id: 16, url: 'img/16.jpg', keywords: ['animals', 'dogs'] },
  { id: 17, url: 'img/17.jpg', keywords: ['obama', 'politics', 'funny'] },
  { id: 18, url: 'img/18.jpg', keywords: ['love'] },
  { id: 19, url: 'img/19.jpg', keywords: ['happy', 'success', 'leo'] },
  { id: 20, url: 'img/20.jpg', keywords: ['serious'] },
  { id: 21, url: 'img/21.jpg', keywords: ['funny'] },
  { id: 22, url: 'img/22.jpg', keywords: ['oprah'] },
  { id: 23, url: 'img/23.jpg', keywords: ['shocked'] },
  { id: 24, url: 'img/24.jpg', keywords: ['putin', 'serious', 'politics'] },
  { id: 25, url: 'img/25.jpg', keywords: ['cartoon'] }
];

var gKeywords = createKeywords(gImgs);

var gMeme = {
  selectedImgId: 5,
  lines: [
    {
      txt: 'I rock sprint 2 !',
      size: 50,
      align: 'left',
      color: 'ffffff',
      font: 'impact',
      shadow: false,
      cordX: 50,
      cordY: 60
    }
  ]
};

var gCurrLine = { lineIdx: 0 };

function createKeywords() {
  var localKeyword = loadFromStorage('gKeywords');
  if (localKeyword !== null) return localKeyword;
  var keywords = gImgs.reduce(function(acc, img) {
    img.keywords.forEach(function(tag) {
      if (acc[tag]) {
        acc[tag] = acc[tag] + 1;
      } else acc[tag] = 10;
    });
    return acc;
  }, {});
  saveToStorage('gKeywords', keywords);
  return keywords;
}

function getImgsForDisplay(strFliter) {
  var imgs = [];
  if (strFliter === 'All' || strFliter === '') {
    imgs = gImgs;
  } else {
    imgs = gImgs.filter(function(img) {
      return img.keywords.some(function(tag) {
        return tag === strFliter;
      });
    });
  }
  return imgs;
}

function getkeywordsForDisplay() {
  return gKeywords;
}

function getFontSize(keyword) {
  for (var key in gKeywords) {
    if (key === keyword) return gKeywords[key] <= 30 ? gKeywords[key] : 30;
  }
}
function getImgById(id) {
  return gImgs.find(function(img) {
    return img.id === id;
  });
}

function updateTagRate(strFliter) {
  for (var key in gKeywords) {
    if (key === strFliter) gKeywords[key]++;
  }
  saveToStorage('gKeywords', gKeywords);
}

function getMemeInfo(id) {
  return gMeme;
}

function getMemeLines() {
  return gMeme.lines;
}

function getMemeImgId() {
  return gMeme.selectedImgId;
}

function setNewMeme(id) {
  gMeme.selectedImgId = id;
}

function setCurrLine(lineIdx, mouseDiffX, mouseDiffY) {
  gCurrLine.lineIdx = lineIdx;
  gCurrLine.mouseDiffX = mouseDiffX;
  gCurrLine.mouseDiffY = mouseDiffY;
}

function getCurrLine() {
  return gCurrLine;
}

function getCurrLineIdx() {
  return gCurrLine.lineIdx;
}

function setLineCords(newX, newY) {
  gMeme.lines[gCurrLine.lineIdx].cordX = newX;
  gMeme.lines[gCurrLine.lineIdx].cordY = newY;
}

function addLine() {
  var newLine = {
    txt: 'I never eat Falafel',
    size: 50,
    align: 'left',
    color: 'ffffff',
    font: 'impact',
    cordX: 50,
    cordY: gMeme.lines[getCurrLineIdx() - 1].cordY + 50
  };
  gMeme.lines.push(newLine);
}

function deleteLine(idx) {
  gMeme.lines.splice(idx, 1);
}

function setMemeLine(idx, text) {
  gMeme.lines[idx].txt = text;
}

function changeLineSize(idx, diff) {
  gMeme.lines[idx].size += diff;
}

function changeFontColor(idx, color) {
  gMeme.lines[idx].color = color;
}

function changeFont(idx, font) {
  gMeme.lines[idx].font = font;
}

function toggleShdow(idx) {
  gMeme.lines[idx].shadow = !gMeme.lines[idx].shadow;
}

function downloadCanvasMeme(elLink) {
  var canvas = document.querySelector('#meme-canvas');
  elLink.href = canvas.toDataURL();
  elLink.download = 'my-meme.jpg';
}
