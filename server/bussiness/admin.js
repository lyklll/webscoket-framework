let exportResult = {}
exportResult.getAllConnections = (connection, options) => {
    let result = []
    connection.server.connections.forEach(conn => {
        result.push(conn.sysTag)
    })
    return result
}

module.exports = exportResult