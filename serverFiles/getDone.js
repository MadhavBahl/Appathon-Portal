const {mongoose} = require('./mongoose');
const {Team} = require('./teamSchema');

const getDone = (judge, callback) => {
    Team.find({ }, (err, docs) => {
        if (err) {
            return console.log(err);
            callback(err);
        } 
        // callback(undefined, docs);
        var retObj = {};
        for(let i=0;i<20;i++) {
            if (judge == 1) {
                retObj[`done${i+1}`] = docs[i].done1;
            } else if (judge == 2) {
                retObj[`done${i+1}`] = docs[i].done2;
            } else if (judge == 3) {
                retObj[`done${i+1}`] = docs[i].done3;
            }
        }

        console.log(retObj);
        callback(undefined, retObj);
    });
};

module.exports = {getDone};