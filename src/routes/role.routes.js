const express = require('express');
const router = express.Router();
const passportJWT = require('../../middlewares/auth.middleware');


const {
    getRoles,
    addRole,
    getRole,
    updateRole,
    removeRole } = require('../controllers/role.controllers');

router.get('/', passportJWT.authenticate('jwt', { session: false }), getRoles);
// router.post('/', addRole);
// router.get('/:id', getRole);
// router.put('/:id', updateRole);
// router.delete('/:id', removeRole);

module.exports = router;