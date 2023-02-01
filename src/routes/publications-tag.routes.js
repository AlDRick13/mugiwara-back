const express = require('express');
const router = express.Router();

const passportJWT = require('../../middlewares/auth.middleware');

const {
    getPublicationsTags,
    addPublicationsTag,
    getPublicationTag,
    updatePublicationsTag,
    removePublicationsTag } = require('../controllers/publications-tag.controllers');

router.get('/', passportJWT.authenticate('jwt', { session: false }), getPublicationsTags);
router.post('/', passportJWT.authenticate('jwt', { session: false }), addPublicationsTag);
router.get('/:id', passportJWT.authenticate('jwt', { session: false }), getPublicationTag);
router.put('/:id', passportJWT.authenticate('jwt', { session: false }), updatePublicationsTag);
router.delete('/:id', passportJWT.authenticate('jwt', { session: false }), removePublicationsTag);

module.exports = router;