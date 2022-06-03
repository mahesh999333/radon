const req = require("express/lib/request");
const res = require("express/lib/response");

const movies = function() {
    const films = ['Shutter Iseland', 'Inception', 'Pirates Of Carebian']
    console.log(films);
}

const getMovie = ['Shutter Iseland', 'Inception', 'Pirates Of Carebian', 'Avenger', 'Lord Of The Rings']
    

const getMovieByIndex =function(){
    for (i=0; i<getMovie.length; i++){
        if(getMovie[i]>req.params.indexNumber){
            res.send('use a valid index')
        }else{
            res.send('req.params.myMovies.getMovie[indexNumber]')
    
        }
    }
} 


module.exports.movies = movies

module.exports.movies = getMovie