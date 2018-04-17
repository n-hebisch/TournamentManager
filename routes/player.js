var express = require('express');
var router = express.Router();

const playerDBManager = require('../playersDBManager.js');

router.get('/', function (req, res) {
    var loadPage = playerDBManager.getAllExistingPlayers();
    loadPage.then((result) => {
        res.render('player/index', {players: result})
    });
});

// Get a player
router.get('/:id', function (req, res) {

    if (req.params.id !== undefined) {
        var loadPage = playerDBManager.getPlayerById(req.params.id);
        loadPage.then((result) => {
            res.render('player/index', {players: result})
        });

    }
    else {
        var loadPage = playerDBManager.getAllExistingPlayers();
        loadPage.then((result) => {
            res.render('player/index', {players: result})
        });
    }
});

// Create a new player
router.post('/', function (req, res) {
    var promiseCreatePlayer = playerDBManager.createPlayer(req.body.name);
    promiseCreatePlayer.then(() => playerDBManager.getAllExistingPlayers())
        .then((result) => {
            res.render('player/index', {players: result})
        })
        .catch((error) => console.log(error))
});

// Edit a player
router.put('/', function (req, res) {
    var promiseEditPlayer = playerDBManager.editPlayernameById(req.body.name, req.body.id);
    promiseEditPlayer.then(() => playerDBManager.getAllExistingPlayers())
        .then((result) => {
            res.render('player/index', {players: result})
        })
        .catch((error) => console.log(error))
});

// Delete a player
router.delete('/', function (req, res) {
    var promiseDeletePlayer = playerDBManager.deletePlayerById(req.body.id);
    promiseDeletePlayer.then(() => playerDBManager.getAllExistingPlayers())
        .then((result) => {
            res.render('player/index', {players: result})
        })
        .catch((error) => console.log(error))
});

module.exports = router;