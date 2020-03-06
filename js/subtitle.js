const { ipcRenderer } = require('electron');

let strArr;
let subtitleIndex = 0;

ipcRenderer.on('subtitleContent', (event, arg) => {
    strArr = arg.split(/\r\n|\r|\n/);
    sendSubtitleLine();
});

ipcRenderer.on('goLeftSubtitle', (event, arg) => {
    --subtitleIndex;
    sendSubtitleLine();
});

ipcRenderer.on('goRightSubtitle', (event, arg) => {
    ++subtitleIndex;
    sendSubtitleLine();
});

function sendSubtitleLine(){
    var strLength = strArr[subtitleIndex].length;
    
    if(parseInt(strLength) <= 95){
        ipcRenderer.send("makeOneLine");
    }else if(95 <= parseInt(strLength) 
             && parseInt(strLength) <= 190){
        ipcRenderer.send("makeTwoLine");
    }else if(190 <= parseInt(strLength)
            && parseInt(strLength) <= 285){
        ipcRenderer.send("makeThreeLine");
    }else {
        ipcRenderer.send("makeFourLine");
    }
}

ipcRenderer.on('setedBoundsWindow', (event, arg) => {
    getHtmlInContent();
});

function getHtmlInContent(){
    document.getElementById("content").innerHTML = strArr[subtitleIndex];
}
