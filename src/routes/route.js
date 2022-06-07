const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")
//const bookController = require("../controllers/AssgbookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

// router.post("/createUser", UserController.createUser  )

// router.get("/getUsersData", UserController.getUsersData)



// router.get("/getBooksData", BookController.getBooksData)



//router.post('/bookCreate', bookController.createBook)
//router.get('/bookList', bookController.bookList)



router.post("/createBook", BookController.createBook  )
router.get("/bookList", BookController.bookList  )
router.get("/booksInYear", BookController.getBooksInYear )
router.get('/getParticularBooks', BookController.getParticularBooks)
router.get('/getXINRBooks', BookController.getXINRBooks)
router.get('/getRandomBooks', BookController.getRandomBooks)
module.exports = router;