var express = require('express');
var router = express.Router();

const DBMPlayer = require('../app/DBManagerPlayer.js');

router.get('/', function (req, res) {
    var DBManagerPlayer = new DBMPlayer();
    var loadPage = DBManagerPlayer.getAllExistingPlayers();
    loadPage.then((result) => {
        res.render('player/index', {players: result})
    }).catch((error) => console.log(error));
});

// Get a player
router.get('/:id', function (req, res) {
    var DBManagerPlayer = new DBMPlayer();
    var loadPage = DBManagerPlayer.getPlayerById(req.params.id);
        loadPage.then((result) => {
            res.render('player/index', {players: result})
        }).catch((error) => console.log(error));

});

// Create a new player
router.post('/', function (req, res) {
    var DBManagerPlayer = new DBMPlayer();

    var promiseCreatePlayer = DBManagerPlayer.createPlayer(req.body.name);
    promiseCreatePlayer.then(() => DBManagerPlayer.getAllExistingPlayers())
        .then((result) => {
            res.render('player/index', {players: result})
        })
        .catch((error) => console.log(error))
});

// Edit a player
router.put('/', function (req, res) {
    var DBManagerPlayer = new DBMPlayer();

    var promiseEditPlayer = DBManagerPlayer.editPlayernameById(req.body.name, req.body.id);
    promiseEditPlayer.then(() => DBManagerPlayer.getAllExistingPlayers())
        .then((result) => {
            res.render('player/index', {players: result})
        })
        .catch((error) => console.log(error))
});

// Delete a player
router.delete('/', function (req, res) {
    var DBManagerPlayer = new DBMPlayer();

    var promiseDeletePlayer = DBManagerPlayer.deletePlayerById(req.body.id);
    promiseDeletePlayer.then(() => DBManagerPlayer.getAllExistingPlayers())
        .then((result) => {
            res.render('player/index', {players: result})
        })
        .catch((error) => console.log(error))
});

module.exports = router;