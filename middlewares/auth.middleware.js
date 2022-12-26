require('dotenv').config();
const jwt = require('jsonwebtoken');
const {
    successResponse,
    requestFailed,
    Exception
} = require('../lib/codebits');
const model = require('../database/models');

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
            req.user = result;
            next()
        } catch (error) {
            return requestFailed(res, error, 500)
        }
    }
    else{
        requestFailed(res,'Authorization token required!',500)
    }
}

exports.validatePost = async(req,res,next)=>{
    const authorizationToken = req.headers.authorization;
    const decryptedToken = JSON.parse(Buffer.from(authorizationToken.split('.')[1], 'base64').toString())
    const {userId,username} = req.body;
    try {
        if (userId !== decryptedToken.id || username !== decryptedToken.username)
                throw new Exception('Unauthorized!',403);
        next()

    } catch (error) {
        requestFailed(res,error.message||error,error.status||500);
    }

}