const orderModel= require("../models/orderModel")
const productModel= require("../models/productModel")
const userModel = require("../models/userModel")

const createOrder = async function(req, res){
    let data = req.body
    let isProduct= await productModel.findOne({_id:data.productId}).populate('');
    let isUser = await userModel.findOne({_id:data.userId});


    
    res.send("I am a Free App User.")
}



module.exports.createOrder=createOrder