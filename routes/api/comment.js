const router = require('express').Router();
const commentControl = require('../../controller/comment.controller');
const {validateToken, validatePost} = require('../../middlewares/auth.middleware');

module.exports = (app)=>{
    app.post('/api/comments',validateToken,validatePost,commentControl.CreateComment);
    app.get('/api/comments', validateToken,commentControl.getAllComments);
    app.get('/api/comments/:commentId',validateToken,commentControl.getComment);
    app.put('/api/comments/:commentId',validateToken,validatePost,commentControl.EditComment);
}