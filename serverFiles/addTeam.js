var {mongoose} = require('./mongoose');
var {Team} = require('./teamSchema');

var addTeam = (teamDoc, callback) => {
    var team = new Team(teamDoc);
    team.save().then((doc) => {
        console.log(doc);
        return callback(undefined, doc);
    }, (e) => {
        return callback(e);
    });
};

module.exports = {addTeam};