const express = require('express');
const router = express.Router();
const passportJWT = require('../../middlewares/auth.middleware');


const {
    getTags,
    addTag,
    getTag,
    updateTag,
    removeTag } = require('../controllers/tag.controllers');


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
 *     userTags:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: tony
 *     registerTags:
 *       type: object
 *       properties:
 *         name:
 *           type: string 
 *           example: tony
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
 *     tags:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: tony
 *        
 */

/**
 * @openapi
 * /api/v1/tags:
 *   get:
 *     summary: Get all tags 
 *     tags: [Tags]
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

/**
 * @openapi
 * /api/v1/tags:
 *   post:
 *     summary: post a tag into the app
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: To register a new publication you need a some parameters, for example
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/registerTags"
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
 *                     $ref: "#/components/schemas/userTags"
 *     
 *
 */

/**
* @openapi
* /api/v1/tags/{id}:
*   put:
*     summary: update tag by id
*     tags: [Tags]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*           minimum: 1
*         description: user id
*     requestBody:
*       description: To update a user you need a some parameters, for example
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: "#/components/schemas/tags"
*     responses:
*       201:
*         description: OK
*
*/

router.get('/', passportJWT.authenticate('jwt', { session: false }), getTags);
router.post('/', passportJWT.authenticate('jwt', { session: false }), addTag);
router.get('/:id', passportJWT.authenticate('jwt', { session: false }), getTag);
router.put('/:id', passportJWT.authenticate('jwt', { session: false }), updateTag);
router.delete('/:id', passportJWT.authenticate('jwt', { session: false }), removeTag);

module.exports = router;