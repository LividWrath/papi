const express = require('express');
const passport = require('passport');
const userService = require('../services/userservice');

const router = express.Router();

router.get('/', (req, res) => {
  const out = userService.getUser(req.param.id);
  res.json(out);
});

router.post('/register', (req, res) => {
  userService
    .createUser(req.body)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.json(err);
    });
});
router.post('/login', passport.authenticate('local'), function(req, res) {
  res.json({ loggedIn: true });
});
router.get('/:userId', (req, res) => {
  userService
    .getUser({ id: req.params.userId })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      console.error(err);
      res.send('user not found');
    });
});
router.get('/:userId/posts', (req, res) => {
  userService
    .getUserPosts({ id: req.params.userId })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      console.error(err);
      res.send('user not found');
    });
});
router.get('/:userId/likedposts', (req, res) => {
  userService
    .getLikedPosts({ id: req.params.userId })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      console.error(err);
      res.send('user not found');
    });
});
module.exports = router;
