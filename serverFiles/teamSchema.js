var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
    teamNum: {
        type: Number,
        required: true
    }, judgeOne: {
        type: Array,
        required: false,
        default: 0
    }, judgeTwo: {
        type: Array,
        required: false,
        default: 0
    }, judgeThree: {
        type: Array,
        required: false,
        default: 0
    }, participant: {
        type: Array,
        required: true,
        trim: true
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
    }, done1: {
        type: Boolean,
        required: false,
        default: false
    }, done2: {
        type: Boolean,
        required: false,
        default: false
    }, done3: {
        type: Boolean,
        required: false,
        default: false
    }, comments1: {
        type: String,
        required: false,
        trim: true,
        default: 'NIL'
    }, comments2: {
        type: String,
        required: false,
        trim: true,
        default: 'NIL'
    }, comments3: {
        type: String,
        required: false,
        trim: true,
        default: 'NIL'
    }, comments: {
        type: String,
        required: false,
        trim: true
    }
});

var Team = mongoose.model('Team', teamSchema);

module.exports = {Team};