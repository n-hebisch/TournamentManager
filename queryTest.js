require('dotenv').config({path: './.env'});
var mysql = require('mysql');

class DBManager {
//send a query to MYSQL Server (msg=MYSQL query, params(not necessary) = extends query with variables)
    getQuery() {
        var me = this;
        //return a promise resolve value is result of query
        return new Promise((resolve, reject) => {
            this.init();
            this.connection.connect();
            //send query
            this.connection.query('select t.id as tournament_id,t.name as tournament_name,t3.id as team_id,t3.name as team_name from tournament as t\n' +
                'left join t_team_tournament t2 on t.id = t2.tournament_id\n' +
                'left join team t3 on t2.team_id = t3.id\n' +
                'WHERE t.`exists`=1 OR t3.`exists`=1\n' +
                'ORDER BY t.id;', function (error, results, fields) {
                //catch error and reject
                if (error) reject(error);
                //stop connection
                me.connection.end();
                //resolve if successful
                console.log(results);
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

var queryTest=new DBManager();
var result=queryTest.getQuery();
result.then((res)=>{
    // console.log(res);
});
