const wsConnection = require('./modules/clientHelper')

const timer = require('./timer/index')

wsConnection.installAfterOpen(timer) //安装定时器服务