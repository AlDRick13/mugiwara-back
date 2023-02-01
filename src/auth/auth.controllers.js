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

// const getUserInfo = async (request, response, next) => {
//     try {
//         let {id} = request.body;
//         let  user = await userServices.getUser()

//     } catch (error) {

//     }
// }

module.exports = {
    postLogin,
    postSignup
};