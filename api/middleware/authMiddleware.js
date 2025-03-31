const jwt = require('jsonwebtoken');
const User = require('../models/Register');

const checkUser = (req, res, next) => {
    const token = req.cookies['jwt'];

    if (!token) {
        return res.status(401).json({ error: 'login' });
    }

    try {
        const decoded = jwt.verify(token, 'my-token');
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};


module.exports = checkUser;