const models = require('../../database/models');
const { Op } = require('sequelize');
const { CustomError } = require('../../utils/custom_error');
const uuid = require('uuid');

class PublicationServices {

    constructor() { }

    async findAndCount(query) {
        const options = {
            where: {},
        };
        const { limit, offset } = query;
        if (limit && offset) {
            options.limit = limit;
            options.offset = offset;
        }

        //No sabemos para que funciona esa parte del codigo.
        const { title, tags } = query;

        if (title) {
            options.where.name = { [Op.iLike]: `%${title}%` };
        }

        if (tags) {
            let tagsIDs = tags.split(",")
            options.include.push({ // El options que les di en el ejemplo 
                model: models.Tags,
                as: 'tags',
                required: true,
                where: { id: tagsIDs },
                through: { attributes: [] }
            })
        }

        //Necesario para el findAndCountAll de Sequelize
        options.distinct = true;

        const data = await models.publications.findAndCountAll(options);
        return data;
    }

    async findAndCountPublicationsByUser(id) {
        let user = await models.Users.findByPk(id, {
            include: [
                {
                    model: models.Profiles, as: 'profile',
                    include: [{
                        model: models.Roles,
                        as: 'role'
                    }]
                },
            ]
        });
        if (!user) throw new CustomError('Not found User', 404, 'Not Found');

        let profile = user.profile[0].id;
        if (!profile) throw new CustomError('Not found profile', 404, 'Not Found');

        if (profile) {

            let publication = await models.publications.findAll({
                where: {
                    profile_id: profile
                }
            });

            return publication;
        }
    }
    async createPublication({ title, description, content, picture, city_id, img_url, publication_type_id, tags }, profile_id) {
        const transaction = await models.sequelize.transaction();
        const tags_array = tags.split(",");
        try {
            let newPublication = await models.publications.create({
                id: uuid.v4(),
                profile_id,
                title,
                description,
                content,
                picture,
                city_id,
                img_url,
                publication_type_id
            }, { transaction });

            let tags = await models.tags.findAll({
                where: {
                    id: tags_array
                },
                attributes: ['id'],
                raw: true,
                transaction
            })
            if (tags.length > 0) {
                let findedTags = tags.map(tag => tag['id'])
                await newPublication.setTags(findedTags, { transaction })
            }

            await transaction.commit();
            return newPublication;
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            throw error;
        }
    }
    //Return Instance if we do not converted to json (or raw:true)
    async getPublicationOr404(id) {
        let publication = await models.publications.findByPk(id);
        if (!publication) throw new CustomError('Not found Publication', 404, 'Not Found');
        return publication;
    }
    //Return not an Instance raw:true | we also can converted to Json instead
    async getPublication(id) {
        let publication = await models.publications.findByPk(id, { raw: true });
        return publication;
    }
    async updatePublication(id, { title, description, content, picture, img_url }) {
        const transaction = await models.sequelize.transaction();
        try {
            let publication = await models.publications.findByPk(id);

            if (!publication) throw new CustomError('Not found publication', 404, 'Not Found');
            let updatedPublication = await publication.update({
                title,
                description,
                content,
                picture,
                img_url
            }, { transaction });
            await transaction.commit();

            return updatedPublication;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    async removePublication(id) {
        const transaction = await models.sequelize.transaction();
        try {
            let publication = await models.publications.findByPk(id);

            if (!publication) throw new CustomError('Not found publication', 404, 'Not Found');
            await publication.destroy({ transaction });
            await transaction.commit();
            return publication;

        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = PublicationServices

