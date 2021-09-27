const express=require("express")
const router=express.Router()
const { check, validationResult } = require('express-validator');
const auth= require('../../middelware/auth')

const checkObjectId = require('../../middelware/checkObjectId')


//Voiture model
const Voiture=require('../../models/voitures')
const User = require("../../models/user")





// post voiture
router.post(
  '/',
  auth,
  
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newVoiture = new Voiture({
        marque: req.body.marque,
        photo: req.body.photo,
        name: user.name,
        user: req.user.id
      });

      const voiture = await newVoiture.save();

      res.json(voiture);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route    GET api/VOITURE
// @desc     Get all VOITURE
// @access   Public
router.get('/', async (req, res) => {
  try {
    const voitures = await Voiture.find().sort({ date: -1 });
    res.json(voitures);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route    GET api/VOITURE/:id
// @desc     Get VOITURE by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const voiture = await Voiture.findById(req.params.id);

    if (!voiture) {
      return res.status(404).json({ msg: 'voiture not found' });
    }

    res.json(voiture);
  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId'){
      return res.status(404).json({ msg: 'Voiture not found'})
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/voiture/:id
// @desc     Delete a voiture
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const voiture = await Voiture.findById(req.params.id);

    if (!voiture) {
      return res.status(404).json({ msg: 'voiture not found' });
    }

    // Check user
    if (voiture.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await voiture.remove();

    res.json({ msg: 'Voiture removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    POST api/voitures/comment/:id
// @desc     Comment on a voiture
// @access   Private
router.post(
  '/comment/:id',
  auth,
  checkObjectId('id'),
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const voiture = await Voiture.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id
      };

      voiture.comment.unshift(newComment);

      await voiture.save();

      res.json(voiture.comment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route    DELETE api/voitures/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const voiture = await Voiture.findById(req.params.id);

    // Pull out comment
    const comment = voiture.comment.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    voiture.comment = voiture.comment.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await voiture.save();

    return res.json(voiture.comment);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

    
    
module.exports=router;