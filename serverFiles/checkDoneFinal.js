const {mongoose} = require('./mongoose');
const {Round} = require('./part2schema');

const checkRF = (teamNum, callback) => {
    Round.find({ teamNum }, (err, docs) => {
        if (err) {
            return console.log(err);
            callback(false);
        } 
        console.log(docs);
        if (docs[0].done === true) {
            console.log(docs);
            callback(true);
        } else {
            callback(false);
        }
    });
};

module.exports = {checkRF};