const Exception = function (message, status) {
    this.message = message;
    this.status = status
}


const successResponse = async (res, message, status) => {
    return res.status(status).json({
        message
    })
}
const requestFailed = async (res, err, status) => {
    return res.status(status).json({
        'error': err
    })
}
module.exports = {
    Exception,
    successResponse,
    requestFailed
}