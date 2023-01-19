const models = require('../../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../../utils/custom_error')
const uuid = require('uuid')



class CityServices {

    constructor() { }

    async findAndCount(query) {

        const options = {
            where: {},
        }
        const { limit, offset } = query
        if (limit && offset) {
            options.limit = limit
            options.offset = offset
        }

        //No sabemos para que funciona esa parte del codigo.
        const { name } = query
        if (name) {
            options.where.name = { [Op.iLike]: `%${name}%` }
        }

        //Necesario para el findAndCountAll de Sequelize
        options.distinct = true

        const city = await models.city.findAndCountAll(options)
        return city
    }
    async createCity({ name, state_id }) {
        const transaction = await models.sequelize.transaction()
        try {
            let newCity = await models.city.create({
                name,
                state_id
            }, { transaction })

            await transaction.commit()
            return newCity
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }
    //Return Instance if we do not converted to json (or raw:true)
    async getCityOr404(id) {
        let city = await models.city.findByPk(id)
        if (!city) throw new CustomError('Not found City', 404, 'Not Found')
        return city
    }
    //Return not an Instance raw:true | we also can converted to Json instead
    async getCity(id) {
        let city = await models.city.findByPk(id, { raw: true })
        return city
    }
    async updateCity(id, { name }) {
        const transaction = await models.sequelize.transaction()
        try {
            let city = await models.city.findByPk(id)

            if (!city) throw new CustomError('Not found City', 404, 'Not Found')
            let updatedCity = await city.update({
                name
            }, { transaction })
            await transaction.commit()

            return updatedCity[0]
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }
    async removeCity(id) {
        const transaction = await models.sequelize.transaction()
        try {
            let city = await models.city.findByPk(id)

            if (!city) throw new CustomError('Not found City', 404, 'Not Found')
            await city.destroy({ transaction })
            await transaction.commit()
            return city[0]

        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }
}

module.exports = CityServices