//modified tasks
const express = require('express');
const router  = express.Router();
const omdb = require('omdb-js')('a7f6503f');
const request=require('request')

let movieId;
let movieObject;

router.get('/search', (req, res, next)=>{
omdb.get( {id:movieId}, true, function(err, movie){
    if(err){
        return console.log(err);
    }
    if(!movie){
        return console.log('no movie found')
    }
    movie
}
})



// router.get('/search', (req, res, next)=>{
// request.get('http://www.omdbapi.com/?apikey=[a7f6503f]&i=tt0266697', (err, res)=>{
//     res.json()
// })




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
// http.get('www.omdbapi.com/?apikey=a7f6503f&i=tt0266697')
//   .then((movie) => {
//     res.json(movie)
//   })
//   .c
// })

// router.get('/getit', (req, res, next)=>{
//     axios.get('www.omdbapi.com/?apikey=a7f6503f?t=tt0266697')
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
//     .get(`http://www.omdbapi.com/?apikey=a7f6503f&i=`+id)=>{
//         res.json(theMovie);
//     })
//     .catch((err)=>{
//         res.json(err);
//     })
// })
//killbills omdbapikey (i) is tt0266697
// http://www.omdbapi.com/?apikey=a7f6503f&i=tt0266697


module.exports = router;