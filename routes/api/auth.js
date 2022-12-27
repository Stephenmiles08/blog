const router = require('../index')
const {
    validateToken,validateLike
} = require('../../middlewares/auth.middleware');

const authController = require('../../controller/auth.controller');

router.get('/',authController.root);
router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/users/:userId', validateToken, validateLike, authController.getUser);

module.exports = router;

