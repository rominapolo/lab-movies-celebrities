const router = require("express").Router();
// all your routes here
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');
const User = require('../models/User.model');

//
  router.post('/movies/create', (req, res, next) => {
    const {title, genre, plot, cast} = req.body

    Movie.create({title, genre, plot, cast})
    .then((createdMovie) => {
        console.log(`The movie ${createdMovie.title} has been created`);
        res.redirect('/movies');
    })
    .catch((err) => next(err));
  
});

//------------------------------------------- DISPLAY MOVIES ROUTE
router.get('/movies', (req, res, next) => {
    Movie.find()
    .then((movies) => {
        res.json(movies);
    })
    .catch((err) => {
        res.json(err);
    });
});


//------------------------------------------- DISPLAY MOVIE DETAILS ROUTE

router.get('/movies/:id', (req, res, next) => {
  console.log(req.params.id)
 Movie.findById(req.params.id).populate('cast')
  .then((movieFromDb) => {
    User.find({likes: req.params.id}).then((usersWhoLiked) => {
        res.json({movie: movieFromDb, likes: usersWhoLiked.length})
    })
  }).catch((err)=> {
        res.json(err);
  })

  })

  
  //------------------------------------------- DELETE MOVIES ROUTE

router.post('/movies/:id/delete', (req, res, next)=>{

  Movie.findByIdAndRemove(req.params.id)
  .then((response)=>{
      res.redirect('/movies');
  })
  .catch((err)=>{
      console.log(err);
  })

});

  
  //------------------------------------------- EDIT MOVIE ROUTES
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

router.post('/movies/:id', (req, res, next)=>{

   Movie.findByIdAndUpdate(req.params.id, {
       title: req.body.title,
       genre: req.body.genre,
       plot: req.body.plot,
       cast: req.body.cast
   }).then((response)=>{
       res.redirect('/movies');
   }).catch((err)=>{
       console.log(err);

   
   })

});


module.exports = router;