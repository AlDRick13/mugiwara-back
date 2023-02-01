const TagService = require('../services/tag.services');
const { getPagination, getPagingData } = require('../../utils/pagination');

const tagService = new TagService();

const getTags = async (request, response, next) => {
    try {
        let query = request.query;
        let { page, size } = query;

        const { limit, offset } = getPagination(page, size, '10');
        query.limit = limit;
        query.offset = offset;

        let roles = await tagService.findAndCount(query);
        const results = getPagingData(roles, page, limit);
        return response.json({ results });

    } catch (error) {
        next(error);
    }
};

const addTag = async (req, res, next) => {
    try {
        const body = req.body;
        let role = await tagService.createTag(body);
        return res.status(201).json({ results: role });
    } catch (error) {
        next(error);
    }
};

const getTag = async (request, response, next) => {
    try {
        let { id } = request.params;
        let role = await tagService.getTagOr404(id);
        return response.json({ results: role });
    } catch (error) {
        next(error);
    }
};

const updateTag = async (request, response, next) => {
    try {
        let { id } = request.params;
        let { body } = request;
        let role = await tagService.updateTag(id, body);
        return response.json({ results: role });
    } catch (error) {
        next(error);
    }
};

const removeTag = async (request, response, next) => {
    try {
        let { id } = request.params;
        let role = await tagService.removeTag(id);
        return response.json({ results: role, message: 'removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTags,
    addTag,
    getTag,
    updateTag,
    removeTag
};