const express = require('express');
const router = express.Router();

const { postLogin, postSignup } = require('./auth.controllers');

router.post('/signup', postSignup);
router.post('/login', postLogin);
// router.post('/user-info', getUserInfo);


module.exports = router;