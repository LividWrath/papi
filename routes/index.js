const express = require('express');
const users = require('./user');
const posts = require('./post');

const router = express.Router();

router.use('/user', users);
router.use('/post', posts);

module.exports = router;
