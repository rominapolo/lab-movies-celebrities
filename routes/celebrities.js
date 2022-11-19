const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');

//------------------------------------------- CREATE CELEBRITIES ROUTES

router.post('/celebrities/create', (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body


    Celebrity.create({name, occupation, catchPhrase})
    .then((createdCelebrity) => {
        console.log(`The celebrity ${createdCelebrity.title} has been created`);
        res.json(createdCelebrity);
        // res.redirect('/celebrities/create');
    })
    .catch((err) => next(err));
  
});


//------------------------------------------- DISPLAY CELEBRITIES ROUTE
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then((celebritiesFromDb) => {
        console.log({celebritiesFromDb})
        data = celebritiesFromDb
        res.json(data);
    })
    .catch((err) => {
        res.json(err)
    });
})

//------------------------------------------- EDIT CELEBRITIES ROUTE
// router.get('/celebrities/:id/edit', (req, res, next) => {
//     Celebrity.findById(req.params.id)
//     .then(celebritiesFromDb => {
//         console.log(celebritiesFromDb);
//         res.render('celebrities/edit-celebrity', celebritiesFromDb);
// }).catch(err => {console.log({err})});
// })

router.post('/celebrities/:id', (req, res, next)=>{
    Celebrity.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
        
    }).then((response)=>{
        
        res.json(response);

    }).catch((err)=>{
        console.log(err);
    })

});

//------------------------------------------- DISPLAY CELEBRITIES DETAILS ROUTE

router.get('/celebrities/:id', (req, res, next) => {
    console.log(req.params.id)
   Celebrity.findById(req.params.id)
    .then((celebrityFromDb) => {
      console.log(celebrityFromDb)
    res.json({celebrity: celebrityFromDb})
    }).catch((err)=> {
        res.json(err)
    })
  
    })
  
//------------------------------------------- DELETE CELEBRITIES ROUTE
router.post('/celebrities/:id/delete', (req, res, next)=>{

    Celebrity.findByIdAndRemove(req.params.id)
    .then((response)=>{
        res.redirect('/celebrities');
    })
    .catch((err)=>{
        console.log(err);
    })

});



module.exports = router;