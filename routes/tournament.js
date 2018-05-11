var express = require('express');
var router = express.Router();

const DBMTournament = require('../app/DBManagerTournament.js');
const DBMTeam = require('../app/DBManagerTeam.js');

// function refresh(res) {
//     var DBManagerTeam = new DBManagerTeam();
//
//     var getTournaments = DBManagerTournament.getAllExistingTournaments();
//     getTournaments.then((tournament) => {
//
//             var getTeamByTournament = DBManagerTournament.getTeamByTournament();
//             getTeamByTournament.then((tournament_team) => {
//                 //inserts teams into tournament object, so every tournament has his teams
//                 for (var i in tournament) {
//                     tournament[i].teams = [];
//                     for (var x in tournament_team) {
//                         if (tournament[i].id === tournament_team[x].tournament_id) {
//                             var teamTemp = [];
//                             teamTemp['id'] = tournament_team[x].team_id;
//                             teamTemp['name'] = tournament_team[x].team_name;
//                             tournament[i].teams.push(teamTemp);
//                         }
//                     }
//                 }
//                 // console.log('1')
//                 // console.log(tournament)
//             }).then(() => {
//                 console.log(tournament);
//
//                 for (var i in tournament) {
//                     var getTeamsThatAreNotInTournament = DBManagerTournament.getTeamsThatAreNotInTournament(tournament[i].id);
//                     getTeamsThatAreNotInTournament.then((teams) => {
//                         tournament[i].notTeams = [];
//                         console.log('2b');
//                         for (var x in teams) {
//                             var teamTemp = [];
//                             teamTemp['id'] = teams[x].id;
//                             teamTemp['name'] = teams[x].name;
//                             tournament[i].notTeams.push(teamTemp);
//                             console.log(tournament)
//                         }
//                     })
//                 }
//                 // console.log('2c');
//                 // console.log(tournament)
//             }).catch((error) => console.log(error));
//         }
//     )
// }

//loads tournament and teams
router.get('/', function (req, res) {
    var DBManagerTournament = new DBMTournament();

    DBManagerTournament.getAllExistingTournaments().
    then((data) => {
        // console.log('tournaments');
        // console.log(data);
        res.render('tournament/index', {tournaments: data})
    });
});

// Get a tournament
router.get('/:id', function (req, res) {
    var DBManagerTournament = new DBMTournament();
    var tournament;
    //teams[0]=teams that are in tournament,teams[1]=teams that are not in tournament
    var teams = [];

    DBManagerTournament.getTournamentById(req.params.id).
    then((res) => {
        return tournament = res;
    }).
    then(() => {
        return DBManagerTournament.getTeamsByTournament(req.params.id).
        then((res) => {
            teams[0] = res;
        })
    }).
    then(() => {
        return DBManagerTournament.getTeamsThatAreNotInTournament(req.params.id).
        then((res) => {
            teams[1] = res;
        })
    }).
    then(() => {
        // console.log('tournament');
        // console.log(tournament);
        // console.log('teams[0]');
        // console.log(teams[0]);
        // console.log('teams[1]');
        // console.log(teams[1]);
        res.render('tournament/show', {tournament: tournament, teams: teams})
    }).catch((error) => console.log(error));

});

// Create a new tournament
router.post('/', function (req, res) {
    var DBManagerTournament = new DBMTournament();

    var promiseCreateMatch = DBManagerTournament.createTournament(req.body.name);
    promiseCreateMatch.then(() => DBManagerTournament.getAllExistingTournaments())
        .then((result) => {
            // res.render('tournament/index', {tournaments: result})
        })
        .catch((error) => console.log(error))
});

// Edit a tournament
router.put('/', function (req, res) {
    console.log('EDIT');
    console.log(req.body.name);
    console.log(req.body.id);
    var DBManagerTournament = new DBMTournament();

    DBManagerTournament.editTournamentById(req.body.name, req.body.id).
    then(() => DBManagerTournament.getAllExistingTournaments())
        .catch((error) => console.log(error))
});

// Delete a tournament
router.delete('/', function (req, res) {
    var DBManagerTournament = new DBMTournament();

    var promiseDeleteMatch = DBManagerTournament.deleteTournamentById(req.body.id);
    promiseDeleteMatch.then(() => DBManagerTournament.getAllExistingTournaments())
        .then((result) => {
            // res.render('tournament/index', {tournaments: result})
        })
        .catch((error) => console.log(error))
});


// Delete a tournament
router.delete('/deleteTeamFromTournament', function (req, res) {
    var DBManagerTournament = new DBMTournament();

    var deleteTeamFromTournament = DBManagerTournament.deleteTeamFromTournament(req.body.teamid, req.body.tournamentid);
    deleteTeamFromTournament.then(() => DBManagerTournament.getAllExistingTournaments())
        .then((result) => {
            // res.render('tournament/index', {tournaments: result})
        })
        .catch((error) => console.log(error))
});

module.exports = router;