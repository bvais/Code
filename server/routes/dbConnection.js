var mysql = require('mysql');

function dbConnection() {
    return mysql.createConnection({
        host: "airsparescrm.cjfcut82mukw.us-west-2.rds.amazonaws.com",
        user: "admin",
        password: "adminCRM",
        database: "airspares"
    });
}

module.exports = dbConnection();