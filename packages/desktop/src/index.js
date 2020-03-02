const { ipcRenderer } = require('electron');

document.querySelector('#open-file').addEventListener('click', e => {
  ipcRenderer.send('open-file', '');
})