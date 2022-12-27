const router = require('../index');
const likeControl = require('../../controller/like.controller');
const {validateToken,validateLike} = require('../../middlewares/auth.middleware')


router.post('/api/like',validateToken,validateLike,likeControl.like);
router.post('/api/unlike',validateToken,validateLike,likeControl.unlike);

module.exports = router;