const {mongoose} = require('./mongoose');
const {Round} = require('./part2schema');

const getRoundDone = (callback) => {
    Round.find({}, (err, docs) => {
        if (err) {
            return console.log(err);
            callback(err);
        } 
        // callback(undefined, docs);
        var retObj = {};
        var retArr = [];

        for(let i=0;i<docs.length;i++) {
            let team = {};
            team[`num`] = docs[i].teamNum;
            team[`id`] = `btn${i+1}`;
            // team[`teamName`] = docs[i].teamName;
            // team[`done`] = docs[i].done1;
            // team['judge'] = 1;
            team = docs[i];

            retArr.push(team);
            // retObj[`team${i+1}`] = team;

        }
        // retObj.team = retArr;

        
        callback(undefined, retArr);
    });
};

module.exports = {getRoundDone};