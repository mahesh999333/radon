const BookModel= require("../models/bookModel")



//createBook : to create a new entry..use this api to create 11+ entries in your collection
const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

//bookList : gives all the books- their bookName and authorName only 
const bookList= async function (req, res) {
    let allBooks = await BookModel.find( ).select( { authorName:1 , bookName:1, _id:0 }  )
    res.send({msg: allBooks})
}

//getBooksInYear: takes year as input in post request and gives list of all books published that year
const getBooksInYear = async function(req, res){
    let year = req.params.key
    let bookYear = await BookModel.find({year:year})

    res.send({msg: bookYear})
}

// getParticularBooks:- (this is a good one, make sincere effort to solve this) take any input and use it as a condition to fetch books that satisfy that condition
// e.g if body had { name: “hi”} then you would fetch the books with this name
// if body had { year: 2020} then you would fetch the books in this year
// hence the condition will differ based on what you input in the request body

const getParticularBooks = async function(req, res){
    let letters = req.params.key
    let books = await BookModel.find({bookName:/^letters/i})
    res.send({msg: books})
}


// getXINRBooks- request to return all books who have an Indian price tag of “100INR” or “200INR” or “500INR” 
const getXINRBooks = async function(req, res){
    let rsbooks = await BookModel.find({$or:[{indianPrice:{$eq:100}},{indianPrice:{$eq:500}}]})
    res.send({msg: rsbooks})
}

//getRandomBooks - returns books that are available in stock or have more than 500 pages
const getRandomBooks = async function(req, res){
    let random = await BookModel.find({$or:[{stockAvailable:true}, {pages:{$gt:500}}]})
    res.send({msg: random})
}
module.exports.createBook= createBook
module.exports.bookList= bookList
module.exports.getBooksInYear= getBooksInYear
module.exports.getParticularBooks=getParticularBooks
module.exports.getXINRBooks= getXINRBooks
module.exports.getRandomBooks= getRandomBooks