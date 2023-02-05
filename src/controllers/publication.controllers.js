const PublicationServices = require('../services/publication.services');
const { getPagination, getPagingData } = require('../../utils/pagination');

const publicationServices = new PublicationServices();

const getPublications = async (request, response, next) => {
    try {
        let query = request.query;
        let { page, size } = query;

        const { limit, offset } = getPagination(page, size, '10');
        query.limit = limit;
        query.offset = offset;

        let data = await publicationServices.findAndCount(query);
        const result = getPagingData(data, page, limit);
        return response.json({ results: result });

    } catch (error) {
        next(error);
    }
};

const addPublication = async (request, response, next) => {
    try {
        const profile_id = request.user.profile_id;
        let { body } = request;
        let data = await publicationServices.createPublication(body, profile_id);
        return response.status(201).json({ result: data });
    } catch (error) {
        next(error);
    }
};

const getPublicationsByUser = async (request, response, next) => {
    try {
        const id = request.params.id;
        let publications = await publicationServices.findAndCountPublicationsByUser(id);
        return response.status(201).json({ result: publications });
    } catch (error) {
        next(error);
    }
};

const getPublication = async (request, response, next) => {
    try {
        let { id } = request.params;
        let data = await publicationServices.getPublicationOr404(id);
        return response.json({ result: data });
    } catch (error) {
        next(error);
    }
};

const updatePublication = async (request, response, next) => {
    try {
        let { id } = request.params;
        let { body } = request;
        let data = await publicationServices.updatePublication(id, body);
        return response.json({ result: data });
    } catch (error) {
        next(error);
    }
};

const removePublication = async (request, response, next) => {
    try {
        let { id } = request.params;
        let data = await publicationServices.removePublication(id);
        return response.json({ result: data, message: 'removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getPublications,
    addPublication,
    getPublication,
    updatePublication,
    getPublicationsByUser,
    removePublication
}

