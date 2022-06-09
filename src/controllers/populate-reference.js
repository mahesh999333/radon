const authorModel = require('../models/authorModel')
const publisherModel = require('../models/publisher')
const bookModel = require('../models/bookModel')

const createAuthor = async(req,res)=>{
    let data = req.body
    let saveData = await authorModel.create(data)
    return res.send({msg: saveData})
}


const createPublisher = async(req,res)=>{
    let data = req.body
    let saveData = await publisherModel.create(data)
    return res.send({msg: saveData})
}

// In this api, you have to write a logic that validates the following :
// The authorId is present in the request body. If absent send an error message that this detail is required
// If present, make sure the authorId is a valid ObjectId in the author collection. If not then send an error message that the author is not present.
// The publisherId is present in the request body. If absent send an error message that this detail is required
// If present, make sure the publisherId is a valid ObjectId in the publisher collection. If not then send an error message that the publisher is not present.

const createBook = async(req,res)=>{
   let book = req.body  // get the data from request body
   let authorId = await authorModel.find().select({_id:1})// get the list of objects contaning author obj_id
   let authorIdArr = authorId.map((obj)=>{return obj._id.toString()}) //get the string from object_id

   let publisheId = await publisherModel.find().select({_id:1})//get the list of objects contaning publisher obj_id
   let publisheIdArr = publisheId.map((obj)=>{return obj._id.toString()})//get the string from object_id

   if(book.author_id!=undefined){//check if u enter the author id or not
    if(book.publisher_id!=undefined){//check if u enter the publisher id or not
        if(authorIdArr.includes(book.publisher_id)){// check wether the author id is in db or not
            if(publisheIdArr.includes(book.publisher_id)){// check wether the publisher id is in db or not
                let bookCreated = await bookModel.create(book)
                return res.send({data: bookCreated})


            }
            return res.send({error: "Invalid Publisher Id"})

        }
        return res.send({data: "Invalid Author Id"})

    }
    return res.send({data: "Missing Publisher Id"})

   }
   return res.send({data: "Missing Author Id"})
}
  
const getBooksData = async(req,res)=>{
    let books = await bookModel.find()
    res.send({msg: books})
}



// 4. Write a GET api that fetches all the books along with their author details (you have to populate for this) as well the publisher details (you have to populate for this) 
const getBooks = async(req,res)=>{
    let allBooks = await bookModel.find().populate("author_id").populate("publisher_id")
    return res.send(allBooks)
}


// a) Add a new boolean attribute in the book schema called isHardCover with a default false value. For the books published by 'Penguin' and 'HarperCollins', update this key to true.
 
const addBoolean = async(req,res)=>{
    let data = await publisherModel.find({name:{$in:["Penguin","HarperCollins"]}}).select({_id:1})
    let idArry = data.map((obj)=>{return obj._id.toString()})
    let up = await bookModel.updateMany({publisher_id:{$in:idArry}},{$set:{isHardCover:true}})
    let upBook = await bookModel.find()
    res.send({msg: upBook})
}


// b) For the books written by authors having a rating greater than 3.5, update the books price by 10 (For eg if old price for such a book is 50, new will be 60)
const bookRatings = async(req,res)=>{
    let data = await authorModel.find({ratings:{$gt:3.5}}).select({_id:1})
    let idArry = data.map((obj)=>{return obj._id.toString()})
    let book = await bookModel.updateMany({author_id:{$in:idArry}},{$inc:{price:+10}})
    return res.send(book)
}


module.exports.createAuthor=createAuthor
module.exports.createPublisher=createPublisher
module.exports.createBook=createBook
module.exports.getBooks=getBooks
module.exports.addBoolean=addBoolean
module.exports.bookRatings=bookRatings