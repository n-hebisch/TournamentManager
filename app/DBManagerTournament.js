const DBM = require('./DBManager.js');

class DBManagerTournament extends DBM {
    createTournament(tournamentname) {
        return this.getQuery('INSERT INTO tournament(`name`,`exists`) VALUES(?,1)', [tournamentname]);
    }

    deleteTournamentById(id) {
        return this.getQuery('UPDATE tournament SET `exists`=0 WHERE `id`=?', [id]);
    }

    editTournamentById(newTournamentname, id) {
        return this.getQuery('UPDATE tournament SET name =? WHERE id=?', [newTournamentname, id]);
    }

    getTournamentById(id) {
        return this.getQuery('SELECT * FROM tournament WHERE id= ?', [id]);
    }

    getAllExistingTournaments() {
        return this.getQuery('SELECT * FROM tournament WHERE `exists`=1');
    }

    ///
    addMatchtoTournament(tournamentid, matchid) {
        return this.getQuery('INSERT INTO t_tournament_match(`tournament_id`,`match_id`) VALUES(?,?)', [tournamentid, matchid]);
    }

    addTeamtoTournament(teamid, tournamentid) {
        return this.getQuery('INSERT INTO t_team_tournament(`team_id`,`tournament_id`) VALUES(?,?)', [teamid, tournamentid]);
    }

    deleteTeamFromTournament(teamid, tournamentid){
        return this.getQuery('DELETE FROM t_team_tournament WHERE `team_id`=? AND `tournament_id`=?',[teamid, tournamentid]);
    }
    getMatchByTournament() {
        return this.getQuery('select t.id,t.name,m.id,m.winnerteamId from tournament as t\n' +
            'left join t_tournament_match t2 on t.id = t2.tournament_id\n' +
            'left join `match` m on t2.match_id = m.id\n' +
            'WHERE t.`exists`=1 OR m.`exists`=1\n' +
            'ORDER BY t.id;')
    }

    //returns one Tournament with Teams
    getTeamsByTournament(id) {
        return this.getQuery('    select t3.id as id,t3.name as name from tournament as t\n' +
            '                        left join t_team_tournament t2 on t.id = t2.tournament_id\n' +
            '                        left join team t3 on t2.team_id = t3.id\n' +
            '                        WHERE (t.`exists`=1 OR t3.`exists`=1) AND (t3.id IS NOT NULL OR t3.name IS NOT NULL) AND t.id=?\n' +
            '                        ORDER BY t.id;',[id])
    }
   getTeamsThatAreNotInTournament(id){
       return this.getQuery('select team.id,team.name\n' +
           'from team\n' +
           '  left join t_team_tournament ttt on team.id = ttt.team_id\n' +
           'where (ttt.tournament_id <> ? or ttt.tournament_id is null)\n' +
           '      and team.id not in (select sub.team_id\n' +
           '                          from t_team_tournament sub\n' +
           '                          where sub.tournament_id = ?)\n' +
           '\n' +
           'group by team.id;',[id,id])
   }
}


module.exports = DBManagerTournament;