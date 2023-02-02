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
const { getVotesByUser } = require('../controllers/vote.controllers');
const { getPublicationsByUser } = require('../controllers/publication.controllers');

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
 *     A_user:
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
 *     create:
 *       type: object
 *       properties:
 *         first_name:
 *           type: string
 *           example: Tony
 *         last_name:
 *           type: string
 *           example: Ospino
 *         username:
 *           type: string
 *           example: Tonyop46
 * 
 */

/**
 * @openapi
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get user by id
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           minimum: 1
 *         description: user id
 *     responses:
 *       200:
 *         description: OK
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
 *                   items: {}
 *   
 */

/**
* @openapi
* /api/v1/users/{id}:
*   put:
*     summary: update user by id
*     tags: [Users]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*           format: uuid
*           minimum: 1
*         description: user id
*     requestBody:
*       description: To update a user you need a some parameters, for example
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: "#/components/schemas/create"
*     responses:
*       201:
*         description: OK
*
*/

/**
* @openapi
* /api/v1/users/{id}/vote:
*   get:
*     summary: Get user by id and vote
*     tags: [Users]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*           format: uuid
*           minimum: 1
*         description: user id
*     responses:
*       200:
*         description: OK
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
*                   items: {}
*   
*/

/**
* @openapi
* /api/v1/users/{id}/publications:
*   get:
*     summary: Get user by id and publications 
*     tags: [Users]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*           format: uuid
*           minimum: 1
*         description: user id
*     responses:
*       200:
*         description: OK
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
*                   items: {}
*   
*/

/**
* @openapi
* /api/v1/users:
*   get:
*     summary: Get all users
*     tags: [Users]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: OK
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
*                   items: {}
*   
*/


router.get('/', passportJWT.authenticate('jwt', { session: false }), getUsers);
router.get('/:id', passportJWT.authenticate('jwt', { session: false }), getUser);
router.get('/:id/votes', passportJWT.authenticate('jwt', { session: false }), getVotesByUser);
router.get('/:id/publications', passportJWT.authenticate('jwt', { session: false }), getPublicationsByUser);

router.put('/:id', passportJWT.authenticate('jwt', { session: false }), userMiddleware, updateUser);
router.delete('/:id', removeUser);

module.exports = router;