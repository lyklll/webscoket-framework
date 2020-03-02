/*
定时执行器
*/

//读取本路径下的js，并加载
var fs = require('fs');
let allTimers = []
let files = fs.readdirSync(__dirname)
files.forEach(x => {
    if (x != "index.js" && x.indexOf('.js') >= 0) {
        var tmp = require(`./${x}`)
        allTimers.push(tmp)
    }
})

function exec(sendFunc) {
    allTimers.forEach(inst => {
        inst.options = inst.options || {}
        let timeSpan = (inst.options.timeSpan || 10) * 1000
        if (inst.options.quickStart) {
            inst.exec(sendFunc)
        }
        setTimeout(function func() {
            inst.exec(sendFunc)
            setTimeout(func, timeSpan)
        }, timeSpan)
    })
}

module.exports = exec;