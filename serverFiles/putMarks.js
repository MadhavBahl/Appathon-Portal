const {mongoose} = require('./mongoose');
const {Team} = require('./teamSchema');

const putMarks = (updateData, judge , callback) => {
    if (judge == 1) {
        Team.update({ teamNum: updateData.team }, { $set: {
            judgeOne: updateData.marks,
            comments1: updateData.comments,
            done1: true
        }}, {upsert: true}, (err, docs) => {
            if (err) {
                return console.log(err);
                callback(err);
            } 
            console.log(docs);
            callback(undefined, docs);
        });
    }
    
};

module.exports = {putMarks};