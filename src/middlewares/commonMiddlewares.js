const orderModel= require("../models/orderModel")

const productModel= require("../models/productModel")
const userModel = require("../models/userModel")
// const mid1= function ( req, res, next) {
//     req.falana= "hi there. i am adding something new to the req object"
//     console.log("Hi I am a middleware named Mid1")
//     next()
// }

// const mid2= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid2")
//     next()
// }

// const mid3= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid3")
//     next()
// }

// const mid4= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid4")
//     next()
// }


// Write a POST api for order purchase that takes a userId and a productId in request body. If the header isFreeAppUser is not present terminate the request response cycle with an error message that the request is missing a mandatory header If the header is present the control goes to the request handler.
const mid1 = function(req, res, next){
    const header=req.headers.isfreeappuser
    if(!header){
        return res.send({Error: "isfreeappuser is not present"})
    }
    next()
}


// Perform the user and product validation. Check if the user exists as well as whether the product exists. Return an error with a suitable error message if either of these validations fail For every purchase we save an order document in the orders collection.
const mid2 = async  function(req, res, next){
    let data = req.body
    let isProduct= await productModel.findOne({_id:data.productId});
    let isUser = await userModel.findOne({_id:data.userId});


    if(isProduct && isUser){
       next()
        
    }else if(!isProduct || !isUser){
        return res.send("please provide product id and user id")
    }

    
}


// If the isFreeAppUser header is true then the balance of the user is not deducted and the amount in order is set to 0 as well the attribute in order isFreeAppUser is set to true. If this header has a false value then the product’s price is checked. This value is deducted from the user’s balance and the order amount is set to the product’s price as well as the attrbiute isFreeAppUser is set to false in order document.
const mid3 = async function(req, res, next){
    let data = req.body
    let head=req.headers.isfreeappuser
    let isProduct= await productModel.findOne({_id:data.productId});
    let isUser = await userModel.findOne({_id:data.userId});
    console.log(typeof head)
    if(head!=="false"){
        next()
    }else{
        if(isProduct.price<isUser.balance){
        const valueUpd = isUser.balance-isProduct.price
        const blncOfUser=await userModel.findOneAndUpdate({_id:data.userId},{$set:{balance:valueUpd}},{new:true})
        return res.send(blncOfUser)
        }else{
            return res.send("balance is not enough")
        }
    }
}



// module.exports.mid1= mid1
// module.exports.mid2= mid2
// module.exports.mid3= mid3
module.exports.mid1= mid1
module.exports.mid2= mid2
module.exports.mid3= mid3