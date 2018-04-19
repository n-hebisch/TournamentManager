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


}


module.exports = DBManagerTeam;