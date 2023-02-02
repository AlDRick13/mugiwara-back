const express = require('express');
const router = express.Router();

const passportJWT = require('../../middlewares/auth.middleware');

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
 *     publicationUsers:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: noticia
 *     publicationRegister:
 *       type: object
 *       properties:
 *         profile_id:
 *           type: string 
 *           format: uuid
 *           example: 0c904648-f05d-4ecd-9e40-2cf2fb71a7fd
 *         title:
 *           type: string
 *           example: noticia
 *         city_id:
 *           type: integer
 *           example: 1
 *         publication_type_id:
 *           type: integer
 *           example: 1
 *         tags:
 *           type: string
 *           example: 1,2
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
 *     Votes:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: adds-dfer2-ddff-ddf3
 *        
 */

/**
 * @openapi
 * /api/v1/publications/{id}:
 *   get:
 *     summary: Get publication by id
 *     tags: [Publication]
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
 *         description: publication id
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
 * /api/v1/publications:
 *   get:
 *     summary: Get all publications 
 *     tags: [Publication]
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
 * /api/v1/publications:
 *   post:
 *     summary: post a publications into the app
 *     tags: [Publication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: To register a new publication you need a some parameters, for example
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/publicationRegister"
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
 *                     $ref: "#/components/schemas/publicationUsers"
 *     
 *
 */

/**
 * @openapi
 * /api/v1/publications/{id}/vote:
 *   post:
 *     summary: vote and delete vote for an specific publication
 *     tags: [Publication]
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
 *         description: publication id
 *     responses:
 *       200:
 *         description: This is your publication
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
 *     
 *
 */

const {
    addVote
} = require('../controllers/vote.controllers');

const {
    getPublications,
    addPublication,
    getPublication,
    updatePublication,
    removePublication
} = require('../controllers/publication.controllers');

router.get('/', passportJWT.authenticate('jwt', { session: false }), getPublications);
router.post('/', passportJWT.authenticate('jwt', { session: false }), addPublication);
router.post('/:id/vote', passportJWT.authenticate('jwt', { session: false }), addVote);
router.get('/:id', passportJWT.authenticate('jwt', { session: false }), getPublication);
// router.put('/:id', updatePublication)
router.delete('/:id', removePublication);

module.exports = router;