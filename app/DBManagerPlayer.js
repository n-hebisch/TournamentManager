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

}


module.exports = DBManagerPlayer;