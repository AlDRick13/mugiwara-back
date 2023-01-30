const express = require('express');
const router = express.Router();
const passportJWT = require('../../middlewares/auth.middleware');


const {
  getUsers,
  addUser,
  getUser,
  updateUser,
  removeUser } = require('../controllers/user.controllers');


router.get('/', passportJWT.authenticate('jwt', { session: false }), getUsers);
// router.post('/', addUser) auth/login
router.get('/:id', passportJWT.authenticate('jwt', { session: false }), getUser);
router.put('/:id', passportJWT.authenticate('jwt', { session: false }), updateUser);
router.delete('/:id', removeUser);

module.exports = router;