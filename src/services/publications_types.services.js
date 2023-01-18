const models = require('../../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../../utils/custom_error')
const uuid = require('uuid')

class PublicationTypesServices {

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

        const data = await models.Publications_types.findAndCountAll(options)
        return data
    }
    async createPublication({ name, description }) {
        const transaction = await models.sequelize.transaction()
        try {
            let newData = await models.Publications_types.create({
                name,
                description
            }, { transaction })

            await transaction.commit()
            return newData
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }
    //Return Instance if we do not converted to json (or raw:true)
    async getPublicationOr404(id) {
        let Data = await models.Publications_types.findByPk(id)
        if (!Data) throw new CustomError('Not found Type', 404, 'Not Found')
        return Data
    }
    //Return not an Instance raw:true | we also can converted to Json instead
    async getPublication(id) {
        let data = await models.Publications_types.findByPk(id, { raw: true })
        return data
    }
    async updatePublication(id, { name, description }) {
        const transaction = await models.sequelize.transaction()
        try {
            let data = await models.Publications_types.findByPk(id)

            if (!data) throw new CustomError('Not found Type', 404, 'Not Found')
            let updatedData = await data.update({
                name,
                description
            }, { transaction })
            await transaction.commit()

            return updatedData[0]
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }
    async removePublication(id) {
        const transaction = await models.sequelize.transaction()
        try {
            let data = await models.Publications_types.findByPk(id)

            if (!data) throw new CustomError('Not found Type', 404, 'Not Found')
            await data.destroy({ transaction })
            await transaction.commit()
            return data[0]

        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }
}

module.exports = PublicationTypesServices