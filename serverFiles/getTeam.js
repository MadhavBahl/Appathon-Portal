const {mongoose} = require('./mongoose');
const {Team} = require('./teamSchema');

const getTeam = (team, callback) => {
    Team.find({ teamNum: team }, (err, docs) => {
        if (err) {
            return console.log(err);
            callback(err);
        } 
        callback(undefined, docs);
    });
};

module.exports = {getTeam};