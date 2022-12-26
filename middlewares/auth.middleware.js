require('dotenv').config();
const jwt = require('jsonwebtoken');
const {
    successResponse,
    requestFailed,
    Exception
} = require('../lib/codebits');


exports.validateToken = async (req, res, next) => {
    const authorizationToken = req.headers.authorization;
    let result;
    if (authorizationToken) {
        const token = authorizationToken.split(" ")[1];
        const option = {
            expiresIn: '1h',
            issuer: process.env.Authorization_Issuer
        }
        const secret = process.env.Authorization_secret;

        try {
            result = jwt.verify(token, secret, option);
            console.log(result);
            req.user = result;
            next()
        } catch (error) {
            return requestFailed(res, error, 500)
        }
    }
}