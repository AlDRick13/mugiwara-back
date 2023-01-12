const UserController = require('../controllers/user.controllers')
const { getPagination, getPagingData } = require('../../utils/pagination')

const userController = new UserController()

const getUsers = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let users = await userController.findAndCount(query)
    const results = getPagingData(users, page, limit)
    return response.json({ results: results })

  } catch (error) {
    next(error)
  }
}

const addUser = async (request, response, next) => {
  try {
    let { body } = request
    let user = await userController.createUser(body)
    return response.status(201).json({ results: user })
  } catch (error) {
    next(error)
  }
}

const getUser = async (request, response, next) => {
  try {
    let { id } = request.params
    let users = await userController.getUserOr404(id)
    return response.json({ results: users })
  } catch (error) {
    next(error)
  }
}

const updateUser = async (request, response, next) => {
  try {
    let { id } = request.params
    let { body } = request
    let user = await userController.updateUser(id, body)
    return response.json({ results: user })
  } catch (error) {
    next(error)
  }
}

const removeUser = async (request, response, next) => {
  try {
    let { id } = request.params
    let user = await userController.removeUser(id)
    return response.json({ results: user, message: 'removed' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUsers,
  addUser,
  getUser,
  updateUser,
  removeUser
}