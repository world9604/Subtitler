const { ipcRenderer } = require('electron');

let strArr;
let subtitleIndex = 0;

ipcRenderer.on('subtitleContent', (event, arg) => {
    console.log(arg);
    strArr = arg.split(/\r\n|\r|\n/);
    console.log(strArr[0]);
    document.getElementById("content").innerHTML = strArr[subtitleIndex];
});

ipcRenderer.on('goLeftSubtitle', (event, arg) => {
    console.log("goLeftSubtitle");
    document.getElementById("content").innerHTML = strArr[--subtitleIndex];
    console.log("subtitleIndex : " + subtitleIndex);
});

ipcRenderer.on('goRightSubtitle', (event, arg) => {
    console.log("goRightSubtitle");
    document.getElementById("content").innerHTML = strArr[++subtitleIndex];
    console.log("subtitleIndex : " + subtitleIndex);
});
