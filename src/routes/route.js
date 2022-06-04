const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')
const myMovies = require('../movies/movies.js');
const res = require('express/lib/response');

const router = express.Router();

router.get('/test-me', function (req, res) {
    myHelper.printDate()
    myHelper.getCurrentMonth()
    myHelper.getCohortData()
    let firstElement = underscore.first(['Sabiha','Akash','Pritesh'])
    console.log('The first element received from underscope function is '+firstElement)
    res.send('My first ever api!')
});

router.get('/hello', function (req, res) {
   
    res.send('Hello there!')
});

router.get('/candidates', function(req, res){
    console.log('Query paramters for this request are '+JSON.stringify(req.query))
    let gender = req.query.gender
    let state = req.query.state
    let district = req.query.district
    console.log('State is '+state)
    console.log('Gender is '+gender)
    console.log('District is '+district)
    let candidates = ['Akash','Suman']
    res.send(candidates)
})

router.get('/candidates/:canidatesName', function(req, res){
    console.log('The request objects is '+ JSON.stringify(req.params))
    console.log('Candidates name is '+req.params.canidatesName)
    res.send('Done')
})
// Question:1
router.get('/GET/movies', function(req,res){
    const m = console.log("Here is the best movies to watch " +myMovies.movies)
    res.send("Movies")
})

//Question: 2
router.get('/GET/movie/:indexNumber', function(req,res){
    
    const value = req.params.indexNumber
    const movies = ['Shutter Iseland', 'Inception', 'Pirates Of Carebian', 'Avenger', 'Lord Of The Rings']
    res.send(movies[value])
})

// Question: 3
router.get('GET/movie/:indexNumber2', function(req, res){
    const value = req.params.indexNumber2
    const movies = ['Shutter Iseland', 'Inception', 'Pirates Of Carebian', 'Avenger', 'Lord Of The Rings']

    if(value<movies.length){
        res.send(movies[value])
    }else{
        res.send("IndexNumber does not exist.")
    }
    
})

// Question: 4
router.get('/GET/films', function(req,res){
    const film = [
        {"id":1, "name":"The Shining"},
        {"id":2, "name":'Incendies'},
        {"id":3, "name":"Inception"},
        {"id":4, "name":"Avengers"}

    ]
       res.send(film)
})

// Quetion: 5
router.get('/GET/films/:filmId', function(req, res){
    const value = req.params.filmId
    const film = [
        {"id":1, "name":"The Shining"},
        {"id":2, "name":'Incendies'},
        {"id":3, "name":"Inception"},
        {"id":4, "name":"Avengers"}
    ]
    for (i=0;i<value; i++){
        if(value<film.length){
            return res.send(film[value - 1])
        }else if(value==0){
            return res.send('Please enter filmId above 0')
        }
        else{
            res.send("There is no such movie.")
        }
    }
    
})
module.exports = router;
// adding this comment for no reason