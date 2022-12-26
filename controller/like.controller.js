const models =  require('../database/models');
const {Exception,successResponse,requestFailed} = require('../lib/codebits');

exports.like = async(req,res)=>{
    const {userId,postId} = req.body;

    try {
        const uploadLike = await models.likes.findOrCreate({where:{userId,postId},
            default:{userId,postId}
        });
        if (uploadLike[1] === false)
                throw new Exception(`user with id: ${userId} Can not like`,400) 
        const likePost = await models.posts.findOne({where:{id:postId}});
        
        await likePost.increment('likeCount',{by:1});
        successResponse(res,{success:true},200);
    } catch (error) {
        requestFailed(res,error.message,error.status||500)
    }
}

exports.unlike = async(req,res)=>{
    const {userId,postId} = req.body;

    try {
        const deletedLike = await models.likes.destroy({where:{userId,postId}});
        if (deletedLike !== 1)
            throw new Exception('Unable to delete')
        const unLikePost = await models.posts.findOne({where:{id:postId}});
        console.log(unLikePost);
        if (unLikePost.likeCount >1)
        await unLikePost.decrement('likeCount',{by:1});
        successResponse(res,{success:true},200);
    } catch (error) {
        requestFailed(res,error.message,error.status||500);
    }
}
