const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async function auth  (req, res, next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send({message: "Access denied. No token provided."});

    try {
        const decoded = await jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).send({message: "Invalid token."});
    }
};
