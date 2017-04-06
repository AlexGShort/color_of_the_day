// require mongoose
var mongoose = require('mongoose');

// create Schema variable, to be used for referenced models (sub-models)
var Schema = mongoose.Schema;

// create schema
var FriendSchema = new mongoose.Schema({
    firstname: {type:String, required: true},
    lastname: {type: String, required: true},
    birthday: {type: Date, required: true }
}, {timestamps: true})

// instantiate schema with mongoose
mongoose.model('Friend', FriendSchema);
