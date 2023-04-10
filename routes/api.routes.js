const express = require('express');
const { getAllEntries } = require('../controller/api.controller');
const router = express.Router()
const jwt = require('jsonwebtoken');
const { validateTokens } = require('../utils/helpers');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const database_id = req.query.database_id
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const jwt_token = decoded.jwt

    try {
        if (jwt_token && database_id) {
            console.log(jwt_token, database_id);
            const validation = await validateTokens(jwt_token, database_id)
            if (validation) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                return next();
            } else {
                console.log("adsadas");
                return res.status(401).json({ error: 'The database does not exist' });
            }
        } else if (!jwt_token) {
            return res.status(401).json({ error: 'Invalid token' });
        } else if (!database_id) {
            return res.status(401).json({ error: 'Invalid Parameters' });
        }
    } catch (error) {
        // Token verification failed
        return res.status(401).json({ error: 'Invalid token' });
    }
}

const routesAPI = (app) => {
    router.get('/api/v1/all', verifyToken, getAllEntries)

    app.use(router)
}

module.exports = {
    routesAPI
}