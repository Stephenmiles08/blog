const models = require('../database/models');
const {Exception,successResponse,requestFailed} = require('../lib/codebits')
exports.CreateComment= async(req,res)=>{
    const {comment,postId,userId,username} = req.body;

    try {
        const createComment = await models.comments.create({
            comment,
            postId,
            userId
        })
        if (!createComment)
            throw new Exception('Post upload failed.', 400)
        successResponse(res,{comment:createComment.comment,commentId:createComment.id,username},200)
    } catch (error) {
        requestFailed(res,error.message,error.status||500)
    }

}