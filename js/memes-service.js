'use strict'

var gImgs = [{ id: 1, url: 'img/001.jpg', keywords: ['happy'] },
             { id: 2, url: 'img/002.jpg', keywords: ['happy', 'success'] },
             { id: 3, url: 'img/003.jpg', keywords: ['trump', 'politics'] },
             { id: 4, url: 'img/004.jpg', keywords: ['animals', 'dogs'] },
             { id: 5, url: 'img/005.jpg', keywords: ['animals', 'dogs', 'babies'] },
             { id: 6, url: 'img/006.jpg', keywords: ['animals', 'cats'] },
             { id: 7, url: 'img/007.jpg', keywords: ['funny'] },
             { id: 8, url: 'img/008.jpg', keywords: ['babies'] },
             { id: 9, url: 'img/009.jpg', keywords: ['israeli'] },
             { id: 10, url: 'img/010.jpg', keywords: ['shocked'] },
             { id: 11, url: 'img/011.jpg', keywords: ['funny', 'aliens'] },
             { id: 12, url: 'img/012.jpg', keywords: ['funny'] },
             { id: 13, url: 'img/013.jpg', keywords: ['babies', 'dancing'] },
             { id: 14, url: 'img/014.jpg', keywords: ['trump', 'politics'] },
             { id: 15, url: 'img/015.jpg', keywords: ['babies', 'shocked'] },
             { id: 16, url: 'img/016.jpg', keywords: ['animals', 'dogs'] },
             { id: 17, url: 'img/017.jpg', keywords: ['obama','politics', 'funny'] },
             { id: 18, url: 'img/018.jpg', keywords: ['love'] },
             { id: 19, url: 'img/019.jpg', keywords: ['happy', 'success', 'leo'] },
             { id: 20, url: 'img/020.jpg', keywords: ['serious'] },
             { id: 21, url: 'img/021.jpg', keywords: ['funny'] },
             { id: 22, url: 'img/022.jpg', keywords: ['oprah'] },
             { id: 23, url: 'img/023.jpg', keywords: ['shocked'] },
             { id: 24, url: 'img/024.jpg', keywords: ['putin', 'serious', 'politics'] },
             { id: 25, url: 'img/025.jpg', keywords: ['cartoon'] }
];

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
}

var gKeywords = [{tagName: 'happy', rate: 2 },
                 {tagName: 'cats', rate: 4 },
                 {tagName: 'funny', rate: 5 },
                 {tagName: 'babies', rate:2 },
                 {tagName: 'dogs', rate:1 },
]

function getImgsForDisplay() {

}

function getImgById(id) {
    return gImgs.find(function(img) {
        return img.id === id
    })
}

function getMemeInfo(id) {
    return gMeme
}

function getMemeImgId() {
    return gMeme.selectedImgId
}

function setNewMeme(id) {
    gMeme.selectedImgId = id;
}

function setMemeLine(idx, text) {
    gMeme.txts[idx].line = text
}