const {mongoose} = require('./mongoose');
const {Team} = require('./teamSchema');

const getAllTeams = (callback) => {
    Team.find({}, (err, docs) => {
        if (err) {
            return console.log(err);
            callback(err);
        } 
        callback(undefined, docs);
    });
};

module.exports = {getAllTeams};