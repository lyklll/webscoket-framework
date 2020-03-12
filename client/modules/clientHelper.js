var GUID = require('node-uuid');
var WebSocket = require("ws");
//1.创建websocket客户端
var wsServer = 'ws://127.0.0.1:9000';
var limitConnect = 3; // 断线重连次数
var timeConnect = 0;
let wsConnection = webSocketInit(wsServer);
var handlesAfterOpen = []
//socket初始化
function webSocketInit(service) {
    var ws = new WebSocket(service);

    var callBackList = {}
    ws.onopen = function() {
        send("auth.login", {
            "loginName": "admin",
            "loginPwd": "123"
        })
        console.log("成功链接服务器")
        handlesAfterOpen.forEach(x => {
            x(ws)
        })
    };
    ws.on('message', function(message) {
        let options = JSON.parse(message)
        if (options.backToken && callBackList[options.backToken]) {
            callBackList[options.backToken](message)
            delete callBackList[options.backToken]
        }
    })
    ws.on("error", function(err) {
        console.log(err)
    })
    ws.onclose = function() {
        console.log('服务器已经断开');
        reconnect(service);
    };

    // 重连
    function reconnect(service) {
        // lockReconnect加锁，防止onclose、onerror两次重连
        if (1 > 0) {
            limitConnect--;
            timeConnect++;
            console.log("第" + timeConnect + "次重连");
            // 进行重连
            setTimeout(function() {
                webSocketInit(service);
            }, 2000);

        } else {
            console.log("TCP连接已超时");
        }
    }

    function send(key, options, callBack) {
        let token = GUID.v1()
        let obj = {
            requestToken: token,
            key: key,
            options: options
        }
        var str = JSON.stringify(obj);
        ws.send(str);
        if (callBack)
            callBackList[token] = callBack
    }
    ws.sendData = send
    ws.installAfterOpen = function(handle) {
        handlesAfterOpen.push(handle)
    }
    return ws
}
module.exports = wsConnection