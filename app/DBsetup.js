const DBM = require('./DBManager.js');

class DBsetup extends DBM {
    setupDB() {
        return this.getQuery('CREATE TABLE player(\n' +
            '    id int NOT NULL AUTO_INCREMENT,\n' +
            '    name text,\n' +
            '    `exists` integer(1) DEFAULT 1,\n' +
            '    PRIMARY KEY (id)\n' +
            ');\n' +
            '\n' +
            'CREATE TABLE team(\n' +
            '    id int NOT NULL AUTO_INCREMENT,\n' +
            '    name text,\n' +
            '    `exists` integer(1) DEFAULT 1,\n' +
            '    PRIMARY KEY(id)\n' +
            ');\n' +
            '\n' +
            'CREATE TABLE `match`(\n' +
            '    id int NOT NULL AUTO_INCREMENT,\n' +
            '    name text,\n' +
            '    `exists` integer(1) DEFAULT 1,\n' +
            '    PRIMARY KEY(id)\n' +
            ');\n' +
            '\n' +
            'CREATE TABLE tournament(\n' +
            '    id int NOT NULL AUTO_INCREMENT,\n' +
            '    name text,\n' +
            '    `exists` integer(1) DEFAULT 1,\n' +
            '    PRIMARY KEY(Id)\n' +
            ');\n' +
            '\n' +
            'CREATE TABLE t_team_player(\n' +
            '    team_id int NOT NULL,\n' +
            '    player_id int NOT NULL,\n' +
            '\n' +
            '    PRIMARY KEY (team_id, player_id),\n' +
            '    FOREIGN KEY (team_id) REFERENCES team(id),\n' +
            '    FOREIGN KEY (player_id) REFERENCES player(id)\n' +
            ');\n' +
            'CREATE TABLE t_team_match(\n' +
            '    team_id int NOT NULL,\n' +
            '    match_id int NOT NULL,\n' +
            '\n' +
            '    PRIMARY KEY (team_id, match_id),\n' +
            '    FOREIGN KEY (team_id) REFERENCES team(id),\n' +
            '    FOREIGN KEY (match_id) REFERENCES `match`(id)\n' +
            ');\n' +
            'CREATE TABLE t_team_tournament(\n' +
            '    team_id int NOT NULL,\n' +
            '    tournament_id int NOT NULL,\n' +
            '\n' +
            '    PRIMARY KEY (team_id, tournament_id),\n' +
            '    FOREIGN KEY (team_id) REFERENCES team(id),\n' +
            '    FOREIGN KEY (tournament_id) REFERENCES tournament(id)\n' +
            ')\n' +
            'CREATE TABLE t_tournament_match(\n' +
            '    tournament_id int NOT NULL,\n' +
            '    match_id int NOT NULL,\n' +
            '\n' +
            '    PRIMARY KEY (tournament_id, match_id),\n' +
            '    FOREIGN KEY (tournament_id) REFERENCES tournament(id),\n' +
            '    FOREIGN KEY (match_id) REFERENCES `match`(id)\n' +
            ')\n')
    }
}

module.exports = DBsetup;


//LEFT JOIN
//select * from player as p
// left join t_team_player as ttp on p.id = ttp.player_id
// left join team t on ttp.team_id = t.id
// where p.name='Max'