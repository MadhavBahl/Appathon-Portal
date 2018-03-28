const {mongoose} = require('./mongoose');
const {Part} = require('./partSchema');

const checkRev = (teamNum, callback) => {
    Part.find({ teamNum }, (err, docs) => {
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

module.exports = {checkRev};