const models = require('../../database/models');
const { Op, INTEGER } = require('sequelize');
const { CustomError } = require('../../utils/custom_error');

class PublicationTagService {

    constructor() {

    }

    async findAndCount(query) {
        const options = {
            where: {},
        };

        const { limit, offset } = query;
        if (limit && offset) {
            options.limit = limit;
            options.offset = offset;
        }

        const { id } = query;
        if (id) {
            options.where.name = { [Op.iLike]: `%${id}%` };
        }

        options.distinct = true;

        const data = await models.publication_tag.findAndCountAll(options);
        return data;
    }

    async createPublicationTag({ tag_id, publication_id }) {
        const transaction = await models.sequelize.transaction();
        try {
            let data = await models.publication_tag.create({
                tag_id,
                publication_id
            }, { transaction });

            await transaction.commit();
            return data;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    //Return Instance if we do not converted to json (or raw:true)
    async getPublicationTagOr404(id) {
        let data = await models.publication_tag.findByPk(id);

        if (!data) throw new CustomError('Not found publication_tag', 404, 'Not Found');

        return data;
    }

    //Return not an Instance raw:true | we also can converted to Json instead
    async getPublicationTag(id) {
        let data = await models.publication_tag.findByPk(id, { raw: true });
        return data;
    }

    async updatePublicationTag(id, { tag_id, publication_id }) {
        const transaction = await models.sequelize.transaction();
        try {
            let role = await models.publication_tag.findByPk(id);

            if (!role) throw new CustomError('Not found publication_tag', 404, 'Not Found');

            let data = await role.update({
                tag_id,
                publication_id
            }, { transaction });

            await transaction.commit();

            return data;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async removePublicationTag(id) {
        const transaction = await models.sequelize.transaction();
        try {
            let data = await models.publication_tag.findByPk(id);

            if (!data) throw new CustomError('Not found publication_tag', 404, 'Not Found');

            await data.destroy({ transaction });

            await transaction.commit();

            return data;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

}

module.exports = PublicationTagService;