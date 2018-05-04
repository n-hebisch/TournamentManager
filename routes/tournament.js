var express = require('express');
var router = express.Router();

const DBMTournament = require('../app/DBManagerTournament.js');
const DBMTeam = require('../app/DBManagerTeam.js');

function refresh(res) {
    var DBManagerTeam = new DBManagerTeam();

    var getTournaments = DBManagerTournament.getAllExistingTournaments();
    getTournaments.then((tournament) => {

            var getTeamByTournament = DBManagerTournament.getTeamByTournament();
            getTeamByTournament.then((tournament_team) => {
                //inserts teams into tournament object, so every tournament has his teams
                for (var i in tournament) {
                    tournament[i].teams = [];
                    for (var x in tournament_team) {
                        if (tournament[i].id === tournament_team[x].tournament_id) {
                            var teamTemp = [];
                            teamTemp['id'] = tournament_team[x].team_id;
                            teamTemp['name'] = tournament_team[x].team_name;
                            tournament[i].teams.push(teamTemp);
                        }
                    }
                }
                // console.log('1')
                // console.log(tournament)
            }).then(() => {
                console.log(tournament);

                for (var i in tournament) {
                    var getTeamsThatAreNotInTournament = DBManagerTournament.getTeamsThatAreNotInTournament(tournament[i].id);
                    getTeamsThatAreNotInTournament.then((teams) => {
                        tournament[i].notTeams = [];
                        console.log('2b');
                        for (var x in teams) {
                            var teamTemp = [];
                            teamTemp['id'] = teams[x].id;
                            teamTemp['name'] = teams[x].name;
                            tournament[i].notTeams.push(teamTemp);
                            console.log(tournament)
                        }
                    })
                }
                // console.log('2c');
                // console.log(tournament)
            }).catch((error) => console.log(error));
        }
    )
};
//loads tournament and teams
router.get('/', function (req, res) {
    var DBManagerTournament = new DBMTournament();
    var tournaments = DBManagerTournament.getAllExistingTournaments();
    tournaments.then((data) => {
        console.log(data);
        res.render('tournament/index', {tournaments: data})
    });
});

// Get a tournament
router.get('/:id', function (req, res) {
    var DBManagerTournament = new DBMTournament();
    var loadPage = DBManagerTournament.getTournamentById(req.params.id);
    loadPage.then((result) => {
        res.render('tournament/index', {tournaments: result})
    }).catch((error) => console.log(error));

});

router.get('/edit', function (req, res) {
    console.log('HI');
    var DBManagerTournament = new DBMTournament();
    var loadPage = DBManagerTournament.getTournamentById(1);
    loadPage.then((result) => {
        res.render('tournament/index', {tournaments: result})
    }).catch((error) => console.log(error));

});

// Create a new tournament
router.post('/', function (req, res) {
    var DBManagerTournament = new DBMTournament();

    var promiseCreateMatch = DBManagerTournament.createTournament(req.body.name);
    promiseCreateMatch.then(() => DBManagerTournament.getAllExistingTournaments())
        .then((result) => {
            res.render('tournament/index', {tournaments: result})
        })
        .catch((error) => console.log(error))
});

// Edit a tournament
router.put('/', function (req, res) {
    var DBManagerTournament = new DBMTournament();

    var promiseEditMatch = DBManagerTournament.editTournamentById(req.body.name, req.body.id);
    promiseEditMatch.then(() => DBManagerTournament.getAllExistingTournaments())
        .then((result) => {
            res.render('tournament/index', {tournaments: result})
        })
        .catch((error) => console.log(error))
});

// Delete a tournament
router.delete('/', function (req, res) {
    var DBManagerTournament = new DBMTournament();

    var promiseDeleteMatch = DBManagerTournament.deleteTournamentById(req.body.id);
    promiseDeleteMatch.then(() => DBManagerTournament.getAllExistingTournaments())
        .then((result) => {
            res.render('tournament/index', {tournaments: result})
        })
        .catch((error) => console.log(error))
});

// Delete a tournament
router.delete('/deleteTeamFromTournament', function (req, res) {
    var DBManagerTournament = new DBMTournament();

    var deleteTeamFromTournament = DBManagerTournament.deleteTeamFromTournament(req.body.teamid, req.body.tournamentid);
    deleteTeamFromTournament.then(() => DBManagerTournament.getAllExistingTournaments())
        .then((result) => {
            res.render('tournament/index', {tournaments: result})
        })
        .catch((error) => console.log(error))
});


module.exports = router;