const express = require('express');
const router = express.Router();
const passportJWT = require('../../middlewares/auth.middleware');


const {
    getTags,
    addTag,
    getTag,
    updateTag,
    removeTag } = require('../controllers/tag.controllers');

router.get('/', getTags);
router.post('/', passportJWT.authenticate('jwt', { session: false }), addTag);
router.get('/:id', getTag);
router.put('/:id', passportJWT.authenticate('jwt', { session: false }), updateTag);
router.delete('/:id', passportJWT.authenticate('jwt', { session: false }), removeTag);

module.exports = router;