const DBMP = require('../DBManagerPlayer.js');
const DBMTe = require('../DBManagerTeam.js');
const DBMM = require('../DBManagerMatch.js');
const DBMTo = require('../DBManagerTournament.js');

var DBMPlayer=new DBMP;
var DBMTeam=new DBMTe;
var DBMMatch=new DBMM;
var DBMTournament=new DBMTo;


DBMPlayer.createPlayer('TestPlayer1');
DBMPlayer.createPlayer('TestPlayer2');
DBMPlayer.createPlayer('TestPlayer3');
DBMPlayer.createPlayer('TestPlayer4');
DBMPlayer.createPlayer('TestPlayer5');
DBMPlayer.createPlayer('TestPlayer6');

DBMTeam.createTeam('TestTeam1');
DBMTeam.createTeam('TestTeam2');
DBMTeam.createTeam('TestTeam3');

DBMTeam.addPlayertoTeam();

DBMMatch.createMatch();
DBMMatch.createMatch();
DBMMatch.createMatch();

DBMTournament.createTournament('TestTournament1');



//Spieler einfügen
//Spieler auslesen
//Wenn identisch fortfahren