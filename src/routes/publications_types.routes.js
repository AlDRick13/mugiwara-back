const express = require('express');
const router = express.Router();

const passportJWT = require('../../middlewares/auth.middleware');

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