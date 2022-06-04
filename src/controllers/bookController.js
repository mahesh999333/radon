const bookModel = require('../book/bookModel.js');

const createBook = async function(req,res){
    const data = req.body
    const savedBook = await bookModel.create(data)
    res.send({msg: savedbook})
}

const getBookData = async function(req,res){
    const allBooks = await bookModel.find()
    res.send({msg: allBooks})

}

module.exports=createBook
module.exports=getBookData