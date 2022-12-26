const {
    validateToken
} = require('../../middlewares/auth.middleware');

const authController = require('../../controller/auth.controller');

module.exports = (app)=>{
    app.get('/api',authController.root);
    app.get('/api', authController.root);
    app.post('/api/signup', authController.signUp);
    app.post('/api/login', authController.login);
    app.get('/api/users/:id', validateToken, authController.getUser);
}


