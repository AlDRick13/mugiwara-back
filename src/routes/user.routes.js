const express = require('express');
const router = express.Router();
const passportJWT = require('../../middlewares/auth.middleware');
const userMiddleware = require('../../middlewares/updateUser.middleware');

const {
  getUsers,
  addUser,
  getUser,
  updateUser,
  removeUser } = require('../controllers/user.controllers');

const { getVotesByUser } = require('../controllers/vote.controllers')
const { getPublicationsByUser } = require('../controllers/publication.controllers')
/**
 * @openapi
 * /api/v1/auth/signup:
 *   post:
 *     summary: Register a new user into the app
 *     tags: [Users]
 *     requestBody:
 *       description: To register a new user you need a some parameters
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/register"
 *     responses:
 *       201:
 *         description: created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/users"
 */



router.get('/', passportJWT.authenticate('jwt', { session: false }), getUsers);
router.get('/:id', passportJWT.authenticate('jwt', { session: false }), getUser);
router.get('/:id/votes', passportJWT.authenticate('jwt', { session: false }), getVotesByUser);
router.get('/:id/publications', passportJWT.authenticate('jwt', { session: false }), getPublicationsByUser);

router.put('/:id', passportJWT.authenticate('jwt', { session: false }), userMiddleware, updateUser);
router.delete('/:id', removeUser);


module.exports = router;