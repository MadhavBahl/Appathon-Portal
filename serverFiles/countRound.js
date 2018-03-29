var {mongoose} = require('./mongoose');
var {Round} = require('./part2schema');

var countRound = (callback) => {
    Round.count({}, (err, count) => {
        if (err) {
            callback(err);
        }
        console.log('Number of entries: ', count);
        callback(undefined, count);
    });
};

module.exports = {countRound};