const express = require('express');
const router = express.Router();
const { getUserByTokenId } = require('../controllers/user.controllers');
const { postLogin, postSignup } = require('./auth.controllers');
const passportJWT = require('../../middlewares/auth.middleware');


router.post('/signup', postSignup);
router.post('/login', postLogin);
router.get('/user-info', passportJWT.authenticate('jwt', { session: false }), getUserByTokenId);


module.exports = router;