const UserServices = require('../services/user.services');
const { getPagination, getPagingData } = require('../../utils/pagination');

const userServices = new UserServices();

const getUsers = async (request, response, next) => {
  try {
    let query = request.query;
    let { page, size } = query;

    const { limit, offset } = getPagination(page, size, '10');
    query.limit = limit;
    query.offset = offset;

    let users = await userServices.findAndCount(query);
    const results = getPagingData(users, page, limit);
    return response.json({ results: results });

  } catch (error) {
    next(error);
  }
};

const getUserByTokenId = async (request, response, next) => {
  try {
    console.log(request.user);
    const tokenId = request.user.id;
    let user = await userServices.getUserOr404(tokenId);
    return response.json({
      "user_id": user.id,
      "first_name": user.first_name,
      "last_name": user.last_name,
      "email": user.email,
      "profile": user.profile[0]
    });
  } catch (error) {
    next(error);
  }
};


const addUser = async (request, response, next) => {
  try {
    let { body } = request;
    let user = await userServices.createUser(body);
    return response.status(201).json({ results: user });
  } catch (error) {
    next(error);
  }
};

const getUser = async (request, response, next) => {
  try {
    let { id } = request.params;
    let user = await userServices.getUserOr404(id);
    return response.json({ results: user });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (request, response, next) => {
  try {
    let { id } = request.params;
    let { body } = request;
    let user = await userServices.updateUser(id, body);
    return response.json({ results: user });
  } catch (error) {
    next(error);
  }
};

const removeUser = async (request, response, next) => {
  try {
    let { id } = request.params;
    let user = await userServices.removeUser(id);
    return response.json({ results: user, message: 'removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  addUser,
  getUser,
  updateUser,
  getUserByTokenId,
  removeUser
};