var mysql = require('mysql');

class DBManager {
//send a query to MYSQL Server (msg=MYSQL query, params(not necessary) = extends query with variables)
    getQuery(msg, params = {}) {
        var me = this;
        //return a promise resolve value is result of query
        return new Promise((resolve, reject) => {
            this.init();
            this.connection.connect();
            //send query
            this.connection.query(msg, params, function (error, results, fields) {
                //catch error and reject
                if (error) reject(error);
                //stop connection
                me.connection.end();
                //resolve if successful
                resolve(results);
            });
        })
    }

//initialize a connection to MYSQLServer
    init() {
        //logindata for MYSQL Server
        this.connection = mysql.createConnection({
            //get logindata from .env file
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PW,
            database: process.env.DB_DB
        });
    }
}

//export so other classes can be extended by DBManager
module.exports = DBManager;