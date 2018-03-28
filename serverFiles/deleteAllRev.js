const {mongoose} = require('./mongoose');
const {Part} = require('./partSchema');

const deleteAllRev = (callback) => {
    Part.remove({}, (err) => {
        if (err) {
            return console.log(err);
            callback(err);
        } 
        callback(undefined);
    });
};

module.exports = {deleteAllRev};