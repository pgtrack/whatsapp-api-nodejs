const config = require('../../config/config')

function tokenVerification(req, res, next) {
    // get request path
    const path = req.path

    const bearer = req.headers.authorization
    const token = bearer?.slice(7)?.toString()
    if (!token && path !== '/status') {
        return res.status(403).send({
            error: true,
            message: 'no bearer token header was present',
        })
    }

    if (config.token !== token && path !== '/status') {
        return res
            .status(403)
            .send({ error: true, message: 'invalid bearer token supplied' })
    }
    next()
}

module.exports = tokenVerification
