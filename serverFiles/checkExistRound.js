const {mongoose} = require('./mongoose');
const {Round} = require('./part2schema');

const checkR2 = (teamNum, callback) => {
    Round.find({ teamNum }, (err, docs) => {
        if (err) {
            return console.log(err);
            callback(false);
        } else if (docs[0]) {
            callback(true);
        } else {
            callback(false);
        }
    });
};

module.exports = {checkR2};