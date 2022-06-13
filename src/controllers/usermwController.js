const UserModel= require("../models/userModel")


// Write a POST api to create a user that takes user details from the request body. If the header isFreeAppUser is not present terminate the request response cycle with an error message that the request is missing a mandatory header

const createUser = async(req, res)=>{
    let data = req.body
    let saveData = await UserModel.create(data)
    res.send({msg: saveData})

}

module.exports.createUser=createUser