const {mongoose} = require('./mongoose');
const {Part} = require('./partSchema');

const getRevSelected = (teamNum, callback) => {
    Part.find({teamNum}, (err, docs) => {
        if (err) {
            return console.log(err);
            callback(err);
        } 
        callback(undefined, docs);
    });
};

module.exports = {getRevSelected};