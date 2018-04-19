const DBM = require('./DBManager.js');

class DBManagerMatch extends DBM {
    createMatch() {
        return this.getQuery('INSERT INTO `match`(`name`,`exists`) VALUES(?,1)', [playername]);
    }

}


module.exports = DBManagerMatch;