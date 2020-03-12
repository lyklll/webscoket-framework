var fs = require('fs');

let allHandle = {}



//读取本路径下的js，并加载
let files = fs.readdirSync(__dirname)
files.forEach(x => {
    if (x != "index.js" && x.indexOf('.js') >= 0) {
        var tmp = require(`./${x}`)
        let fileName = x.split('.')[0]
        allHandle[fileName] = tmp
    }
})

let result = {}

result.error = (conn, errMessage, backToken) => {
    let err = {
        issuccess: false,
        backToken: backToken,
        data: errMessage
    }
    conn.send(JSON.stringify(err))

}
result.success = (conn, data) => {
    let handleResult = {
        issuccess: true,
        backToken: data.backToken,
        data: data
    }
    conn.send(JSON.stringify(handleResult))
}

result.exec = (conn, options) => {

    let part = null
    try {
        part = JSON.parse(options)
    } catch {
        result.error(conn, "无效的格式")
        return
    }
    if (!conn.sysTag && part.key != 'auth.login') {
        result.error(conn, "没有访问权限", part.requestToken)
        return
    }

    try {
        let paths = part.key.split(".")
        let tmp = allHandle
        for (let i = 0; i < paths.length; i++) {
            let path = paths[i]
            if (tmp[path]) {
                tmp = tmp[path]
            } else {
                result.error(conn, "当前key无效", part.requestToken)
                return
            }
        }
        let handleResult = tmp(conn, part.options)
        if (part.requestToken) {
            handleResult.backToken = part.requestToken
        }
        result.success(conn, handleResult)
    } catch (ex) {

        result.error(conn, ex.message, part.requestToken)
    }
}

module.exports = result;