var {mongoose} = require('./mongoose');
var {Part} = require('./partSchema');

var countRev = (callback) => {
    Part.count({}, (err, count) => {
        if (err) {
            callback(err);
        }
        console.log('Number of entries: ', count);
        callback(undefined, count);
    });
};

module.exports = {countRev};