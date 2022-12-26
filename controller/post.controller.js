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
            content: uploadPost.content
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