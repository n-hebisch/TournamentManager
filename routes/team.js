var express = require('express');
var router = express.Router();

const DBMTeam = require('../app/DBManagerTeam.js');

router.get('/', function (req, res) {
    var DBManagerTeam = new DBMTeam();
    var loadPage = DBManagerTeam.getAllExistingTeams();
    loadPage.then((result) => {
        console.log(result);
        res.render('team/index', {teams: result})
    });
});

// Get a player
router.get('/:id', function (req, res) {
    var DBManagerTeam = new DBMTeam();

    if (req.params.id !== undefined) {
        var loadPage = DBManagerTeam.getTeamById(req.params.id);
        loadPage.then((result) => {
            res.render('team/index', {teams: result})
        });

    }
    else {
        var loadPage = DBManagerTeam.getAllExistingTeams();
        loadPage.then((result) => {
            res.render('team/index', {teams: result})
        });
    }
});

// Create a new player
router.post('/', function (req, res) {
    var DBManagerTeam = new DBMTeam();

    var promiseCreatePlayer = DBManagerTeam.createTeam(req.body.name);
    promiseCreatePlayer.then(() => DBManagerTeam.getAllExistingTeams())
        .then((result) => {
            res.render('team/index', {teams: result})
        })
        .catch((error) => console.log(error))
});

// Edit a player
router.put('/', function (req, res) {
    var DBManagerTeam = new DBMTeam();

    var promiseEditPlayer = DBManagerTeam.editTeamById(req.body.name, req.body.id);
    promiseEditPlayer.then(() => DBManagerTeam.getAllExistingTeams())
        .then((result) => {
            res.render('team/index', {teams: result})
        })
        .catch((error) => console.log(error))
});

// Delete a player
router.delete('/', function (req, res) {
    var DBManagerTeam = new DBMTeam();

    var promiseDeletePlayer = DBManagerTeam.deleteTeamById(req.body.id);
    promiseDeletePlayer.then(() => DBManagerTeam.getAllExistingTeams())
        .then((result) => {
            res.render('team/index', {teams: result})
        })
        .catch((error) => console.log(error))
});

module.exports = router;