const CityServices = require('../services/city.services')
const { getPagination, getPagingData } = require('../../utils/pagination')

const cityServices = new CityServices()

const getCities = async (request, response, next) => {
    try {
        let query = request.query
        let { page, size } = query

        const { limit, offset } = getPagination(page, size, '10')
        query.limit = limit
        query.offset = offset

        let Cities = await cityServices.findAndCount(query)
        const results = getPagingData(Cities, page, limit)
        return response.json({ results: results })

    } catch (error) {
        next(error)
    }
}

const addCity = async (request, response, next) => {
    try {
        let { body } = request
        let city = await cityServices.createCity(body)
        return response.status(201).json({ results: city })
    } catch (error) {
        next(error)
    }
}

const getCity = async (request, response, next) => {
    try {
        let { id } = request.params
        let cities = await cityServices.getCityOr404(id)
        return response.json({ results: cities })
    } catch (error) {
        next(error)
    }
}

const updateCity = async (request, response, next) => {
    try {
        let { id } = request.params
        let { body } = request
        let city = await cityServices.updateCity(id, body)
        return response.json({ results: city })
    } catch (error) {
        next(error)
    }
}

const removeCity = async (request, response, next) => {
    try {
        let { id } = request.params
        let city = await cityServices.removeCity(id)
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