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
    }, name: {
        type: Array,
        required: true,
        trim: true
    }, rollNo: {
        type: Array,
        required: true
    }, email: {
        type: String,
        required: true,
        trim: true
    }, teamName: {
        type: String,
        required: true,
        trim: true
    }, productName: {
        type: String,
        required: true,
        trim: true
    }, description: {
        type: String,
        required: true
    }, links: {
        type: String,
        required: false   
    }
});

var Team = mongoose.model('Team', teamSchema);

module.exports = {Participant};