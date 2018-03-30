var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roundSchema = new Schema({
    teamNum: {
        type: Number,
        required: true
    }, reviewOne: {
        type: Number,
        required: false,
        default: 0
    }, reviewTwo: {
        type: Number,
        required: false
    }, reviewThree: {
        type: Number,
        required: false
    }, participant: {
        type: Array,
        required: true,
        trim: true
    }, email: {
        type: String,
        required: true,
        trim: true
    }, track: {
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
    }, done: {
        type: Boolean,
        required: false,
        default: false
    }, comments: {
        type: String,
        required: false,
        trim: true
    }
});

var Round = mongoose.model('Round', roundSchema);

module.exports = {Round};