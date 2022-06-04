const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController");
const bookModel = require('../book/bookModel.js');
const BookController = require('../controllers/bookController.js');
const { route } = require('express/lib/router');

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", UserController.createUser  )

router.get("/getUsersData", UserController.getUsersData)

router.post("/created", async function (req,res){
    let data = req.body
    let saveData = await UserModel.create(data)
    res.send({msg:saveData})
})

router.post('/createBook', BookController.createBook)

router.get("/getBookData", BookController.getBookData)

router.post('/creatBook', Book )

module.exports = router;