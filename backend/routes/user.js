const router = require('express').Router();
const User = require('../models/User');

//Get all users
router.get('/',  (req, res) => {
   User.find()
   .then(user => res.json(user))
   .catch(err => res.status(400).json({Error: err}));
});

//Add a new user
router.post('/add', (req, res) => {
    const username = req.body.username;
    const newuser = new User({username});
    
    newuser.save()
    .then(newuser => res.json({success: 'User ' + newuser.username + ' Added'}))
    .catch(err => res.status(400).json({Error: err}));
});

module.exports = router;