//modified tasks
const express = require('express');
const router  = express.Router();
const requestThing=require('request')
const axios=require('axios')
const Comment = require('../models/comment');
const Review = require('../models/review');
const Movie = require('../models/movie')

let movieId;
let movieObject;
//none of this works except the omdb-js title search but not by id

//instead i can do the search on the angular side and pass the id of any movie chosen
//to generate a list of the movie's reviews?  

// router.get('/search', (req, res, next)=>{
// omdb.get( {id:movieId}, true, function(err, movie){
//     if(err){
//         return console.log(err);
//     }
//     if(!movie){
//         return console.log('no movie found')
//     }
//     movie
// }
// })

//this doesn't

// router.get('/search1', (req, res, next)=>{
// requestThing.get(`http://www.omdbapi.com/?apikey=${process.env.apikey}&i=tt0266697`, (error, response, body)=>{
//     console.log('error:', error); // Print the error if one occurred
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     console.log('body:', body);
//     movieObject=body;
//     res.send(movieObject)
// })
// })

//Search returns the movie only


let movieList=["Pulp Fiction", "The Godfather", "Life is Beautiful", 
"Fight Club", "The Shawshank Redemption", "Amelie", 
"The Lord of the Rings: The Return of the King", "Gladiator", 
"American History X", "The Matrix", 
"The Lord of the Rings: The Fellowship Of the Ring", 
"The Dark Knight", "Inception", "Forest Gump", "A Clockwork Orange",
"City of God", "Blade Runner", "Braveheart", "American Beauty", 
"Big Fish", "Trainspotting", "The Lord of the Rings: The Two Towers", 
"Reservoir Dogs", "The Pianist", "Kill Bill: Volume 1", 
"Goodfellas", "Snatch", "Gran Torino", "Million Dollar Baby", 
"Silence of the Lambs", "Memento", "The Shining", 
"Inglorius Bastards", "Requium for a Dream", "Taxi Driver", 
"Scarface", "Mystic River", "One Flew Over the Cuckoo's Nest", 
"V for Vendetta", "Eternal Sunshine of the Spotness Mind", 
"Cinema Paradiso", "The Departed", "Saving Private Ryan", 
"Apocalypse Now", "Casablanca", 
"Star Wars: Episode V: The Empire Strikes Back", 
"Kill Bill: Volume 2"]
let movieList1=["Pulp Fiction", "The Godfather", "Life is Beautiful", 
"Fight Club", "The Shawshank Redemption", "Amelie", 
"The Lord of the Rings: The Return of the King", "Gladiator", 
"American History X", "The Matrix", 
"The Lord of the Rings: The Fellowship Of the Ring", 
"Scarface", "Mystic River", "One Flew Over the Cuckoo's Nest", 
"V for Vendetta", "Eternal Sunshine of the Spotness Mind", 
"Cinema Paradiso", "The Departed", "Saving Private Ryan", 
"Apocalypse Now", "Casablanca", 
"Star Wars: Episode V: The Empire Strikes Back", 
"Kill Bill: Volume 2"]
let movieList2=["Pulp Fiction", "The Godfather", "Life is Beautiful", 
"Fight Club", "The Shawshank Redemption", "Amelie", 
"The Lord of the Rings: The Return of the King", "Gladiator", 
"American History X", "The Matrix", 
"The Lord of the Rings: The Fellowship Of the Ring", 
"The Dark Knight", "Inception", "Forest Gump", "A Clockwork Orange",
"City of God", "Blade Runner", "Braveheart", "American Beauty", 
"Big Fish", "Trainspotting", "The Lord of the Rings: The Two Towers", 
"Reservoir Dogs", "The Pianist", "Kill Bill: Volume 1", 
"Goodfellas", "Snatch", "Gran Torino", "Million Dollar Baby", 
"Silence of the Lambs", "Memento", "The Shining", 
"Inglorius Bastards", "Requium for a Dream", "Taxi Driver", 
"Scarface", "Mystic River", "One Flew Over the Cuckoo's Nest", 
"V for Vendetta", "Eternal Sunshine of the Spotness Mind", 
"Cinema Paradiso", "The Departed", "Saving Private Ryan", 
"Apocalypse Now", "Casablanca", 
"Star Wars: Episode V: The Empire Strikes Back", 
"Kill Bill: Volume 2"]

// iteration 1 gets stuff from the db.  this is glitchy, 
//stopped making around movie#47of50//
//maybe can do this not in routes?like a seeds thing?
router.get('/makeMoviesArrayCoolBeans', (req, res, next)=>{
    movieList1.forEach(function(element){
        let title=element;
        Movie.find({})
      axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: process.env.apikey,
            t: title
            }
        })
    .then((thing)=>{
        //I added this innerList thing to be able to see which
        //movies on my list failed to be added.
        Movie.create({
            objectFromOMDB: thing.data
        })
        .then((newMovie)=>{
            newMovie.save();
            console.log('innerList:'+innerList)
        })
    })
    .catch((err)=>{
        (res.status(404).json(err))});
    });

    })





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

//supersearch returns the movie and reviews
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
//superDuperSearch was going to return the movie and  reviews and related comments
//but i decided more organized to push entire comment objects since they are small to the 
//related review

// router.get('/superduper', (req, res, next)=>{
//     axios.get('http://www.omdbapi.com/', {
//         params: {
    apikey: process.env.apikey,
//             i: 'tt0266697'
//             }
//         })
//     .then(responseFromAPI=>{
//         Review.find({movie: responseFromAPI.data.imdbID})
//         .then(movieReviews=>{
//             // console.log("the reviews for movies ============", movieReviews.comments);
//             // Comment.find({_id: {$in: movieReviews.comments}})
//             Comment.find({review: responseFromAPI.data._id})
//             .then(reviewComments=>{
//                 theData={
//                     movie: responseFromAPI.data,
//                     reviews: movieReviews,
//                     comments: reviewComments
//                 }
//                 res.json(theData)
//             })
//         .catch((err)=>{
//             (res.status(404).res.json(err))
//         })
//         })
//         .catch((err)=>{
//             (res.status(404).res.json(err));
//         })
//     })
//     .catch((err)=>{
//         (res.status(404).json(err))
//     });
//     });


// .subscribe(movieFromDB=>{
//     console.log()
//     movieObject=res.json(movieFromDB);
// })
// .catch((err)=>{
//     res.json(err)}
// )
// })

// router.get('/comment', (req, res, next)=>{
//     Comment.find()
//     .then((allTheComments)=>{
//         res.json(allTheComments);
//     })
//     .catch((err)=>{
//         res.json(err);
//     })
// })

// router.get('/review/:id', (req, res, next)=>{
//     Review.findById(req.params.id)
//     .then((theReview)=>{
//         res.json(theReview);
//     })
//     .catch((err)=>{
//         res.json(err);
//     })
// })

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

// router.get('/comment', (req, res, next)=>{
//     Comment.find()
//     .then((allTheComments)=>{
//         res.json(allTheComments);
//     })
//     .catch((err)=>{
//         res.json(err);
//     })
// })
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


module.exports = router;