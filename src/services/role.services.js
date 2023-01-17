const RoleController = require('../controllers/role.controllers');
const { getPagination, getPagingData } = require('../../utils/pagination');

const roleController = new RoleController();

const getRoles = async (request, response, next) => {
    try {
        let query = request.query;
        let { page, size } = query;

        const { limit, offset } = getPagination(page, size, '10');
        query.limit = limit;
        query.offset = offset;

        let roles = await roleController.findAndCount(query);
        const results = getPagingData(roles, page, limit);
        return response.json({ results: results });

    } catch (error) {
        next(error);
    }
};

const addRole = async (request, response, next) => {
    try {
        let { body } = request;
        let role = await roleController.createRole(body);
        return response.status(201).json({ results: publication });
    } catch (error) {
        next(error);
    }
};

const getRole = async (request, response, next) => {
    try {
        let { id } = request.params;
        let roles = await roleController.getRoleOr404(id);
        return response.json({ results: roles });
    } catch (error) {
        next(error);
    }
};

const updateRole = async (request, response, next) => {
    try {
        let { id } = request.params;
        let { body } = request;
        let role = await roleController.updateRole(id, body);
        return response.json({ results: role });
    } catch (error) {
        next(error);
    }
};

const removeRole = async (request, response, next) => {
    try {
        let { id } = request.params;
        let role = await roleController.removeRole(id);
        return response.json({ results: role, message: 'removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getRoles,
    addRole,
    getRole,
    updateRole,
    removeRole
};