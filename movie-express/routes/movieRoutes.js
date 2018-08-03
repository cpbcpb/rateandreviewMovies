//modified tasks
const express = require('express');
const router  = express.Router();
const requestThing=require('request')
const axios=require('axios')
const Comment = require('../models/comment');
const Review = require('../models/review');
const Movie = require('../models/movie')
const omdb = require('omdb-js')
const User = require('../models/user')
let movieId;
let movieObject;
//I want a search route that returns my user generated content tied to the api search results.
//like if they search star it can show starwars and other star movies and under each the number of times my users have reiewed it....
//they can be tied together in angular just by having them display near eachother....
//just have to look at what I have and match it up.  everything should have an imdbid associated



//*****************this route could be used by my angular service
//whenever making a new review or whenever a 
//movie is added to a users wishlist or favorites list
//if I want to have my own collection of these movies
//on my db.  however if my db ever got too big maybe I don't want this.************************

//*this could be used to seed db if added a foreach loop at the beginning and send a (req.body.list) with
//list being a list or array of titles.....
//**!!!!!!probably want to switch this to using imdbID so will be more prcisee!!!!*****
router.post('/makeoneMovie', (req, res, next)=>{
    console.log("start of the post route to save movie");
    const oneMovie=req.body.title
    Movie.find({'objectFromOMDB.Title': oneMovie}) 
    .then(responseFromDB => {
        console.log("first then of the post route to save movie", responseFromDB);
        if(responseFromDB !== null && responseFromDB !== undefined && responseFromDB.length !== 0) {
            console.log("the if statement of the post route to save movie");
            res.status(304).json({message: "movie already exists in your DataBase"})
            return;
        }
        else {
            console.log("the else statement of the post route to save movie")
            axios.get('http://www.omdbapi.com/', {
              params: {
                  apikey: process.env.apikey,
                  t: oneMovie
                  } 
              })
            .then((thing)=>{
                console.log("second then of the post route to save movie");
                  //I added this innerList thing to be able to see which
                  //movies on my list failed to be added.
                  setTimeout(function() {
                  const newMovie = new Movie({
                    objectFromOMDB: thing.data,
                    imdbID: thing.data.imdbID,
                })
                    newMovie.save((err)=>{
                        if (err) {
                            console.log("something went awry");
                            return
                        }
                    });
                    console.log("after saving movie of the post route to save movie");
                    res.status(200).json({message: "new movie ha been added to DataBase", newMovie})
                }, 1200)
            })
            .catch((err)=>{
                (console.log(err))
            });
            console.log("nothing worked in the post route to save movie");
        }
        // res.status(200).json({message: "movie alread in DataBase"})
    });
})
        
//this finds one movie from api by imdbid...which with my own db probably wont need to do but good to have it.  
//
router.get('/search', (req, res, next)=>{
    axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: process.env.apikey,
            i: 'tt0266697'
            }
        })
    .then((thing)=>{
        res.send(thing.data);
    })
    .catch((err)=>{
        (res.status(404).json(err))});
    });

//supersearch returns the movie and reviews.....//this finds one movie from api by imdbid...which with my own db probably wont need to do but good to have it.  
//should change this so that it instead does a broad search with multiple results and then 
    router.get('/supersearch', (req, res, next)=>{
        
        axios.get('http://www.omdbapi.com/', {
            params: {
                apikey: process.env.apikey,
                i: 'tt0266697'
                }
            })
        .then(thing=>{
            Review.find({movie: thing.data.imdbID})
            .then(movieReviews=>{
                theData={
                    movie: thing.data,
                    reviews: movieReviews
                }
                res.json(theData)
            })
            .catch((err)=>{
                (res.status(404).res.json(err));
            })
        })
        .catch((err)=>{
            (res.status(404).json(err))
        });
        });




// router.get('/killbill', (req, res, next)=>{
// http.get(`www.omdbapi.com/?apikey=${process.env.apikey}&i=tt0266697`)
//   .then((movie) => {
//     res.json(movie)
//   })
//   .c
// })

// router.get('/getit', (req, res, next)=>{
//     axios.get(`www.omdbapi.com/?apikey=${process.env.apikey}?t=tt0266697`)
//       .then((movie) => {
//         res.json(movie)
//       })
//       .catch((err)=>{
//           res.json(err)
//       }
//     )
//     })

// router.get('/movie/:id', (req, res, next)=>{
// movieId =(req.params.id)
// .then
//     .get(`http://www.omdbapi.com/?apikey=${process.env.apikey}&i=`+id)=>{
//         res.json(theMovie);
//     })
//     .catch((err)=>{
//         res.json(err);
//     })
// })
//killbills omdbapikey (i) is tt0266697
// `http://www.omdbapi.com/?apikey=${process.env.apikey}&i=tt0266697`



//**********this is a function to check if a movie(by title) is in my database and if it is not there to add it.
//this will be used in routes that create reviews, wishlists, and favorites
//just so that I readily have people's wishlists, reviews, and favorites if the api goes down.  
//I should change this to be by ID to make it more precise*************************.  

module.exports = router;