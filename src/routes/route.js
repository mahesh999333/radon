const express = require('express');
const lodashModule = require('lodash');
const externalModule = require('../logger/logger')
const helperModule = require("../util/helper.js")
const formatterModule = require("../validator/formatter.js")
const router = express.Router();

router.get('/test-me', function (req, res) {
    externalModule.log()
    console.log("todays date (dd/mm) - "+helperModule.dd()+"/"+helperModule.mm())
    helperModule.batchInfo()
    console.log("this is trim - "+formatterModule.trim)
    formatterModule.lower()
    formatterModule.upper()
    res.send('My first ever api!')
});

router.get('/hello',function(req,res){
   

    let monthNames = ['JAN','FEB','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPT','OCT','NOV','DEC']
    let _= require("lodash");
    console.log(_.chunk(monthNames,3))  // _.chunk function helps in diving an array into multiple equal subarray.
    res.send('loadash installed')
    
    
    let array =[1,3,5,7,9,11,13,15,17,19.]
    
     
     let newArray = _.tail(array); // _.tail function will remove all elements except first element.
      
     console.log(newArray);
    
    let array1=[1,2,3,4,5]
    let array2=[1,3,4,6,7]
    let array3=[1,3,6,7,9]
    let array4=[3,4,6,7,9]
    let array5=[1,3,6,7,9]
    
    console.log(_.union(array1,array2,array3,array4,array5))  // _.union function helps in merging the arrays into one without repeating the elements.
    
    let movie= [['horror','The Shining'],['drama','Titanic'],['thriller','Shutter Island'],['fantasy','fans Labyrinth']]
    console.log(_.fromPairs(movie))   //this method returns an object composed from key-value pairs
})



module.exports = router;
// adding this comment for no reason