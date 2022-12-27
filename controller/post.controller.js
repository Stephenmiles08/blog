const models = require('../database/models');
const {Op} = require('sequelize')
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
    const {title,content,category,keyword,userId} = req.body;
   try {
    const updatePost = await models.posts.update({
        title,content,category,keyword,
    },{where:{id:postId,userId}});
    if (updatePost[0] !== 1)
            throw new Exception('Unable to Update Post.',400);
    successResponse(res,{success:true},200);
   } catch (error) {
        requestFailed(res,error.message,error.status || 500);
   }
}

exports.advancedSearch = async(req,res)=>{
    const searchQuery = req.query;
    if (searchQuery){
        try {
            const adSearch = await models.posts.findAll({
                where:{
                    [Op.or]:{
                        keyword:{
                            [Op.like]:`%${searchQuery.keyword}%`
                        },
                        category:{
                            [Op.like]:`%${searchQuery.category}%`
                        },
                        content:{
                            [Op.like]:`%${searchQuery.s}%`
                        },
                        userId:{
                            [Op.eq]:searchQuery.userId
                        }
                    }
                },
                order:[
                    ['likeCount','DESC'],
                    ['commentCount','DESC'],
                    ['updatedAt','DESC']
                ]
            })
            if (!adSearch)
                    throw new Exception('Search not found.',404);
            const newPost = adSearch.map((value,index)=>{
                delete value.dataValues.id, delete value.dataValues.createdAt, delete value.dataValues.updatedAt,
                delete value.dataValues.likeCount, delete value.dataValues.commentCount
                return value.dataValues
            })
            successResponse(res,newPost,200)
        } catch (error) {
            requestFailed(res,error.message,error.status||500)
        }
    }
}

exports.GetPost = async(req,res)=>{
    const {postId} = req.params;

    try {
        const getPost = await models.posts.findOne({where:{id:postId}})
        if (!getPost)
                throw new Exception('Post not found',404)
        successResponse(res,{Title:getPost.title,Content:getPost.content},200)
    } catch (error) {
        requestFailed(res,error.message,error.status||500)
    }
}

exports.deletePost = async(req,res)=>{
    const {postId} = req.params;
    const {userId} = req.body;
    try {
        const deleteFunction = await models.posts.destroy({where:{id:postId,userId}});
        if (deleteFunction !== 1)
                throw new Exception('Unable to delete post',500)
        successResponse(res,{success:true},200)
    } catch (error) {
        requestFailed(res,error.message,error.status||500)
    }
}