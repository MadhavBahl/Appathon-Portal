const {mongoose} = require('./mongoose');
const {Round} = require('./part2schema');

const getRoundSelected = (teamNum, callback) => {
    Round.find({teamNum}, (err, docs) => {
        if (err) {
            return console.log(err);
            callback(err);
        } 
        callback(undefined, docs);
    });
};

module.exports = {getRoundSelected};