var {mongoose} = require('./mongoose');
var {Round} = require('./part2schema');

var addRoundTeam = (teamDoc, callback) => {
    var team = new Round(teamDoc);
    team.save().then((doc) => {
        console.log(doc);
        return callback(undefined, doc);
    }, (e) => {
        return callback(e);
    });
};

module.exports = {addRoundTeam};