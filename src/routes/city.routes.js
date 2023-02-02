const express = require('express');
const router = express.Router();

const passportJWT = require('../../middlewares/auth.middleware');


const {
    getCities,
    addCity,
    getCity,
    PutCity,
    DeleteCity } = require('../controllers/city.controllers');


 /**
 * @openapi
 * /api/v1/cities:
 *   get:
 *     summary: Get all cities
 *     tags: [Cities]
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

router.get('/', passportJWT.authenticate('jwt', { session: false }), getCities);
// router.post('/', addCity);
// router.get('/:id', getCity);
// router.put('/:id', PutCity);
// router.delete('/:id', DeleteCity);

module.exports = router;