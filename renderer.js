// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
//const { ipcRenderer } = require('electron');
/*var app = require('electron').remote;
var dialog = app.dialog;
var fs = require('fs');

document.getElementById('openButton').onclick = () => {
console.log("openButton");

dialog.showOpenDialog((fileNames) => {
   if(fileNames === undefined){
       console.log("11");
       alert('No file selected');
   } else {
       console.log("find fineName");
       readFile(fileNames[0]);
   }
});
}

function readFile(filePath){
fs.readFile(filePath, 'utf-8', (err, data) => {
    if(err){
        console.log("An error occured reading the file.");
       alert('An error occured reading the file.');
       return;
   }

    console.log("success");
    var textArea = document.getElementById('output');
    textArea.value = data;
});
}*/

const { ipcRenderer } = require('electron');

document.getElementById('openButton').onclick = () => {
    event.preventDefault();
    ipcRenderer.send('readFile');
}

ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg);
});
















