const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model');

//create//

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
});

router.post('/celebrities/create', (req, res, next) => {
const newCelebrity = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
}

Celebrity.create(newCelebrity)
.then(newlyCreatedCelebrity => {
 res.redirect('/celebrities');
    }).catch(err => {
        console.log({err});
    })
});

//read//


router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then((celebritiesFromDb) => {
        console.log({celebritiesFromDb})
        data = {
            celebrities: celebritiesFromDb
        }
        res.render('celebrities/celebrities', data);
    })
    .catch((err) => {
        console.log('Error while creating celebrity');
        next(err);
    });
})

router.post('/:id/delete', (req, res, next)=>{

    Celebrity.findByIdAndRemove(req.params.id)
    .then((response)=>{
        res.redirect('/celebrities');
    })
    .catch((err)=>{
        console.log(err);
    })

});


//=======Delete======= 

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