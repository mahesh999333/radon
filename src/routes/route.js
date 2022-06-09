const express = require('express');
const router = express.Router();

// const authorController= require("../controllers/authorController")
// const bookController= require("../controllers/bookController")

const populateController = require('../controllers/populate-reference')


router.post('/createAuthor', populateController.createAuthor)

router.post('/createPublisher', populateController.createPublisher)

router.post('/createBook', populateController.createBook)

router.get('/getBooks', populateController.getBooks)

router.put('/addBoolean', populateController.addBoolean)


router.put('/bookRatings', populateController.bookRatings)
















// router.get("/test-me", function (req, res) {
//     res.send("My first ever api!")
// })

// router.post("/createAuthor", authorController.createAuthor  )

// router.get("/getAuthorsData", authorController.getAuthorsData)

// router.post("/createBook", bookController.createBook  )

// router.get("/getBooksData", bookController.getBooksData)

// router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)

module.exports = router;