const express = require('express');
const postService = require('../services/postservice');

const router = express.Router();
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    postService
      .getPostFeed()
      .then(posts => {
        res.json(posts);
      })
      .catch(err => {
        console.error(err);
        res.send('posts not found');
      });
  } else {
    res.send('please login to be able to view posts');
  }
});

router.get('/:postId', (req, res) => {
  postService
    .getPost({ id: req.params.postId })
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      console.error(err);
      res.send('post not found');
    });
});

router.post('/create', (req, res) => {
  if (req.isAuthenticated()) {
    postService
      .createPost({ user: req.user, post: req.body })
      .then(post => {
        res.json(post);
      })
      .catch(err => {
        res.json(err);
      });
  } else {
    res.send('please login to be able to post');
  }
});

router.post('/like', (req, res) => {
  if (req.isAuthenticated()) {
    postService
      .likePost({ user: req.user, post: req.body })
      .then(post => {
        res.json(post);
      })
      .catch(err => res.json(err));
  } else {
    res.send('please login to be able to like post');
  }
});
module.exports = router;
