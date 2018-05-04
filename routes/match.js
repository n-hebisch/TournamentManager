var express = require('express');
var router = express.Router();

const DBMMatch = require('../app/DBManagerMatch.js');

router.get('/', function (req, res) {
    var DBManagerMatch = new DBMMatch();
    var loadPage = DBManagerMatch.getAllExistingMatches();
    loadPage.then((result) => {
        console.log(loadPage);
        res.render('match/index', {matches: result})
    }) .catch((error) => console.log(error));
});

// Get a match
router.get('/:id', function (req, res) {
    var DBManagerMatch = new DBMMatch();
    var loadPage = DBManagerMatch.getMatchById(req.params.id);
    loadPage.then((result) => {
        res.render('match/index', {matches: result})
    }) .catch((error) => console.log(error));

});

// Create a new match
router.post('/', function (req, res) {
    var DBManagerMatch = new DBMMatch();

    var promiseCreateMatch = DBManagerMatch.createMatch();
    promiseCreateMatch.then(() => DBManagerMatch.getAllExistingMatches())
        .then((result) => {
            res.render('match/index', {matches: result})
        })
        .catch((error) => console.log(error))
});

// // Edit a match
// router.put('/', function (req, res) {
//     var DBManagerMatch = new DBMMatch();
//
//     var promiseEditMatch = DBManagerMatch.edi(req.body.name, req.body.id);
//     promiseEditMatch.then(() => DBManagerMatch.getAllExistingPlayers())
//         .then((result) => {
//             res.render('match/index', {matches: result})
//         })
//         .catch((error) => console.log(error))
// });

// Delete a match
router.delete('/', function (req, res) {
    var DBManagerMatch = new DBMMatch();

    var promiseDeleteMatch = DBManagerMatch.deletePlayerById(req.body.id);
    promiseDeleteMatch.then(() => DBManagerMatch.getAllExistingPlayers())
        .then((result) => {
            res.render('match/index', {matches: result})
        })
        .catch((error) => console.log(error))
});

module.exports = router;