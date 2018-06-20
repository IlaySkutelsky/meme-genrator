'use strict';
var gkerWord = 'All';

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
  txts: [
    {
      line: 'I never eat Falafel',
      size: 50,
      align: 'left',
      color: 'white',
      font: 'arial',
      cordX: 50,
      cordY: 60
    }
  ]
};

function createKeywords() {
  var kerwords = gImgs.reduce(function(acc, img) {
    img.keywords.forEach(function(tag) {
      if (acc[tag]) {
        acc[tag] = acc[tag] + 1;
      } else acc[tag] = 1;
    });
    return acc;
  }, {});
  // console.log(kerwords);

  return kerwords;
}

function getImgsForDisplay(strFliter) {
  var imgs = [];
  if (strFliter === 'All') {
    imgs = gImgs;
  } else {
    imgs = gImgs.filter(function(img) {
      return img.keywords.some(function(tag) {
        return tag === strFliter;
      });
    });
  }
  // console.log(imgs);

  return imgs;
}

function getkeywordsForDisplay() {
  return gKeywords;
}

function getImgById(id) {
  return gImgs.find(function(img) {
    return img.id === id;
  });
}

function getMemeInfo(id) {
  return gMeme;
}

function getMemeImgId() {
  return gMeme.selectedImgId;
}

function setNewMeme(id) {
  gMeme.selectedImgId = id;
}

function setMemeLine(idx, text) {
  gMeme.txts[idx].line = text;
}
