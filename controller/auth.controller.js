require('dotenv').config();
const {
    Exception,
    successResponse,
    requestFailed
} = require('../lib/codebits');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    authUser
} = require('../lib/generalFunctions');
const models = require('../database/models');
exports.root = (req, res) => {
    successResponse(res, {
        'info': 'just saying hello',
        'and': req.body
    }, 200)
}

exports.signUp = async (req, res) => {
    const {
        email,
        password,
        username
    } = req.body;
    try {
        const existingUser = await models.users.findOne({
            where: {
                email
            }
        })
        if (existingUser) throw new Exception('User with this email already exist', 400)
        const registerUser = await models.users.create({
            email,
            password,
            username
        })
        if (registerUser.id === null) throw new Exception(`An error occurred while registering this user ${username}`, 500);
        const user = {id:registerUser.id,username:registerUser.username}
        const token = jwt.sign({
                ...user
            },
            process.env.Authorization_secret, {
                expiresIn: '1h',
                issuer: process.env.Authorization_Issuer
            })
        return successResponse(res, {
            'info': `successfully registered user ${username}`,
            token
        }, 200)
    } catch (error) {
        return requestFailed(res, error.message || error, error.status || 500);
    }
}


exports.login = async (req, res) => {
    try {
        let getAuth = await authUser(req.body)
        switch (getAuth.state) {
            case 1:
                throw new Exception(getAuth.error, 404);
                break;
            case 2:
                throw new Exception(getAuth.error, 404);
                break;
            case 3:
                const token = jwt.sign({
                        id: getAuth.response
                    },
                    process.env.Authorization_secret, {
                        expiresIn: '1h',
                        issuer: process.env.Authorization_Issuer
                    })
                successResponse(res, {
                    'info': 'successfully logged in',
                    'userId': getAuth.response,
                    token
                }, 200);
                break;
            default:
                throw new Exception(getAuth, 500);
                break;
        }
    } catch (error) {
        requestFailed(res, error.message || error, error.status || 500)
    }
}

exports.getUser = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const existingUser = await models.users.findByPk(id);
        if (!existingUser) throw new requestFailed('User does not exist', 404)
        const payload = {
            email: existingUser.email,
            username: existingUser.username
        }
        successResponse(res, payload, 200)
    } catch (error) {
        requestFailed(res, error.message || error, error.status || 500)
    }
}
