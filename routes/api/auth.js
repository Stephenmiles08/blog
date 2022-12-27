const router = require('../index')
const {
    validateToken
} = require('../../middlewares/auth.middleware');

const authController = require('../../controller/auth.controller');

router.get('/',authController.root);
router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/users/:id', validateToken, authController.getUser);

module.exports = router;

