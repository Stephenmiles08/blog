const router = require('express').Router();
const {
    validateToken,validatePost
} = require('../../middlewares/auth.middleware');
const postController = require('../../controller/post.controller');

module.exports = (app) => {
    app.post('/api/posts', validateToken, validatePost, postController.createPost)
}