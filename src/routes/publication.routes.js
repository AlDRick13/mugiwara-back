const express = require('express');
const router = express.Router();

const passportJWT = require('../../middlewares/auth.middleware');

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
router.post('/:id/vote', addVote) //! le falta Autenticacion - middleware.
router.get('/:id', passportJWT.authenticate('jwt', { session: false }), getPublication);
// router.put('/:id', updatePublication)
router.delete('/:id', removePublication);

module.exports = router;