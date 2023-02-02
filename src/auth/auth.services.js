const uuid = require('uuid')
const UserServices = require('../services/user.services')
const { comparePassword } = require('../../utils/crypto')
const jwt = require('jsonwebtoken');
const authConfig = require('../../database/config/auth');
const JwtStrategy = require('passport-jwt').Strategy;
const passport = require('passport');

const userService = new UserServices()

const checkUsersCredentials = async (email, password) => {
    try {

        const user = await userService.findUserByEmail(email)

        const verifyPassword = comparePassword(password, user.password)
        if (verifyPassword) {
            return user
        }
        return null
    } catch (error) {
        return error
    }
}

const createTokenChangePassword = async (email) => {
    try {
        const userByEmail = await userService.findUserByEmail(email)

        if (userByEmail) {
            const tokenCreated = jwt.sign({
                id: userByEmail.id,
                email: userByEmail.email,
            }, authConfig.secret, {
                expiresIn: authConfig.expires
            });

            const user = await userService.updateUserToken(email, tokenCreated)

            await transaction.commit();
            return user
        }
        return null
    } catch (error) {
        return error
    }
}

const changePassword = async (id, newPassword) => {
    try {
        const userByEmail = await userService.getUserOr404(id)
        const idtokenDecoded = jwt.verify(userByEmail.token, authConfig.secret)

        if (id == idtokenDecoded.id) {
            const data = userService.updatePassword(id, newPassword)
            return data
        }

        return null
    } catch (error) {
        return error
    }
}

module.exports = {
    checkUsersCredentials,
    createTokenChangePassword,
    changePassword
}