const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const middleware = require('../middleware/auth-1')

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/getProfile/:userId",middleware.auth,middleware.auth2 , userController.getUserProfile)

router.put("/users/:userId",middleware.auth ,middleware.auth2 , userController.updateUser)

router.delete("/deleteUser/:userId",middleware.auth, middleware.auth2 , userController.deleteUser)

router.post('/post/:userId',middleware.auth, middleware.auth2, userController.post)


module.exports = router;