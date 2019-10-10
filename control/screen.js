const {BrowserWindow,ipcMain} = require('electron').remote
const path = require('path')

const lsBtn = document.getElementById('left_screen')
const rsBtn = document.getElementById('right_screen')




lsBtn.addEventListener('click', (event)=>{
    let l_win = new BrowserWindow({ width: 1920, height: 1080,show:false})
    const modalPath = path.join('file://', __dirname, '../html/left_screen.html')
    l_win.on('close', () => { l_win = null })
    l_win.loadURL(modalPath)
    l_win.show()

    // $(".player").on("click",function(){
    //     mvp_id = $(this).attr('data');
    //     // mvp_win.webContents.executeJavaScript('\
    //     //     showpmvp(data.data,'+mvp_id+');\
    //     //     ')
    //     mvp_win.webContents.send('change-mvp', mvp_id);
    // })
})
rsBtn.addEventListener('click', (event)=>{
    let r_win = new BrowserWindow({ width: 1920, height: 1080,show:false})
    const modalPath = path.join('file://', __dirname, '../html/right_screen.html')
    r_win.on('close', () => { r_win = null })
    r_win.loadURL(modalPath)
    r_win.show()
})

ipcMain.on('get_left_team',(event,arg) =>{
    event.returnValue = $("input[name=team_id_l]").val()
})
ipcMain.on('get_right_team',(event,arg) =>{
    event.returnValue = $("input[name=team_id_r]").val()
})
ipcMain.on('get_url',(event,arg) =>{
    if($("input[name=api_url]").val() != ''){
        event.returnValue = $("input[name=api_url]").val()
    }else{
        event.returnValue = 'http://seed.fakecn.com:16443/cas/fresh_data.php';
    }
    
})

