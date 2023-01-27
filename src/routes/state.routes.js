const express = require('express');
const router = express.Router();
const passportJWT = require('../../middlewares/auth.middleware');


const {
    getStates,
    addState,
    getState,
    updateState,
    removeState } = require('../controllers/state.controllers');

router.get('/', passportJWT.authenticate('jwt', { session: false }), getStates);
// router.post('/', addState);
// router.get('/:id', getState);
// router.put('/:id', updateState);
// router.delete('/:id', removeState);

module.exports = router;