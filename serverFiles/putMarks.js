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
    } else if (judge == 2) {
        Team.update({ teamNum: updateData.team }, { $set: {
            judgeTwo: updateData.marks,
            comments2: updateData.comments,
            done2: true
        }}, {upsert: true}, (err, docs) => {
            if (err) {
                return console.log(err);
                callback(err);
            } 
            console.log(docs);
            callback(undefined, docs);
        });
    } else if (judge == 3) {
        Team.update({ teamNum: updateData.team }, { $set: {
            judgeThree: updateData.marks,
            comments3: updateData.comments,
            done3: true
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