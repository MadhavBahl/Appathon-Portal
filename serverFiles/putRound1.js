const {mongoose} = require('./mongoose');
const {Part} = require('./partSchema');

const putRound1 = (teamNum, callback) => {
    
        Part.update({ teamNum: teamNum }, { $set: {
            // judgeOne: updateData.marks,
            // comments1: updateData.comments,
            done: true
        }}, {upsert: true}, (err, docs) => {
            if (err) {
                return console.log(err);
                callback(err);
            } 
            console.log(docs);
            callback(undefined, docs);
        });   
    
};

module.exports = {putRound1};