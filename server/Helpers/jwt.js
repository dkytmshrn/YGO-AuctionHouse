const jwt = require ('jsonwebtoken')

const signToken = (payload) => {
    return jwt.sign(payload, process.env.secret_jwt)
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.secret_jwt)
}

module.exports = {signToken, verifyToken}