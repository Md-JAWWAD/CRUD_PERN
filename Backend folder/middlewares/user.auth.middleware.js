const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = function userVerify (req, res, next) {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
       token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        return res.status(400).json({
            msg: "token not provided or token error",
            data: token
        })}

        try {
            decodedToken = jwt.verify(token, process.env.SECRET_KEY)
            req.user = decodedToken
            next()
        } catch (error) {
          return res.status(400).json({
            msg: error.message,
            data: error,
            status: error.status || 'false' 
        })  
        }
        
}