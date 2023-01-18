const PublicationTypesServices = require('../services/publications_types.services')
const { getPagination, getPagingData } = require('../../utils/pagination')

const publicationTypesServices = new PublicationTypesServices()

const getPublicationsTypes = async (request, response, next) => {
    try {
        let query = request.query
        let { page, size } = query

        const { limit, offset } = getPagination(page, size, '10')
        query.limit = limit
        query.offset = offset

        let data = await publicationTypesServices.findAndCount(query)
        const results = getPagingData(data, page, limit)
        return response.json({ results: results })

    } catch (error) {
        next(error)
    }
}

const addPublicationTypes = async (request, response, next) => {
    try {
        let { body } = request
        let data = await publicationTypesServices.createPublication(body)
        return response.status(201).json({ results: data })
    } catch (error) {
        next(error)
    }
}

const getPublicationTypes = async (request, response, next) => {
    try {
        let { id } = request.params
        let data = await publicationTypesServices.getPublicationOr404(id)
        return response.json({ results: data })
    } catch (error) {
        next(error)
    }
}

const updatePublicationTypes = async (request, response, next) => {
    try {
        let { id } = request.params
        let { body } = request
        let data = await publicationTypesServices.updatePublication(id, body)
        return response.json({ results: data })
    } catch (error) {
        next(error)
    }
}

const removePublicationTypes = async (request, response, next) => {
    try {
        let { id } = request.params
        let data = await publicationTypesServices.removePublication(id)
        return response.json({ results: data, message: 'removed' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getPublicationsTypes,
    addPublicationTypes,
    getPublicationTypes,
    updatePublicationTypes,
    removePublicationTypes
}