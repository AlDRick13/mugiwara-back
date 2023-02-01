const express = require('express');
const router = express.Router();
const passportJWT = require('../../middlewares/auth.middleware');

/**
 * @openapi
 * /api/v1/publications-types/{id}:
 *   get:
 *     summary: Get all publications_types from user
 *     tags: [Publication_Type]
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
 * /api/v1/publications-types:
 *   get:
 *     summary: Get user information
 *     tags: [Publication_Type]
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

const {
  getPublicationTypes,
  addPublicationType,
  getPublicationType,
  updatePublicationType,
  removePublicationType } = require('../controllers/publications_types.controllers');

router.get('/', passportJWT.authenticate('jwt', { session: false }), getPublicationTypes);
// router.post('/', addPublicationType);
router.get('/:id', passportJWT.authenticate('jwt', { session: false }), getPublicationType);
// router.put('/:id', updatePublicationType);
// router.delete('/:id', removePublicationType);

module.exports = router;