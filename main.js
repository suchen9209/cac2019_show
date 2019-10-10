const {app,BrowserWindow} = require('electron');
const {ipcMain,dialog} = require('electron');
const path = require('path');
const http = require('http');

app.on('ready',()=>{
  // const modalPath = path.join('file://',__dirname,'/html/index.html')
  // let win = new BrowserWindow({ width: 1800, height: 1200 }) 
  // win.on('close',() =>{ win = null })
  // win.loadURL(modalPath)
  // win.show()

  const modalPath2 = path.join('file://',__dirname,'/html/drop_gift.html')
  let win2 = new BrowserWindow({ width: 760, height:800 }) 
  win2.on('close',() =>{ win2 = null })
  win2.loadURL(modalPath2)
  win2.show()  
})



