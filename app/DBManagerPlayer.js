const DBM = require('./DBManager.js');

class DBManagerPlayer extends DBM {
    createPlayer(playername) {
        return this.getQuery('INSERT INTO player(`name`,`exists`) VALUES(?,1)', [playername]);
    }

    deletePlayerById(id) {
        return this.getQuery('UPDATE player SET `exists`=0 WHERE `id`=?', [id]);
    }

    editPlayernameById(newPlayername, id) {
        return this.getQuery('UPDATE player SET name =? WHERE id=?', [newPlayername, id]);
    }

    getPlayerById(id) {
        return this.getQuery('SELECT * FROM player WHERE id= ?', [id]);
    }

    getAllExistingPlayers() {
        return this.getQuery('SELECT * FROM player WHERE `exists`=1');
    }

    ///
    addPlayertoTeam(teamid, playerid) {
        return this.getQuery('INSERT INTO t_team_player(`team_id`,`player_id`) VALUES(?,?)', [teamid, playerid]);
    }

    getTeambyPlayer() {
        return this.getQuery('select p.id,p.name,t.id,t.name from player as p\n' +
            'left join t_team_player ttp on p.id = ttp.player_id\n' +
            'left join team t on ttp.team_id = t.id\n' +
            'ORDER BY p.id;\n');
    }
}


module.exports = DBManagerPlayer;