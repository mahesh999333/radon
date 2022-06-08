const bookModel = require('../models/bookModel')
const authorModel = require('../models/authorModel') 



// Write create APIs for both books and authors ---> If author_id is not available then do not accept the entry(in neither the author collection nor the books collection)

let createAuthor = async(req,res)=>{
    let data = req.body
    let saveData = await authorModel.create(data)
    res.send({msg:saveData})
}

let createBook = async(req,res)=>{
    let data = req.body
    let saveData = await bookModel.create(data)
    res.send({msg:saveData})

}


// List out the books written by "Chetan Bhagat" ( this will need 2 DB queries one after another- first query will find the author_id for "Chetan Bhagat”. Then next query will get the list of books with that author_id )

let getBookByChetanBhagat = async(req,res)=>{
    let data = await authorModel.find({author_name:"Chetan Bhagat"}).select("author_id")
    let bookData = await bookModel.find({author_id:data[0].author_id})
    res.send({msg : bookData})
}


// find the author of “Two states” and update the book price to 100;  Send back the author_name and updated price in response.  ( This will also need 2  queries- 1st will be a findOneAndUpdate. The second will be a find query aith author_id from previous query)

let authorOfBook = async(req,res)=>{
    let data = await bookModel.findOneAndUpdate({name:"Two states"},{$set:{price:100}},{new:true})
    let authorData = await authorModel.find({author_id:data.author_id}).select("author_name")
    let price = data.price
    res.send({msg: authorData, price})
}


// Find the books which costs between 50-100(50,100 inclusive) and respond back with the author names of respective books.. 
let bookPrice = async(req,res)=>{
    let saveData = await bookModel.find({price:{$gte:50,$lte:100}}).select("author_id")
    let id = saveData.map(x=>x.author_id)
    let temp=[]
    for(let i=0;i<id.length;i++){
        const a=id[i]
        let author=await authorModel.find({author_id:a},{author_name:1, _id:0})
        temp.push(author)
    }
    const authorName=temp

    res.send({msg: authorName})
}



module.exports.createAuthor = createAuthor
module.exports.createBook = createBook
module.exports.getBookByChetanBhagat = getBookByChetanBhagat
module.exports.authorOfBook = authorOfBook
module.exports.bookPrice = bookPrice
