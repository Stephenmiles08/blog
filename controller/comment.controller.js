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
        let getPost = await models.posts.findOne({where:{id:postId}})
        if (!getPost)
                throw new Exception('Unable to access Post.')
        await getPost.increment('commentCount', {by:1});
        successResponse(res,{comment:createComment.comment,commentId:createComment.id,username},200)
    } catch (error) {
        requestFailed(res,error.message,error.status||500)
    }

}

exports.EditComment = async(req,res)=>{
    const {
        commentId
    } = req.params;
    const {comment,userId} = req.body;
    try {
        const updateComment = await models.comments.update({comment}, {
            where: {
                id:commentId,
                userId
            }
        });
        if (updateComment[0] !== 1)
            throw new Exception('Unable to Update Comment.', 400);
        successResponse(res, {
            success: true
        }, 200);
    } catch (error) {
        requestFailed(res, error.message, error.status || 500);
    }
}

exports.getAllComments = async(req,res)=>{
    try {
        let searchArr = ['userId', 'comment']
        const getComments = await models.comments.findAll({});
        if (!getComments)
                throw new Exception('No comments.')
        let found = getComments.map((value, index) =>
        {
           delete value.dataValues.id, delete value.dataValues.createdAt, delete value.dataValues.updatedAt
            return value.dataValues
        });
        successResponse(res,found,200)
    } catch (error) {
        requestFailed(res,error.message,error.status||500)
    }
}

exports.getComment = async (req,res)=>{
    const {commentId}= req.params;

    try {
        const getComment = await models.comments.findOne({
            where: {
                id: commentId
            }
        })
        if (!getComment)
            throw new Exception('Comment not found', 404)
        successResponse(res, {
            Comment: getComment.comment,
            postId: getComment.postId,
            userId: getComment.userId
        }, 200)
    } catch (error) {
        requestFailed(res, error.message, error.status || 500)
    }
}

exports.deleteComment = async(req,res)=>{
    const {commentId} = req.params;
    const {userId} = req.body;
    try {
        const deleteFunction = await models.comments.destroy({
            where: {
                id: commentId,
                userId
            }
        });
        if (deleteFunction !== 1)
            throw new Exception('Unable to delete post', 500)
        successResponse(res, {
            success: true
        }, 200)
    } catch (error) {
        requestFailed(res, error.message, error.status || 500)
    }
}