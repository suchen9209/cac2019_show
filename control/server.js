const {BrowserWindow,ipcMain,dialog} = require('electron').remote
const cmd = require('node-cmd')
const path = require('path')
const http =require('http')

const openMidiBtn = $("#openserver")



openMidiBtn.on('click',()=>{
    // 创建http server，并传入回调函数:
    var server = http.createServer(function (request, response) {
    if(request.url == "/favicon.ico"){
        response.end();
    }else{
        // 回调函数接收request和response对象,
        // 获得HTTP请求的method和url:
        console.log(request.method + ': ' + request.url);
        let midiurl = path.resolve(__dirname, '../midi') + '/sendmidi.exe';
        if($("#midiurl").html() != ''){
            midiurl = $("#midiurl").html();
        }

        let midi_dev= $('#mididev').html();

        if(request.url == '/c4'){
            //midi on
            var cmd_str = "\"" + midiurl+"\"" + ' dev "'+ midi_dev +'" ch 1 on 16 16';
            cmd.run(cmd_str)
            //midi off
            var cmd_str2 = "\"" + midiurl+"\"" + ' dev "'+ midi_dev +'" ch 1 off 16 16';
            cmd.run(cmd_str2)
            // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
            response.writeHead(200, {'Content-Type': 'application/json'});
            // 将HTTP响应的HTML内容写入response:
            response.end(JSON.stringify([cmd_str,cmd_str2]));
        }

        if(request.url == '/boom'){
            //midi on
            var cmd_str = "\"" + midiurl+"\"" + ' dev "'+ midi_dev +'" ch 1 on 17 17';
            cmd.run(cmd_str)
            //midi off
            var cmd_str2 = "\"" + midiurl+"\"" + ' dev "'+ midi_dev +'" ch 1 off 17 17';
            cmd.run(cmd_str2)
            // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
            response.writeHead(200, {'Content-Type': 'application/json'});
            // 将HTTP响应的HTML内容写入response:
            response.end(JSON.stringify([cmd_str,cmd_str2]));
        }

        if(request.url == '/remove'){
            //midi on
            var cmd_str = "\"" + midiurl+"\"" + ' dev "'+ midi_dev +'" ch 1 on 18 18';
            cmd.run(cmd_str)
            //midi off
            var cmd_str2 = "\"" + midiurl+"\"" + ' dev "'+ midi_dev +'" ch 1 off 18 18';
            cmd.run(cmd_str2)
            // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
            response.writeHead(200, {'Content-Type': 'application/json'});
            // 将HTTP响应的HTML内容写入response:
            response.end(JSON.stringify([cmd_str,cmd_str2]));
        }
        
        // cmd.get(
        //     cmd_str,
        //     function(err,data,stderr){
        //         //$("#midilist").html(data)
        //     }
        // )
        var myDate = new Date();
        var log =  myDate.toLocaleString() +' ' +request.url  + '\n' + $('#service_log').val();
        
        $("#service_log").val(log);
        response.end();

        

    }
    });
    
    // 让服务器监听9123端口:
    server.listen(9123);
    $("#service_status").html('OPEN');
    $("#service_status").parent().append("<p>开放端口号：9123</p><p>开放地址：/c4,/boom</p>");
    
    console.log('Server is running at http://'+local_ip+':9123/');

    $("#midistatus").html('open');
})