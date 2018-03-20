var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var partSchema = new Schema({
    name: {
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

var Participant = mongoose.model('Participant', partSchema);

module.exports = {Participant};