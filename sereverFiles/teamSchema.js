var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
    teamNum: {
        type: Number,
        required: true
    }, judgeOne: {
        type: Object,
        required: false
    }, judgeTwo: {
        type: Object,
        required: false
    }, judgeThree: {
        type: Object,
        required: false
    }
});

var Team = mongoose.model('Team', teamSchema);

module.exports = {Participant};