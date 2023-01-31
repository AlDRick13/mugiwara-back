const express = require('express');
const router = express.Router();
const passportJWT = require('../../middlewares/auth.middleware');
const userMiddleware = require('../../middlewares/updateUser.middleware');
const { getPublicationsByUser } = require('../controllers/publication.controllers');

const {
  getUsers,
  addUser,
  getUser,
  updateUser,
  removeUser } = require('../controllers/user.controllers');
const { getVotesByUser } = require('../controllers/vote.controllers');



router.get('/', passportJWT.authenticate('jwt', { session: false }), getUsers);
router.get('/:id', passportJWT.authenticate('jwt', { session: false }), getUser);
router.get('/:id/votes', passportJWT.authenticate('jwt', { session: false }), getVotesByUser);
router.get('/:id/publications', passportJWT.authenticate('jwt', { session: false }), getPublicationsByUser);

router.put('/:id', passportJWT.authenticate('jwt', { session: false }), userMiddleware, updateUser);
router.delete('/:id', removeUser);


module.exports = router;