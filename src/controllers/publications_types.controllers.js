const models = require('../../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../../utils/custom_error')
const uuid = require('uuid')

class PublicationController {

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

        const publication = await models.Publications_types.findAndCountAll(options)
        return publication
    }
    async createPublication({ name, description }) {
        const transaction = await models.sequelize.transaction()
        try {
            let newPublication = await models.Publications_types.create({
                id: uuid.v4(),
                name,
                description
            }, { transaction })

            await transaction.commit()
            return newPublication
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }
    //Return Instance if we do not converted to json (or raw:true)
    async getPublicationOr404(id) {
        let publication = await models.Publications_types.findByPk(id)
        if (!publication) throw new CustomError('Not found User', 404, 'Not Found')
        return publication
    }
    //Return not an Instance raw:true | we also can converted to Json instead
    async getPublication(id) {
        let publication = await models.Publications_types.findByPk(id, { raw: true })
        return publication
    }
    async updatePublication(id, { name, description }) {
        const transaction = await models.sequelize.transaction()
        try {
            let publication = await models.Publications_types.findByPk(id)

            if (!publication) throw new CustomError('Not found user', 404, 'Not Found')
            let updatedUser = await publication.update({
                name,
                description
            }, { transaction })
            await transaction.commit()

            return updatedUser[0]
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }
    async removePublication(id) {
        const transaction = await models.sequelize.transaction()
        try {
            let publication = await models.Publications_types.findByPk(id)

            if (!publication) throw new CustomError('Not found user', 404, 'Not Found')
            await publication.destroy({ transaction })
            await transaction.commit()
            return publication[0]

        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }
}

module.exports = PublicationController