/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:            
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     users:
 *       type: object
 *       properties:
 *         first_name:
 *           type: string
 *           example: Tony
 *         last_name:
 *           type: string
 *           example: Ospino
 *         email:
 *           type: string
 *           example: tony@gmail.com
 *     register:
 *       type: object
 *       properties:
 *         first_name:
 *           type: string
 *           example: Tony
 *         last_name:
 *           type: string
 *           example: Ospino
 *         email:
 *           type: string
 *           example: tony@gmail.com
 *         username:
 *           type: string
 *           example: Tonyop46
 *         password:
 *           type: string
 *           example: 1234
 *         email_verified:
 *           type: Date
 *           example: 2023/01/30
 *         token:
 *           type: string
 *           example: 12dfdf2232dfdf
 *         role_id:
 *           type: int
 *           example: 1
 *         image_url:
 *           type: string
 *           example: "Hola chula"
 *         code_phone:
 *           type: string
 *           example: "111121111"
 *         phone:
 *           type: string
 *           example: "88889288823382"
 *         country_id:
 *           type: int
 *           example: 1
 * 
 *  
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: tony@gmail.com
 *         password:
 *           type: string
 *           example: 1234 
 *     login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: tony@gmail.com  
 * 
 */


/**
 * @openapi
 * /api/v1/auth/signup:
 *   post:
 *     summary: Register a new user into the app
 *     tags: [Auth]
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
 *     tags: [Auth]
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

/**
 * @openapi
 * /api/v1/auth/user-info:
 *   get:
 *     summary: Get user information
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: This is your user information
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
 *                     type: object
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