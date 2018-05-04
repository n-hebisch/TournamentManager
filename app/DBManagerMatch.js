const DBM = require('./DBManager.js');

class DBManagerMatch extends DBM {
    createMatch(round) {
        return this.getQuery('INSERT INTO `match`(`winnerTeamId`,`round`) VALUES(null,?)',[round]);
    }

    deleteMatchById(id) {
        return this.getQuery('UPDATE `match` SET `exists`=0 WHERE `id`=?', [id]);
    }

    setWinnerteam(winnerteamid, matchid) {
        return this.getQuery('UPDATE `match` SET winnerteamId =? WHERE id=?', [winnerteamid, matchid]);
    }

    getMatchById(id) {
        return this.getQuery('SELECT * FROM `match` WHERE id= ?', [id]);
    }

    getAllExistingMatches() {
        return this.getQuery('SELECT * FROM `match` WHERE `exists`=1');
    }

    ///
    addMatchtoTournament(tournamentid, matchid) {
        return this.getQuery('INSERT INTO t_tournament_match(tournament_id,match_id) VALUES(?,?)', [tournamentid, matchid]);
    }

    addTeamtoMatch(teamid, matchid) {
        return this.getQuery('INSERT INTO t_team_match(team_id,match_id) VALUES(?,?)', [teamid, matchid]);
    }

    getTournamentbyMatch() {
        return this.getQuery('select m.id,m.winnerteamId,t.id,t.name from `match` as m\n' +
            'left join t_tournament_match m2 on m.id = m2.match_id\n' +
            'left join tournament t on m2.tournament_id = t.id\n' +
            'WHERE m.`exists`=1 OR t.`exists`=1\n' +
            'ORDER BY m.id;\n');
    }

    getTeamByMatch() {
        return this.getQuery('select m.id,m.winnerteamId,t.id,t.name from `match` as m\n' +
            'left join t_team_match m2 on m.id = m2.match_id\n' +
            'left join team t on m2.team_id = t.id\n' +
            'WHERE m.`exists`=1 OR t.`exists`=1\n' +
            'ORDER BY m.id;');
    }
}

module.exports = DBManagerMatch;