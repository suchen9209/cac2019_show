const {BrowserWindow,ipcMain,dialog} = require('electron').remote
const cmd = require('node-cmd')
const path = require('path')
const http =require('http')
const req= require('request')
const fs = require('fs')
const ipcRenderer = require('electron').ipcRenderer;

const openMidiBtn = $("#openserver")
const testBtn = $("#test")
const showBtn = $("#show")
const reloadBtn = $("#reload")
const dropBtn = $("#live_drop")

dropBtn.on('click',()=>{
    let h1 = $(".live_drop").val();
    let h2 = $(".live_drop2").val();
    console.log(h1 + h2);
    ipcRenderer.send('live_drop',{'seat_num':h1,'goods':h2});  
})

reloadBtn.on('click',()=>{
    ipcRenderer.send('reload');  
})

openMidiBtn.on('click',()=>{
    var json = '';
    // 创建http server，并传入回调函数:
    
    var server = http.createServer(function (request, response) {

        response.setHeader("Access-Control-Allow-Origin", "*"); 
        if (request.method == 'POST') {
            console.log(3);
            var t2 = new Date().getTime();
            var out = fs.createWriteStream('./jsondata/'+t2+'.json');
            var out2 = fs.createWriteStream('./jsondata/interim.json');//保存数据，出现意外关闭重启时，使用该数据
            console.log("Handling POST request...");
            response.writeHead(200, {'Content-Type': 'text/html'});
    
            json = '';
            request.on('data', function (data) {
                json += data;                
            });
            request.on('end', function () {
                response.end( 'success' );
                var myDate = new Date();

                json = eval("'" + json + "'");

                var gifts = JSON.parse(json);
                ipcRenderer.send('gifts_update',gifts);  
                out.write(json);
                out2.write(json);
                console.log(json)
                var log =  myDate.toLocaleString() +' ' +request.url  + '\n' + json + '\n' + $('#service_log').val();
                $("#service_log").val(log);
            });


        }
        else
        {
            response.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
            response.end(json);
        }
    });
    
    // 让服务器监听9123端口:
    server.listen(9123);
    $("#service_status").html('OPEN');
    $("#service_status").parent().append("<p>开放端口号：9123</p><p>传输数据使用POST，查看使用GET</p>");
    
    console.log('Server is running');

    $("#midistatus").html('open');
})

showBtn.on('click',()=>{
    ipcRenderer.send('show_screen');  
})

// testBtn.on('click',()=>{
//     var http=require('http');
//     var qs=require('querystring');
    
//     var post_data={a:123,time:new Date().getTime()};//这是需要提交的数据
//     var content=qs.stringify(post_data);
//     var content = '[{"id":"257","steam_id":"76561198419962836","nickname":"\u5b8c\u7f8e\u4e16\u754c57","item_id":"14545516530","item_name":"\u4f3d\u739b\u6b66\u5668\u7bb1","item_icon":"https:\/\/steamcommunity-a.opskins.media\/economy\/image\/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFYznarJJjkQ6ovjw4SPlfP3auqEl2oBuJB1j--WoY322QziqkdpZGr3IteLMlhpw4RJCv8","item_rarity_color":"b0c3d9"},{"id":"256","steam_id":"76561198419258226","nickname":"\u5b8c\u7f8e\u4e16\u754c59","item_id":"14545516537","item_name":"\u4f3d\u739b\u6b66\u5668\u7bb1","item_icon":"https:\/\/steamcommunity-a.opskins.media\/economy\/image\/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFYznarJJjkQ6ovjw4SPlfP3auqEl2oBuJB1j--WoY322QziqkdpZGr3IteLMlhpw4RJCv8","item_rarity_color":"b0c3d9"},{"id":"255","steam_id":"76561198418554026","nickname":"\u5b8c\u7f8e\u4e16\u754c56","item_id":"14545516544","item_name":"\u4f3d\u739b\u6b66\u5668\u7bb1","item_icon":"https:\/\/steamcommunity-a.opskins.media\/economy\/image\/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFYznarJJjkQ6ovjw4SPlfP3auqEl2oBuJB1j--WoY322QziqkdpZGr3IteLMlhpw4RJCv8","item_rarity_color":"b0c3d9"},{"id":"254","steam_id":"76561198418745105","nickname":"\u5b8c\u7f8e\u4e16\u754c58","item_id":"14545516545","item_name":"\u4f3d\u739b\u6b66\u5668\u7bb1","item_icon":"https:\/\/steamcommunity-a.opskins.media\/economy\/image\/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFYznarJJjkQ6ovjw4SPlfP3auqEl2oBuJB1j--WoY322QziqkdpZGr3IteLMlhpw4RJCv8","item_rarity_color":"b0c3d9"},{"id":"253","steam_id":"76561198418255161","nickname":"\u5b8c\u7f8e\u4e16\u754c55","item_id":"14545516551","item_name":"\u4f3d\u739b\u6b66\u5668\u7bb1","item_icon":"https:\/\/steamcommunity-a.opskins.media\/economy\/image\/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFYznarJJjkQ6ovjw4SPlfP3auqEl2oBuJB1j--WoY322QziqkdpZGr3IteLMlhpw4RJCv8","item_rarity_color":"b0c3d9"}]';
    
//     var options = {
//     host: '127.0.0.1',
//     path: '/',
//     port: 9123,
//     method: 'POST',
//     headers:{
//     'Content-Type':'application/json'
//     }
//     };

    
//     var req = http.request(options, function(res) {
//     var _data='';
//     res.on('data', function(chunk){
//         _data += chunk;
//     });
//     res.on('end', function(){
//     });
//     });
    
//     req.write(content);
//     req.end();

    
//     // var requestData={"extra_vars": {"gamehost": "172.31.16.89"}};
//     // req({
//     //     url: "http://www.quizs.com/welcome/p",
//     //     //port:9123,
//     //     method: "POST",
//     //     json: true,
//     //     headers: {
//     //         "content-type": "application/json",
//     //     },
//     //     body: requestData
//     // }, function(error, response, body) {
//     //     if (!error && response.statusCode == 200) {
//     //         console.log(body) // 请求成功的处理逻辑
//     //     }
//     // });

// })