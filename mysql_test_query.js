var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'docker-niklas',
    password: 'docker-niklas',
    database: 'docker-niklas'
});

connection.connect(function (err) {
    if (err) throw err;
});
var x = null;
var q = connection.query("select * from players", null, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
});


console.log(x);

connection.end();
