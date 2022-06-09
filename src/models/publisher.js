const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
    name:{type:String},
    headQuarter:{type:String}

}, { timestamps: true })

module.exports = mongoose.model('Publisher', publisherSchema)