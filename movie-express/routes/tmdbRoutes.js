// see account
// update account
//delete account

//currently user password and username cannot be changed.
const express      = require('express');
const router   = express.Router();
const ensureLogin = require('connect-ensure-login');
const requestThing=require('request')
const axios=require('axios')
const Comment = require('../models/comment');
const Review = require('../models/review');
const Movie = require('../models/movie')
const omdb = require('omdb-js')
const User = require('../models/user')

let movieId;
let movieObject;
const tmdbkey = process.env.tmdbkey;
const MovieDB = require('moviedb')(tmdbkey);
//I need a search to find one movie by title

//works
//this one definitely have the query include title and tage...
//searches by title, returns most relevant results....
router.post('/titlesearch', (req, res, next)=>{
    axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
            api_key: process.env.tmdbkey,
            query: req.body.title,
            page: req.body.page,
            language: req.body.language,
            include_adult: false,
            primary_release_year: req.body.primary_release_year,
            year: req.body.year,
            sort_by: req.body.sort_by,
            }
        })
    .then((thing)=>{
        res.send(thing.data);
    })
    .catch((err)=>{
        (res.status(404).json(err))});
    });


//works
//this search returns movies by the tmbd id
    router.get('/idsearch/:id', (req, res, next)=>{
        axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}`, {
            params: {
                api_key: process.env.tmdbkey,
                }
            })
        .then((thing)=>{
            res.send(thing.data);
        })
        .catch((err)=>{
            (res.status(404).json(err))});
        });


//works
//this will actually find reviews of a given movie......of course could just make 2 get requests to express from angular instead, 
//1 for the reviews of the movie and one for the movie, using id in params.  
router.get('/find/:id', (req, res, next)=>{
    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}`, {
        params: {
            api_key: process.env.tmdbkey,
            }
        })

        .then(thing=>{
            Review.find({tmdb: thing.data.id})
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

//works
    router.post('/filtersearch', (req, res, next)=>{
        axios.get(`https://api.themoviedb.org/3/discover/movie/`, {
            params: {
                //skipping search options related to votes, cast, crew, companies, people, release-type, 
                api_key:                    process.env.tmdbkey,
                sort_by:                    req.body.sort_by,
                language:                   req.body.language,
                region:                     req.body.region,
                certification_country:      req.body.certification_country,
                certification:              req.body.certification,
                'certification.lte':        req.body.certificationlte,
                include_adult:              false,
                include_video:              req.body.include_video,
                page:                       req.body.page,
                primary_release_year:       req.body.primary_release_year,
                "primary_release_date.gte": req.body.primary_release_dategte,
                "primary_release_date.lte": req.body.primary_release_datelte,
                "release_date.gte":         req.body.release_dategte,
                "release_date.lte":         req.body.release_datelte,
                with_genres:                req.body.with_genres, //comma seperated value of genre ids that you want to include in the results.
                year:                       req.body.year,
                without_genres:             req.body.without_genres,
                "with_runtime.gte":         req.body.with_runtimegte,
                "with_runtime.lte":         req.body.with_runtimelte,
                with_keywords:              req.body.with_keywords,
                "without_keywords":         req.body.without_keywords
                }
            })
        .then((thing)=>{
            res.send(thing.data);
        })
        .catch((err)=>{
            (res.status(404).json(err))});
        });


        const referenceObjects={
            // sortBy: Allowed Values: , popularity.asc, popularity.desc, release_date.asc, release_date.desc, revenue.asc, revenue.desc, primary_release_date.asc, primary_release_date.desc, original_title.asc, original_title.desc, vote_average.asc, vote_average.desc, vote_count.asc, vote_count.desc
            // default: popularity.desc

            "genres": [
              { "id": 28,   "name": "Action"},
              {"id": 12,    "name": "Adventure"},
              {"id": 16,    "name": "Animation"},
              {"id": 35,    "name": "Comedy"},
              {"id": 80,    "name": "Crime"},
              {"id": 99,    "name": "Documentary"},
              {"id": 18,    "name": "Drama"},
              {"id": 10751, "name": "Family"},
              {"id": 14,    "name": "Fantasy"},
              {"id": 36,    "name": "History"},
              {"id": 27,    "name": "Horror"},
              {"id": 10402, "name": "Music"},
              {"id": 9648,  "name": "Mystery"},
              {"id": 10749, "name": "Romance"},
              {"id": 878,   "name": "Science Fiction"},
              {"id": 10770, "name": "TV Movie"},
              {"id": 53,    "name": "Thriller"},
              {"id": 10752, "name": "War"},
              {"id": 37,    "name": "Western"}
            ]
          }
          
          
module.exports = router;