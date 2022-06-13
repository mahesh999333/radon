const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    name:{
        type:String
    },
    balance:{
        type:Number,
        default:100
    },
    address:{
        type:String
    },
    age:{
        type:String
    },
    gender:{
        type:String,
        enum:["male", "female", "other"]
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema) //users









// const userSchema = new mongoose.Schema( {
//     firstName: String,
//     lastName: String,
//     mobile: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     emailId: String,
//     gender: {
//         type: String,
//         enum: ["male", "female", "LGBTQ"] //"falana" will give an error
//     },
//     age: Number,
//     // isIndian: Boolean,
//     // parentsInfo: {
//     //     motherName: String,
//     //     fatherName: String,
//     //     siblingName: String
//     // },
//     // cars: [ String  ]
// }, { timestamps: true });

// String, Number
// Boolean, Object/json, array