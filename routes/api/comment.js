const router = require('../index');
const commentControl = require('../../controller/comment.controller');
const {validateToken, validatePost} = require('../../middlewares/auth.middleware');
const { Model } = require('sequelize');


router.post('/comments',validateToken,validatePost,commentControl.CreateComment);
router.get('/comments', validateToken,commentControl.getAllComments);
router.get('/comments/:commentId',validateToken,commentControl.getComment);
router.put('/comments/:commentId',validateToken,validatePost,commentControl.EditComment);
router.delete('/comments/:commentId',validateToken,commentControl.deleteComment)

module.exports = router;