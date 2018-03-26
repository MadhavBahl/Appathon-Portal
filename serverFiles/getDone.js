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
        var retArr = [];

        for(let i=0;i<20;i++) {
            if (judge == 1) {
                let team = {};
                team[`num`] = i+1;
                team[`id`] = `btn${i+1}`;
                team[`teamName`] = docs[i].teamName;
                team[`done`] = docs[i].done1;
                team['judge'] = 1;
                retArr.push(team);
                // retObj[`team${i+1}`] = team;
            } else if (judge == 2) {
                let team = {};
                team[`num`] = i+1;
                team[`id`] = `btn${i+1}`;
                team[`teamName`] = docs[i].teamName;
                team[`done`] = docs[i].done2;
                team['judge'] = 2;
                retArr.push(team);
            } else if (judge == 3) {
                let team = {};
                team[`num`] = i+1;
                team[`id`] = `btn${i+1}`;
                team[`teamName`] = docs[i].teamName;
                team[`done`] = docs[i].done3;
                team['judge'] = 3;
                retArr.push(team);
            }
        }
        retObj.team = retArr;

        
        callback(undefined, retObj);
    });
};

module.exports = {getDone};