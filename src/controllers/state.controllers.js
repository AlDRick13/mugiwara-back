const StateService = require('../services/state.services');
const { getPagination, getPagingData } = require('../../utils/pagination');

const stateService = new StateService();

const getStates = async (request, response, next) => {
    try {
        let query = request.query;
        let { page, size } = query;

        const { limit, offset } = getPagination(page, size, '10');
        query.limit = limit;
        query.offset = offset;

        let roles = await stateService.findAndCount(query);
        const results = getPagingData(roles, page, limit);
        return response.json({ results });

    } catch (error) {
        next(error);
    }
};

const addState = async (req, res, next) => {
    console.log("BODY", req.body);
    const { name } = req.body;
    try {
        // let { body } = req;
        let role = await stateService.createRole(name);
        return res.status(201).json({ results: role });
    } catch (error) {
        next(error);
    }
};

const getState = async (request, response, next) => {
    try {
        let { id } = request.params;
        let role = await stateService.getRoleOr404(id);
        return response.json({ results: role });
    } catch (error) {
        next(error);
    }
};

const updateState = async (request, response, next) => {
    try {
        let { id } = request.params;
        let { body } = request;
        let role = await stateService.updateRole(id, body);
        return response.json({ results: role });
    } catch (error) {
        next(error);
    }
};

const removeState = async (request, response, next) => {
    try {
        let { id } = request.params;
        let role = await stateService.removeRole(id);
        return response.json({ results: role, message: 'removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getStates,
    addState,
    getState,
    updateState,
    removeState
};