const RolesController = require('../controllers/role.controllers');
const { getPagination, getPagingData } = require('../../utils/pagination');

const rolesController = new RolesController();

const getRoles = async (request, response, next) => {
    try {
        let query = request.query;
        let { page, size } = query;

        const { limit, offset } = getPagination(page, size, '10');
        query.limit = limit;
        query.offset = offset;

        let roles = await rolesController.findAndCount(query);
        const results = getPagingData(roles, page, limit);
        return response.json({ results });

    } catch (error) {
        next(error);
    }
};

const addRole = async (req, res, next) => {
    console.log("BODY", req.body);
    const { name } = req.body;
    try {
        // let { body } = req;
        let role = await rolesController.createRole(name);
        return res.status(201).json({ results: role });
    } catch (error) {
        next(error);
    }
};

const getRole = async (request, response, next) => {
    try {
        let { id } = request.params;
        let role = await rolesController.getRoleOr404(id);
        return response.json({ results: role });
    } catch (error) {
        next(error);
    }
};

const updateRole = async (request, response, next) => {
    try {
        let { id } = request.params;
        let { body } = request;
        let role = await rolesController.updateRole(id, body);
        return response.json({ results: role });
    } catch (error) {
        next(error);
    }
};

const removeRole = async (request, response, next) => {
    try {
        let { id } = request.params;
        let role = await rolesController.removeRole(id);
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