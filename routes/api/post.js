const router = require('../index');
const {
    validateToken,validatePost
} = require('../../middlewares/auth.middleware');
const postController = require('../../controller/post.controller');


router.post('/posts', validateToken, validatePost, postController.createPost);
router.put('/posts/:postId',validateToken,validatePost,postController.updatePost);
router.get('/posts',validateToken,postController.advancedSearch);
router.get('/posts/:postId',validateToken,postController.GetPost);
router.delete('/posts/:postId',validateToken,validatePost,postController.deletePost);

module.exports = router;