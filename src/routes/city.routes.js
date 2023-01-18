const express = require('express')
const router = express.Router()

const {
    getCities,
    addCity,
    getCity,
    updateCity,
    removeCity } = require('../controllers/city.controllers')

router.get('/', getCities)
router.post('/', addCity)
router.get('/:id', getCity)
router.put('/:id', updateCity)
router.delete('/:id', removeCity)

module.exports = router