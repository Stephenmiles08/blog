const models = require('../database/models');
const {
    requestFailed,
    Exception,
    successResponse
} = require('../lib/codebits');
exports.createPost = async (req, res) => {
    const {
        title,
        content,
        username,
        category,
        keyword,
        userId
    } = req.body;
    try {
        const uploadPost = await models.posts.create({
            title,
            content,
            userAuthor:username,
            category,
            keyword,
            userId
        })
        if (!uploadPost)
            throw new Exception('Post upload failed.', 400)
        successResponse(res, {
            title: uploadPost.title,
            content: uploadPost.content,
            postId: uploadPost.id,
        }, 200)
    } catch (error) {
        switch (error.parent.code) {
            case '23502':
                error.message = 'not all fields where inputted.';
                error.status = 400
                break;
            default:
                break;
        }
        requestFailed(res, error.message, error.status || 500);
    }
}

exports.updatePost = async(req,res)=>{
    const {postId} = req.params;
    const {title,content,category,keyword} = req.body;
   try {
    const updatePost = await models.posts.update({
        title,content,category,keyword,
    },{where:{id}});
    if (updatePost[0] !== 1)
            throw new Exception('Unable to Update Post.',400);
    successResponse(res,{success:true},200);
   } catch (error) {
        requestFailed(res,error.message,error.status || 500);
   }
}

exports.deletePost = async(req,res)=>{
    const {postId} = req.params;
    const {userId} = req.body;
    try {
        const postOwner = await models.posts.findOne({where:{userId,id:postId}})
        if (!postOwner)
                throw new Exception('Unauthorized request!',403)
        const deleteFunction = await models.posts.destroy({where:{id:postOwner.id}});
        if (deleteFunction !== 1)
                throw new Exception('Unable to delete post',500)
        successResponse(res,{success:true},200)
    } catch (error) {
        requestFailed(res,error.message,error.status||500)
    }
}