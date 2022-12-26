const models = require('../database/models');

exports.authUser = (user) => {
    return new Promise((resolve, reject) => {
        models.users.findOne({
            where: {
                email: user.email
            }
        }).then(async (response) => {
            if (!response) {
                resolve({
                    'error': 'Email or passwords don\' match',
                    'state': 1
                });
            } else {
                if (!response.dataValues.password ||
                    !await response.validPassword(user.password,
                        response.dataValues.password)) {
                    resolve({
                        'error': 'Email or passwords don\' match',
                        'state': 2
                    });
                } else {
                    resolve({
                        'response': {id:response.dataValues.id,username:response.dataValues.username},
                        'state': 3
                    })
                }
            }
        })
    })
}