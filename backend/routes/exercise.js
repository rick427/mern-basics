const router = require('express').Router();
const Exercise = require('../models/Excersie');

//get all exercises
router.get('/',  (req, res) => {
   Exercise.find()
   .then(exercise => res.json(exercise))
   .catch(err => res.status(400).json({Error: err}));
});


//create an exercise
router.post('/add', (req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = (req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });
    
    newExercise.save()
    .then(data => res.json(data))
    .catch(err => {
        console.error(err.message);
        res.status(400).json(err);
    });
});


//get a single exercise by id
router.get('/:id', (req, res) => {
    Exercise.findById(req.params.id)
      .then(exercise => res.json(exercise))
      .catch(err => {
          console.log(err.message);
          res.status(400).json(err)
      });
});


//delete
router.delete('/:id', (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
      .then(() => res.json('Exercise Deleted'))
      .catch(err => res.status(400).json({Error: err}))
});


//update
router.put('/update/:id', (req, res) => {
    Exercise.findById(req.params.id) // first find the exercise you want to update
      .then(exercise => {
          exercise.username = req.body.username;
          exercise.description = req.body.description;
          exercise.duration = Number(req.body.duration);
          exercise.date = req.body.date;

          exercise.save()
           .then(() => res.json('Exercise updated!!'))
           .catch(err => res.status(400).json({Error: err}));
      });
})

module.exports = router;