const express = require('express');
const router = express.Router();
const passportJWT = require('../../middlewares/auth.middleware');

/**
 * @openapi
 * /api/v1/publications-types/{id}:
 *   get:
 *     summary: Get all publication_type from user
 *     tags: [Publication_type]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: 
 *           type: integer
 *           minimum: 1
 *         description: user Id
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
 *                   example: Ok
 *                 data:
 *                   type: array
 *                   item: {}
 *     security:
*        - jwtAuth: []   
 * 
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