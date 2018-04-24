const DBM = require('./DBManager.js');

class DBManagerTeam extends DBM {
    createTeam(playername) {
        return this.getQuery('INSERT INTO team(`name`,`exists`) VALUES(?,1)', [playername]);
    }

    deleteTeamById(id) {
        return this.getQuery('UPDATE team SET `exists`=0 WHERE `id`=?', [id]);
    }

    editTeamById(newPlayername, id) {
        return this.getQuery('UPDATE team SET name =? WHERE id=?', [newPlayername, id]);
    }

    getTeamById(id) {
        return this.getQuery('SELECT * FROM team WHERE id= ?', [id]);
    }

    getAllExistingTeams() {
        return this.getQuery('SELECT * FROM team WHERE `exists`=1');
    }

///
    addPlayertoTeam(teamid, playerid) {
        return this.getQuery('INSERT INTO t_team_player(`team_id`,`player_id`) VALUES(?,?)', [teamid, playerid]);
    }

    addTeamtoTournament([teamid, tournamentid]) {
        return this.getQuery('INSERT INTO t_team_tournament(`team_id`,`tournament_id`) VALUES(?,?)', [teamid, tournamentid]);
    }

    addTeamtoMatch(teamid, matchid) {
        return this.getQuery('INSERT INTO t_team_match(`team_id`,`match_id`) VALUES(?,?)', [teamid, matchid]);
    }

    getPlayerByTeam() {
        return this.getQuery('select t.id,t.name, p.id,p.name from team  as t\n' +
            'left join t_team_player t2 on t.id = t2.team_id\n' +
            'left join player p on t2.player_id = p.id\n' +
            'WHERE t.`exists`=1 OR p.`exists`=1\n' +
            'ORDER BY t.id;\n' +
            '\n')
    }

    getMatchbyTeam() {
        return this.getQuery('select t.id,t.name,m.id,m.winnerteamId from team as t\n' +
            'left join t_team_match t2 on t.id = t2.team_id\n' +
            'left join `match` m on t2.match_id = m.id\n' +
            'WHERE t.`exists`=1 OR m.`exists`=1\n' +
            'ORDER BY t.id;');
    }

    getTournamentbyTeam() {
        return this.getQuery('select t.id,t.name,t3.id,t3.name from team as t\n' +
            'left join t_team_tournament t2 on t.id = t2.team_id\n' +
            'left join tournament t3 on t2.tournament_id = t3.id\n' +
            'WHERE t.`exists`=1 OR t3.`exists`=1\n' +
            'ORDER BY t.id;');
    }

}


module.exports = DBManagerTeam;