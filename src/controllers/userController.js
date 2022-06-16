const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// Write a POST api /users to register a user from the user details in request body.
//You can name the req, res objects anything.
//but the first parameter is always the request 
//the second parameter is always the response
const createUser = async function (abcd, xyz) {
  try {
    let data = abcd.body;
    if (Object.keys(data).length === 0) {  // if the req.body is empty
      return xyz.status(400).send({ msg: "Error", error: "Body Can not be empty" }) // 204 for no content
    }
    if (!data.mobile) {
      return xyz.status(400).send({ msg: "Error", error: "Mobile is required" })
    }
    let savedData = await userModel.create(data);
    //console.log(abcd.newAtribute);
    xyz.status(201).send({ msg: savedData });
  }
  catch (err) {
    xyz.status(500).send({ msg: "Error", error: err.massage })
  }
};


// Write a *POST api /login to login a user that takes user details - email and password from the request body. If the credentials don't match with any user's data return a suitable error. On successful login, generate a JWT token and return it in response body. 

const loginUser = async function (req, res) {
  try {
    let userName = req.body.emailId;
    let password = req.body.password;

    let user = await userModel.findOne({ emailId: userName, password: password });
    if (!user)
      return res.status(400).send({
        status: false,
        msg: "username or the password is not corerct",
      });

    // Once the login is successful, create the jwt token with sign function
    // Sign function has 2 inputs:
    // Input 1 is the payload or the object containing data to be set in token
    // The decision about what data to put in token depends on the business requirement
    // Input 2 is the secret
    // The same secret will be used to decode tokens
    let token = jwt.sign(
      {
        userId: user._id.toString(), //payload
        batch: "radon",
        organisation: "FunctionUp",
      },
      "functionup-radon" // secret key
    );
    res.setHeader("x-auth-token", token);     //sending toke in response header
    res.send({ status: true, token: token });
  }
  catch (err) {
    res.status(500).send({ msg: "Error", err: err.massage })
  }
};




// Write a GET api /users/:userId to fetch user details. Pass the userId as path param in the url. Check that request must contain x-auth-token header. If absent, return a suitable error. If present, check that the token is valid.
const getUserProfile = async function (req, res) {
  try {
    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId)
    res.status(200).send({ status: true, data: userDetails });
  }
  catch (err) {
    res.status(500).send({ msg: "Error", err: err.massage })
  }
};



// Write a PUT api /users/:userId to update user details. Pass the userId as path param in the url and update the attributes received in the request body. Check that request must contain x-auth-token header. If absent, return a suitable error.
// Do the same steps here:
// Check if the token is present
// Check if the token present is a valid token
// Return a different error message in both these cases
//Updating User Details
const updateUser = async function (req, res) {
  try {
    let userId = req.params.userId;
    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData, { new: true });
    res.status(202).send({ status: "updated", data: updatedUser });
  }
  catch (err) {
    res.status(500).send({ msg: "Error", err: err.massage })
  }
};


// Write a DELETE api /users/:userId that takes the userId in the path params and marks the isDeleted attribute for a user as true. Check that request must contain x-auth-token header. If absent, return a suitable error.
//Deleting User
const deleteUser = async function (req, res) {
  try {
    let userId = req.params.userId
    let user = await userModel.findById(userId)

    if (!userId) return res.status(400).send("No such user exist.")

    let userDelete = await userModel.findOneAndUpdate({ _id: userId }, { $set: { isDelete: true } }, { new: true })
    res.status(200).send({ deletedUser: userDelete })
  }
  catch (err) {
    res.status(500).send({ msg: "Error", err: err.massage })
  }

}


// Adding Post
const post = async function (req, res) {
  try{
  let data = req.body.massage
  let user = await userModel.findById(req.params.userId)
  let uploadPost = user.posts
  uploadPost.push(data)
  let updatedData = await userModel.findOneAndUpdate({ _id: user._id }, { posts: uploadPost }, { new: true })
  res.status(200).send({ status: true, data: updatedData })
  }
  catch (err) {
    res.status(500).send({ msg: "Error", err: err.massage })
  }

}


module.exports.createUser = createUser;
module.exports.getUserProfile = getUserProfile;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
module.exports.post = post