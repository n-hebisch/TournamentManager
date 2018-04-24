const DBM = require('./DBManager.js');
require('dotenv').config();

class DBsetup extends DBM {
    setupDB() {
        this.getQuery('CREATE TABLE player(\n' +
            '    id int NOT NULL AUTO_INCREMENT,\n' +
            '    name text,\n' +
            '    `exists` integer(1) DEFAULT 1,\n' +
            '    PRIMARY KEY (id)\n' +
            ')\n')
            .then(() => {
                return this.getQuery('CREATE TABLE team(\n' +
                    '    id int NOT NULL AUTO_INCREMENT,\n' +
                    '    name text,\n' +
                    '    `exists` integer(1) DEFAULT 1,\n' +
                    '    PRIMARY KEY(id)\n' +
                    ')\n')
            })
            .then(() => {
                return this.getQuery('CREATE TABLE `match`(\n' +
                    '    id int NOT NULL AUTO_INCREMENT,\n' +
                    'winnerteamId int,\n' +
                    '    `exists` integer(1) DEFAULT 1,\n' +
                    '    PRIMARY KEY(id)\n' +
                    ')\n')
            })
            .then(() => {
                return this.getQuery('CREATE TABLE tournament(\n' +
                    '    id int NOT NULL AUTO_INCREMENT,\n' +
                    '    name text,\n' +
                    '    `exists` integer(1) DEFAULT 1,\n' +
                    '    PRIMARY KEY(id))\n')
            })
            .then(() => {
                return this.getQuery('CREATE TABLE t_team_player(\n' +
                    '    team_id int NOT NULL,\n' +
                    '    player_id int NOT NULL,\n' +
                    '\n' +
                    '    PRIMARY KEY (team_id, player_id),\n' +
                    '    FOREIGN KEY (team_id) REFERENCES team(id),\n' +
                    '    FOREIGN KEY (player_id) REFERENCES player(id)\n' +
                    ')\n')
            })
            .then(() => {
                return this.getQuery('CREATE TABLE t_team_match(\n' +
                    '    team_id int NOT NULL,\n' +
                    '    match_id int NOT NULL,\n' +
                    '\n' +
                    '    PRIMARY KEY (team_id, match_id),\n' +
                    '    FOREIGN KEY (team_id) REFERENCES team(id),\n' +
                    '    FOREIGN KEY (match_id) REFERENCES `match`(id)\n' +
                    ')\n')
            })
            .then(() => {
                return this.getQuery('CREATE TABLE t_team_tournament(\n' +
                    '    team_id int NOT NULL,\n' +
                    '    tournament_id int NOT NULL,\n' +
                    '\n' +
                    '    PRIMARY KEY (team_id, tournament_id),\n' +
                    '    FOREIGN KEY (team_id) REFERENCES team(id),\n' +
                    '    FOREIGN KEY (tournament_id) REFERENCES tournament(id)\n' +
                    ')\n')
            })
            .then(() => {
                return this.getQuery('CREATE TABLE t_tournament_match(\n' +
                    '    tournament_id int NOT NULL,\n' +
                    '    match_id int NOT NULL,\n' +
                    '\n' +
                    '    PRIMARY KEY (tournament_id, match_id),\n' +
                    '    FOREIGN KEY (tournament_id) REFERENCES tournament(id),\n' +
                    '    FOREIGN KEY (match_id) REFERENCES `match`(id)\n' +
                    ')\n')
            }).catch((err) => {
            console.log(err);
        })
    }
}

var setupDB = new DBsetup();
setupDB.setupDB();

// INSERT INTO player(`name`) VALUES('Eddy');
// INSERT INTO player(`name`) VALUES('Nico');
// INSERT INTO player(`name`) VALUES('Niklas');
//
// INSERT INTO team(`name`,`exists`) VALUES('Team1',1);
// INSERT INTO team(`name`,`exists`) VALUES('Team2',1);
// INSERT INTO team(`name`,`exists`) VALUES('Team3',1);
//
// INSERT INTO `match`(`winnerTeamId`) VALUES(null);
// INSERT INTO `match`(`winnerTeamId`) VALUES(null);
// INSERT INTO `match`(`winnerTeamId`) VALUES(null);
//
// INSERT INTO tournament(`name`,`exists`) VALUES('Tournament1',1);
// INSERT INTO tournament(`name`,`exists`) VALUES('Tournament2',1);
// INSERT INTO tournament(`name`,`exists`) VALUES('Tournament3',1);
//
// INSERT INTO t_team_match(team_id,match_id) VALUES(1,2);
// INSERT INTO t_team_match(team_id,match_id) VALUES(2,2);
//
// INSERT INTO t_team_player(team_id,player_id) VALUES(2,2);
// INSERT INTO t_team_player(team_id,player_id) VALUES(1,3);
//
// INSERT INTO t_team_tournament(team_id,tournament_id) VALUES(1,1);
// INSERT INTO t_team_tournament(team_id,tournament_id) VALUES(2,1);
//
// INSERT INTO t_tournament_match(tournament_id,match_id) VALUES(1,2);
// INSERT INTO t_tournament_match(tournament_id,match_id) VALUES(2,3);
