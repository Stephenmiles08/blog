const likeControl = require('../../controller/like.controller');
const {validateToken,validateLike} = require('../../middlewares/auth.middleware')

module.exports = (app)=>{
    app.post('/api/like',validateToken,validateLike,likeControl.like);
    app.post('/api/unlike',validateToken,validateLike,likeControl.unlike);
}