var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'docker-niklas',
    password: 'docker-niklas',
    database: 'docker-niklas'
});

var promiseCreatePlayer = new Promise(function (resolve, reject) {
    connection.connect();

    connection.query('INSERT INTO players(name,"exists") VALUES(nsiklas,1)', [playername], function (error, results, fields) {
        if (error) {
            return reject(error);
        }
        resolve(results[0]);
    });
});

promiseCreatePlayer.then(function (result) {
    console.log("success");
    console.log(result);
}).catch(function (error) {
    console.log("error");
    console.log(error)
    return;
}).then(function (num) {
    return connection.end();
});


// promiseCreatePlayer.then(function (result) {
//     playerDBManager.getAllExistingPlayers(function (data) {
//         res.render('player/index', {players: data})
//     })
// }, function (err) {
//     console.log(err)
// });

