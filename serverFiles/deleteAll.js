const {mongoose} = require('./mongoose');
const {Team} = require('./teamSchema');

const deleteAll = (callback) => {
    Team.remove({}, (err) => {
        if (err) {
            return console.log(err);
            callback(err);
        } 
        callback(undefined);
    });
};

module.exports = {deleteAll};