const router = require("express").Router();

const Movie = require('../models/Movie.model');

const Celebrity = require("../models/Celebrity.model");


// ====== create ======

router.get('/movies/create', (req, res, next)=>{
      Celebrity.find()
      .then((celebritiesFromDb) => {
          console.log({celebritiesFromDb})
          data = {
              celebrities: celebritiesFromDb
          }
      })
   res.render('movies/new-movie', data);
  });


router.post('/movies/create', (req, res, next) => {

    const newMovie = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast
}

Movie.create(newMovie)
.then(newlyCreatedMovie => {
 res.redirect('/movies');
    }).catch(err => next(err));
   
});

//========Read =========

router.get('/movies', (req, res, next) => {
    Movie.find({})
    .then((movies) => {
        res.render('movies/movies', {movies});
    })
    .catch((err) => {
        console.log('Error while creating a movie');
        next(err);
    });
});


//=========Read ========

router.get('/movies', (req,res,next)=>{
    Movie.find()
    .then((movieFromDb)=>{
        data = {
            movies: movieFromDB
        }
        res.render('movies/movies',data)
 }).catch((err)=> {
        console.log({err})
    })
    
})

router.get('/movies/:id', (req, res, next) => {
    console.log(req.params.id)
   Movie.findById(req.params.id).populate('cast')
    .then((movieFromDb) => {
    res.render('movies/movie-details',{movie: movieFromDb})
    }).catch((err)=> {
        console.log({err})
    })

    })

//========Update=======

router.get('/movies/:id/edit', (req, res, next) => {
   Celebrity.find()
   .then((allTheCelebrities)=>{
    Movie.findById(req.params.id)
    .then((movieFromDB)=> {
        let myCelebrities = [];
        let otherCelebrities = [];
        allTheCelebrities.forEach((eachCelebrity) => {
            if (movieFromDB.cast.includes(eachCelebrity.id)) {
                myCelebrities.push(eachCelebrity);
            }
        });

        res.render('movies/edit-movie', {
            myCelebrities: myCelebrities,
            otherCelebrities: otherCelebrities,
            movie: movieFromDB,
        });
        });
    }).catch(err=> {console.log(err);

});
});

router.post('/movies/:id/edit', (req, res, next)=>{

    Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }).then((response)=>{
        res.redirect('/movies/'+req.params.id);
    }).catch((err)=>{
        console.log(err);

    
    })

})

//=======Delete======= 

router.post('/movies/:id/delete', (req, res, next)=>{

    Movie.findByIdAndRemove(req.params.id)
    .then((response)=>{
        res.redirect('/movies');
    })
    .catch((err)=>{
        console.log(err);
    })

});




module.exports = router;