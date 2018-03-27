const {mongoose} = require('./mongoose');
const {Part} = require('./partSchema');

const getRevTeams = (callback) => {
    Part.find({}, (err, docs) => {
        if (err) {
            return console.log(err);
            callback(err);
        } 
        callback(undefined, docs);
    });
};

module.exports = {getRevTeams};