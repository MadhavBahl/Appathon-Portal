const {mongoose} = require('./mongoose');
const {Round} = require('./part2schema');

const deleteAllRound = (callback) => {
    Round.remove({}, (err) => {
        if (err) {
            return console.log(err);
            callback(err);
        } 
        callback(undefined);
    });
};

module.exports = {deleteAllRound};