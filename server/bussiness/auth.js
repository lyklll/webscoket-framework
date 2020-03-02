var dbHelper = require('../modules/sqliteHelper');
let exportResult = {}
exportResult.login = (conn, options) => {
    console.log(options)
    if (!options || !options.loginName || !options.loginPwd) {
        throw "无效参数"
    }
    let data = dbHelper.queryOneRow({
        sql: "select * from bas_userInfo where status=1 and loginName=@loginName and loginPwd=@loginPwd",
        params: {
            loginName: options.loginName,
            loginPwd: options.loginPwd
        }
    })
    if (data) {
        conn.sysTag = data
        return true
    }
    return false
}

module.exports = exportResult