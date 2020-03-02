var sqlite3 = require("better-sqlite3")

class sqliteHelper {
    constructor() {
        this.db = sqlite3("server.db")
    }
    queryList(obj) {
        var stmt = this.db.prepare(obj.sql);
        return stmt.all(obj.params || {})
    }
    queryOneRow(obj) {

        var stmt = this.db.prepare(obj.sql);
        return stmt.get(obj.params || {})

    }
    executeSql(obj) {
        var stmt = this.db.prepare(obj.sql);
        return stmt.run(obj.params || {})
    }
}

module.exports = new sqliteHelper()