const router = require('../index');
const likeControl = require('../../controller/like.controller');
const {validateToken,validateLike} = require('../../middlewares/auth.middleware')


router.post('/like',validateToken,validateLike,likeControl.like);
router.post('/unlike',validateToken,validateLike,likeControl.unlike);

module.exports = router;