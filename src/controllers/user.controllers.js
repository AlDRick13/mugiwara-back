const models = require('../../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../../utils/custom_error')
const uuid = require('uuid')

class UsersService {

  constructor(){}

  async findAndCount(query) {
    const options = {
      where: {},
    }
    const { limit, offset } = query
    if (limit && offset) {
      options.limit =  limit
      options.offset =  offset
    }
        
    const { name } = query
    if (name) {
      options.where.name = { [Op.iLike]: `%${name}%` }
    }

    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true
    
    const users = await models.Users.findAndCountAll(options)
    return users
  }
  async createUser({first_name, last_name, email, username, password, email_verified, token}) {
    const transaction = await models.sequelize.transaction()
    try {
      let newUser = await models.Users.create({
        id: uuid.v4(),
        first_name,
        last_name,
        email,
        username,
        password,
        email_verified,
        token
      }, { transaction })
            
      await transaction.commit()
      return newUser
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  //Return Instance if we do not converted to json (or raw:true)
  async getUserOr404(id) {
    let user = await models.Users.findByPk(id)
    if(!user) throw new CustomError('Not found User', 404, 'Not Found')
    return user
  }
  //Return not an Instance raw:true | we also can converted to Json instead
  async getUser(id) {
    let user = await models.Users.findByPk(id, {raw: true})
    return user
  }
  async updateUser(id, {first_name, last_name, email, username, password}) {
    const transaction = await models.sequelize.transaction()
    try {
      let user = await models.Users.findByPk(id)
    
      if(!user) throw new CustomError('Not found user', 404, 'Not Found')
      let updatedUser = await user.update({
        first_name,
        last_name,
        email,
        username,
        password
      }, { transaction })
      await transaction.commit()
    
      return updatedUser[0]
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  async removeUser(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let user = await models.Users.findByPk(id)
    
      if(!user) throw new CustomError('Not found user', 404, 'Not Found')
      await user.destroy({transaction})
      await transaction.commit()
      return user[0]

    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
  
module.exports = UsersService