const PublicationController = require('../controllers/publications_types.controllers')
const { getPagination, getPagingData } = require('../../utils/pagination')

const publicationController = new PublicationController()

const getPublications = async (request, response, next) => {
    try {
        let query = request.query
        let { page, size } = query

        const { limit, offset } = getPagination(page, size, '10')
        query.limit = limit
        query.offset = offset

        let publications = await publicationController.findAndCount(query)
        const results = getPagingData(publications, page, limit)
        return response.json({ results: results })

    } catch (error) {
        next(error)
    }
}

const addPublication = async (request, response, next) => {
    try {
        let { body } = request
        let publication = await publicationController.createPublication(body)
        return response.status(201).json({ results: publication })
    } catch (error) {
        next(error)
    }
}

const getPublication = async (request, response, next) => {
    try {
        let { id } = request.params
        let publications = await publicationController.getPublicationOr404(id)
        return response.json({ results: publications })
    } catch (error) {
        next(error)
    }
}

const updatePublication = async (request, response, next) => {
    try {
        let { id } = request.params
        let { body } = request
        let publication = await publicationController.updatePublication(id, body)
        return response.json({ results: publication })
    } catch (error) {
        next(error)
    }
}

const removePublication = async (request, response, next) => {
    try {
        let { id } = request.params
        let publication = await publicationController.removePublication(id)
        return response.json({ results: publication, message: 'removed' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getPublications,
    addPublication,
    getPublication,
    updatePublication,
    removePublication
}