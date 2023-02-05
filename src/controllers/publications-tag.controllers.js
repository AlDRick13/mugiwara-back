const PublicationsTagService = require('../services/publications-tag.services');
const { getPagination, getPagingData } = require('../../utils/pagination');

const publicationsTagService = new PublicationsTagService();

const getPublicationsTags = async (request, response, next) => {
    try {
        let query = request.query;
        let { page, size } = query;

        const { limit, offset } = getPagination(page, size, '10');
        query.limit = limit;
        query.offset = offset;

        let roles = await publicationsTagService.findAndCount(query);
        const result = getPagingData(roles, page, limit);
        return response.json({ result });

    } catch (error) {
        next(error);
    }
};

const addPublicationsTag = async (req, res, next) => {
    try {
        const body = req.body;
        let role = await publicationsTagService.createTag(body);
        return res.status(201).json({ result: role });
    } catch (error) {
        next(error);
    }
};

const getPublicationTag = async (request, response, next) => {
    try {
        let { id } = request.params;
        let role = await publicationsTagService.getTagOr404(id);
        return response.json({ result: role });
    } catch (error) {
        next(error);
    }
};

const updatePublicationsTag = async (request, response, next) => {
    try {
        let { id } = request.params;
        let { body } = request;
        let role = await publicationsTagService.updateTag(id, body);
        return response.json({ result: role });
    } catch (error) {
        next(error);
    }
};

const removePublicationsTag = async (request, response, next) => {
    try {
        let { id } = request.params;
        let role = await publicationsTagService.removeTag(id);
        return response.json({ result: role, message: 'removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getPublicationsTags,
    addPublicationsTag,
    getPublicationTag,
    updatePublicationsTag,
    removePublicationsTag
};