// require mongoose
var mongoose = require('mongoose');

// create Schema variable, to be used for referenced models (sub-models)
var Schema = mongoose.Schema;

// create schema
var CodSchema = new mongoose.Schema({
    colorCode: {type:String, required: true},
    colorName: {type: String, required: true},
    userName: {type: String }
}, {timestamps: true})

// instantiate schema with mongoose
mongoose.model('Cod', CodSchema);
