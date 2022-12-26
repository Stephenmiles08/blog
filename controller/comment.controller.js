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

exports

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
            throw new Exception('Post not found', 404)
        successResponse(res, {
            Comment: getComment.comment,
            postId: getComment.postId,
            userId: getComment.userId
        }, 200)
    } catch (error) {
        requestFailed(res, error.message, error.status || 500)
    }
}