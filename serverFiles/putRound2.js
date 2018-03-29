const {mongoose} = require('./mongoose');
const {Round} = require('./part2schema');

const putRound2 = (teamNum, callback) => {
    
        Round.update({ teamNum: teamNum }, { $set: {
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

module.exports = {putRound2};