var {mongoose} = require('./mongoose');
var {Team} = require('./teamSchema');

var countFinal = (callback) => {
    Team.count({}, (err, count) => {
        if (err) {
            callback(err);
        }
        console.log('Number of entries: ', count);
        callback(undefined, count);
    });
};

module.exports = {countFinal};