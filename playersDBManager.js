var mysql = require('mysql');

var PlayersDBManager = {
    getQuery: function (msg, params) {
        //logindata for MYSQL Server
        var connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PW,
            database: process.env.DB_DB
        });
        //SQL query without params
        if (params === undefined) {
            return new Promise((resolve, reject) => {
                connection.connect();
                connection.query(msg, function (error, results, fields) {
                    if (error) reject(error);
                    connection.end();
                    resolve(results);
                });
            })
        }
        //SQL query with params
        return new Promise((resolve, reject) => {
            connection.connect();
            connection.query(msg, params, function (error, results, fields) {
                if (error) reject(error);
                connection.end();
                resolve(results);
            });
        })
    },

    createPlayer: function createPlayer(playername) {
        return this.getQuery('INSERT INTO players(`name`,`exists`) VALUES(?,1)', [playername]);
    },

    deletePlayerById: function deletePlayerById(id) {
        return this.getQuery('UPDATE players SET `exists`=0 WHERE `id`=?', [id]);
    },

    editPlayernameById: function editPlayernameById(newPlayername, id) {
        return this.getQuery('UPDATE players SET name =? WHERE id=?', [newPlayername, id]);
    },

    getAllExistingPlayers: function getAllExistingPlayers() {
        return this.getQuery('SELECT * FROM players WHERE `exists`=1');
    },

    getPlayerById: function getPlayerById(id) {
        return this.getQuery('SELECT * FROM players WHERE id= ?', [id]);
    }
};

module.exports = PlayersDBManager;