/**
 * @openapi
 * /api/v1/auth/signup:
 *   post:
 *     summary: Register a new user into the app
 *     tags: [Auth. Register and Login]
 *     requestBody:
 *       description: To register a new user you need a some parameters, for example
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
 *     
 *
 */

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user into the app
 *     tags: [Auth. Register and Login]
 *     requestBody:
 *       description: To do login you need a some parameters, for example
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/user"
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
 *                     $ref: "#/components/schemas/login"
 *     
 *
 */

const express = require('express');
const router = express.Router();
const { getUserByTokenId } = require('../controllers/user.controllers');
const { postLogin, postSignup } = require('./auth.controllers');
const passportJWT = require('../../middlewares/auth.middleware');


router.post('/signup', postSignup);
router.post('/login', postLogin);
router.get('/user-info', passportJWT.authenticate('jwt', { session: false }), getUserByTokenId);


module.exports = router;