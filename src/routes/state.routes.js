const express = require('express');
const router = express.Router();
const passportJWT = require('../../middlewares/auth.middleware');


const {
    getStates,
    addState,
    getState,
    updateState,
    removeState } = require('../controllers/state.controllers');

 /**
 * @openapi
 * /api/v1/states:
 *   get:
 *     summary: Get all states
 *     tags: [States]
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

router.get('/', passportJWT.authenticate('jwt', { session: false }), getStates);
// router.post('/', addState);
// router.get('/:id', getState);
// router.put('/:id', updateState);
// router.delete('/:id', removeState);

module.exports = router;