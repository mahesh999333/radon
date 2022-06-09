const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
   
    author_name: {type:String},
    age:{type:Number},
    address:{type:String},
    ratings : {type:Number}

}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema)
