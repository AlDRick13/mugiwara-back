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
 *           example: "img.com/tony.jpg"
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
 *                   items:
 *                     $ref: "#/components/schemas/register"
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
 *                   type: object
 *                   properties:
 *                      message:
 *                          type: string
 *                          example: Correct Credentials!
 *                      token:
 *                          type: string
 *                          example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRjM2E5NTdkLTQ0OGItNDc2MS1hZDdjLWZlNmUwY2FkMTk3NyIsInByb2ZpbGVfaWQiOiI1MzJiNGY4ZS01NzA3LTRmMjAtOGY4Yi04NDQ1ZGRiNjcwMDgiLCJlbWFpbCI6InRvbnlAZ21haWwuY29tIiwicm9sZSI6InB1YmxpYyIsImlhdCI6MTY3NTI3NzI5MywiZXhwIjoxNjc1MzYzNjkzfQ.x2sCvmzSxplfAq3z6m3f64jkpqYDzigJ7iHksAHugPE  *     
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
 *         description: ok
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
const { postLogin, postSignup, postCreateTokenChangePassword, postChangePassword } = require('./auth.controllers');
const passportJWT = require('../../middlewares/auth.middleware');


router.post('/signup', postSignup);
router.post('/login', postLogin);
router.post('/change-password', postCreateTokenChangePassword)
router.post('/change-password/:id', postChangePassword)
router.get('/user-info', passportJWT.authenticate('jwt', { session: false }), getUserByTokenId);

module.exports = router;