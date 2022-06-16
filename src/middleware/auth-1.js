const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//Authentication
const auth = function (req, res, next) {
  try {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];

    if (!token) return res.status(401).send({ status: false, msg: "token must be present" });//If no token is present in the request header return error

    // If a token is present then decode the token with verify function
    // verify takes two inputs:
    // Input 1 is the token to be decoded
    // Input 2 is the same secret with which the token was generated
    // Check the value of the decoded token yourself
    let decodedToken = jwt.verify(token, "functionup-radon");
    if (!decodedToken)
      return res.send({ status: false, msg: "token is invalid" });

    next()
  }
  catch (err) {
    res.status(500).send({ msg: "Error", error: err.message })
  }
}

//Authorization
const auth2 = async function (req, res, next) {
  try {
    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    if (!userDetails)
      return res.send({ status: false, msg: "No such user exists" });


    let token = req.headers["x-auth-token"];
    let decodedToken = jwt.verify(token, "functionup-radon");

    //userId from which the request is made. In this case message to be posted.
    let userToBeModified = req.params.userId

    //userId for the logged-in user
    let userLoggedIn = decodedToken.userId

    //userId comparision to check if the logged-in user is requesting for their own data
    if (userToBeModified != userLoggedIn) return res.send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })
    //return the updated user document

    next()
  }
  catch (err) {
    console.log(err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  }
}


module.exports.auth = auth
module.exports.auth2 = auth2