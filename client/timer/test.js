let currInst = {}

//定时器的配置
currInst.options = {
    key: "timer.test", //定时器的唯一标识，本目录内唯一
    timeSpan: 10, //定时器间隔,单位秒
    quickStart: true, //是否快速启动，即第一次是在时间间隔后启动还是服务启动时马上启动
}

//定时器的执行方法

currInst.exec = function(wsConnection) {
    wsConnection.sendData("ffff.sss", {}, (msg) => {
        console.log(`执行了，本次执行的时间是：${new Date()},消息是：${msg}`)
    })
}


module.exports = currInst;