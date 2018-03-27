var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var partSchema = new Schema({
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
        trim: true
    }, comments2: {
        type: String,
        required: false,
        trim: true
    }, comments3: {
        type: String,
        required: false,
        trim: true
    }
});

var Part = mongoose.model('Part', partSchema);

module.exports = {Part};