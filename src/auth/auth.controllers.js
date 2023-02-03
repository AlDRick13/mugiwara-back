const jwt = require('jsonwebtoken');
const authServices = require('./auth.services');
const UserServices = require('../services/user.services');
const authConfig = require('../../database/config/auth');

const userServices = new UserServices();

const postSignup = async (request, response, next) => {
    try {
        let { body } = request;
        let user = await userServices.createUser(body);
        return response.status(201).json({ results: user });
    } catch (error) {
        next(error);
    }

};

const postLogin = (request, response, next) => {
    const { email, password } = request.body;

    if (email && password) {
        authServices.checkUsersCredentials(email, password)
            .then((data) => {
                if (data) {
                    const token = jwt.sign({
                        id: data.id,
                        profile_id: data.profile[0].id,
                        email: data.email,
                        role: data.profile[0].role.name
                    }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });

                    response.status(200).json({
                        message: 'Correct Credentials!',
                        token
                    });
                } else {
                    response.status(401).json({ message: 'Invalid Credentials' });
                }
            })
            .catch((err) => {
                response.status(400).json({ message: err.message });
            });
    } else {
        response.status(400).json({
            message: 'Missing Data', fields: {
                email: 'example@example.com',
                password: "string"
            }
        });
    }
};

const postCreateTokenChangePassword = async (request, response, next) => {
    const { email } = request.body;
    let userWithToken = await authServices.createTokenChangePassword(email);
    if (userWithToken) {
        return response.status(200).json({ message: 'Succes. Token created succesfully' });

    } else {
        return response.status(404).json({ message: 'Invalid email' });

    }
};

const postChangePassword = async (request, response, next) => {
    const { id } = request.params;
    const { password } = request.body;

    if (!password) {
        return response.status(404).json({ message: 'Missing field password' });
    }
    let userWithToken = await authServices.changePassword(id, password);
    if (userWithToken.name === 'SequelizeDatabaseError') {
        return response.status(400).json({ message: 'Invalid Id. Id must be the same as logged user id' });

    } if (userWithToken.name === 'JsonWebTokenError') {
        return response.status(401).json({ message: 'Acces Denied. Cannot change a password without have created a change password token first' });

    }
    return response.status(200).json({ message: 'Password changed successfully' });
};

module.exports = {
    postLogin,
    postSignup,
    postCreateTokenChangePassword,
    postChangePassword
};