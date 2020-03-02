var ws = require('nodejs-websocket');
const bussiness = require('../bussiness/index')
const createServer = () => {
    let server = ws.createServer(function(connection) {
        connection.on('text', function(result) {
            bussiness.exec(connection, result)
            console.log('发送消息', result)
        })
        connection.on('connect', function(code) {
            console.log('开启连接', code)
        })
        connection.on('close', function(code) {
            console.log('关闭连接', code)
        })
        connection.on('error', function(code) {
            console.log('异常关闭', code)
        })
    })
    return server
}

const server = createServer()
server.listen(9000)
console.log("open in 9000")
module.exports = server