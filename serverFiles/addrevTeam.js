var {mongoose} = require('./mongoose');
var {Part} = require('./partSchema');

var addRevTeam = (teamDoc, callback) => {
    var team = new Part(teamDoc);
    team.save().then((doc) => {
        console.log(doc);
        return callback(undefined, doc);
    }, (e) => {
        return callback(e);
    });
};

module.exports = {addRevTeam};