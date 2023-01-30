const models = require('../../database/models');
const { Op } = require('sequelize');
const { CustomError } = require('../../utils/custom_error');
const uuid = require('uuid');

class VotesServices {

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
        const { id } = query;
        if (id) {
            options.where.id = { [Op.iLike]: `%${id}%` };
        }

        //Necesario para el findAndCountAll de Sequelize
        options.distinct = true;

        const votes = await models.votes.findAndCountAll(options);
        return votes;
    }

    async findAndCountVotesByUser(id) {
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

        let profile = user.profile[0].id
        if (!profile) throw new CustomError('Not found profile', 404, 'Not Found');

        if (profile) {

            let votes = await models.votes.findAll({
                where: {
                    profile_id: profile
                }
            })

            return votes
        }
    }

    async createVote({ publication_id, profile_id }) {
        const transaction = await models.sequelize.transaction();
        try {
            const validate = await models.votes.findOne({
                where: {
                    publication_id,
                    profile_id
                }
            });
            if (validate) {
                const value = await models.votes.destroy({
                    where: {
                        publication_id: validate.publication_id,
                        profile_id: validate.profile_id

                    }
                }, { transaction });
                await transaction.commit();

                return value[0];
            } else {
                let newVote = await models.votes.create({
                    id: uuid.v4(),
                    publication_id,
                    profile_id
                }, { transaction });
                await transaction.commit();

                return newVote;
            }

        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    //Return Instance if we do not converted to json (or raw:true)
    async getVoteOr404(id) {
        let vote = await models.votes.findByPk(id);
        if (!vote) throw new CustomError('Not found Vote', 404, 'Not Found');
        return vote;
    }
    //Return not an Instance raw:true | we also can converted to Json instead
    async getVote(id) {
        let vote = await models.votes.findByPk(id, { raw: true });
        return vote;
    }
    async updateVote(id, { publication_id, profile_id }) {
        const transaction = await models.sequelize.transaction();
        try {
            let vote = await models.votes.findByPk(id);

            if (!vote) throw new CustomError('Not found Vote', 404, 'Not Found');
            let updatedVote = await vote.update({
                publication_id,
                profile_id
            }, { transaction });
            await transaction.commit();

            return updatedVote;
        } catch (error) {
            await transaction.rollbavote;
            throw error;
        }
    }
    async removeVote(id) {
        const transaction = await models.sequelize.transaction();
        try {
            let vote = await models.votes.findByPk(id);

            if (!vote) throw new CustomError('Not found Vote', 404, 'Not Found');
            await vote.destroy({ transaction });
            await transaction.commit();
            return vote;

        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = VotesServices;