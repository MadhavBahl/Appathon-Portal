const {mongoose} = require('./mongoose');
const {Part} = require('./partSchema');

const checkR1 = (teamNum, callback) => {
    Part.find({ teamNum }, (err, docs) => {
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

module.exports = {checkR1};