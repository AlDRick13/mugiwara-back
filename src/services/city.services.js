const CityController = require('../controllers/city.controllers')
const { getPagination, getPagingData } = require('../../utils/pagination')

const cityController = new CityController()

const getCities = async (request, response, next) => {
    try {
        let query = request.query
        let { page, size } = query

        const { limit, offset } = getPagination(page, size, '10')
        query.limit = limit
        query.offset = offset

        let Cities = await cityController.findAndCount(query)
        const results = getPagingData(Cities, page, limit)
        return response.json({ results: results })

    } catch (error) {
        next(error)
    }
}

const addCity = async (request, response, next) => {
    try {
        let { body } = request
        let city = await cityController.createPublication(body)
        return response.status(201).json({ results: city })
    } catch (error) {
        next(error)
    }
}

const getCity = async (request, response, next) => {
    try {
        let { id } = request.params
        let cities = await cityController.getPublicationOr404(id)
        return response.json({ results: cities })
    } catch (error) {
        next(error)
    }
}

const updateCity = async (request, response, next) => {
    try {
        let { id } = request.params
        let { body } = request
        let city = await cityController.updatePublication(id, body)
        return response.json({ results: city })
    } catch (error) {
        next(error)
    }
}

const removeCity = async (request, response, next) => {
    try {
        let { id } = request.params
        let city = await cityController.removePublication(id)
        return response.json({ results: city, message: 'removed' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getCities,
    addCity,
    getCity,
    updateCity,
    removeCity
}