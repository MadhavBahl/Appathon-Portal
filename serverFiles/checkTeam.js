const {mongoose} = require('./mongoose');
const {Team} = require('./teamSchema');

const checkTeam = (num, find) => {
    Team.find({teamNum: num}, (err, docs) => {
        if (err) {
            return console.log(err);
            find(false);
        } else if (docs[0]) {
            find(true);
        } else {
            find(false);
        }
    });
};

module.exports = {checkTeam};