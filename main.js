const {app,BrowserWindow,Menu,ipcMain} = require('electron');
const path = require('path');


let showWindow;

app.on('ready',()=>{
  // const modalPath = path.join('file://',__dirname,'/html/index.html')
  // let win = new BrowserWindow({ width: 1800, height: 1200 }) 
  // win.on('close',() =>{ win = null })
  // win.loadURL(modalPath)
  // win.show()

  //const modalPath2 = path.join('file://',__dirname,'/html/drop_gift.html')
  let win2 = new BrowserWindow({ width: 384, height:788 }) 
  win2.on('close',() =>{ win2 = null })
  win2.webContents.openDevTools()
  //win2.loadURL(modalPath2)
  win2.loadFile(path.join(__dirname,'/html/drop_gift.html'))
  win2.on('closed',function(){
    win2 = null
    if(showWindow!= null){
      showWindow.close()
    }
  })
  //win2.show()  

})

ipcMain.on('reload',()=>{
  showWindow.webContents.reload()
})

ipcMain.on('live_drop',(event,arg)=>{
  showWindow.webContents.send('live_drop',arg);
})
//触发展示
ipcMain.on('show_screen', function(event, arg) {
  let {screen} = require("electron")
  let displays = screen.getAllDisplays()
  let externalDisplay = displays.find((display) => {
    return display.bounds.x !==0 || display.bounds.y !== 0
  })

  if(externalDisplay){
    Menu.setApplicationMenu(null)
    
    showWindow = new BrowserWindow({
      x: externalDisplay.bounds.x,
      y: externalDisplay.bounds.y,
      fullscreen: true,
      minimizable:false
    })
    //showWindow.webContents.openDevTools()
    //showWindow.webContents.loadFile('html/show.html')
  }else{
    showWindow = new BrowserWindow({
        width: 800,
        height: 600
    })
    console.log('show in this screen')
  }

  showWindow.webContents.openDevTools()
  showWindow.on('close',() =>{ showWindow = null })
  showWindow.loadFile(path.join(__dirname,'/html/show.html'))
  
});

//礼物信息更新
ipcMain.on('gifts_update',function(event,arg){
  showWindow.webContents.send('gifts_update',arg);
});


