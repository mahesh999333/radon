const jwt = require("jsonwebtoken");

//Authentication
const auth = function(req, res, next){
    let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];

  if (!token) return res.send({ status: false, msg: "token must be present" });//If no token is present in the request header return error

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

//Authorization
const auth2 = function(req, res, next){
    let token = req.headers["x-auth-token"];
    let decodedToken = jwt.verify(token, "functionup-radon");
  
    //userId from which the request is made. In this case message to be posted.
    let userToBeModified = req.params.userId
    
    //userId for the logged-in user
    let userLoggedIn = decodedToken.userId

    //userId comparision to check if the logged-in user is requesting for their own data
    if(userToBeModified != userLoggedIn) return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})
    //return the updated user document

    next()
}


module.exports.auth = auth
module.exports.auth2 = auth2