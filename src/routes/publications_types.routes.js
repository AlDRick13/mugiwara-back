const express = require('express')
const router = express.Router()

const {
    getPublicationsTypes,
    addPublicationTypes,
    getPublicationTypes,
    updatePublicationTypes,
    removePublicationTypes } = require('../controllers/publications_types.controllers')

router.get('/', getPublicationsTypes)
router.post('/', addPublicationTypes)
router.get('/:id', getPublicationTypes)
router.put('/:id', updatePublicationTypes)
router.delete('/:id', removePublicationTypes)

module.exports = router