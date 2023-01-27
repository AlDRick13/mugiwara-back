const express = require('express');
const router = express.Router();

const passportJWT = require('../../middlewares/auth.middleware');


const {
    getCities,
    addCity,
    getCity,
    PutCity,
    DeleteCity } = require('../controllers/city.controllers');

router.get('/', passportJWT.authenticate('jwt', { session: false }), getCities);
// router.post('/', addCity);
// router.get('/:id', getCity);
// router.put('/:id', PutCity);
// router.delete('/:id', DeleteCity);

module.exports = router;