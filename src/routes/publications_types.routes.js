const express = require('express')
const router = express.Router()

const {
    getPublications,
    addPublication,
    getPublication,
    updatePublication,
    removePublication } = require('../services/publications_types.services')

router.get('/', getPublications)
router.post('/', addPublication)
router.get('/:id', getPublication)
router.put('/:id', updatePublication)
router.delete('/:id', removePublication)

module.exports = router