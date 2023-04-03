const express = require('express');
const { getAllEntries } = require('../controller/api.controller');
const router = express.Router()
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    const JWT_SECRET_KEY = "95f3796f1ed430edcb49916f111bed"

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);

    try {
        // Verify the token using the secret key or public key
        // Check if the subdocument identifier is included in the decoded JWT payload
        // if (decoded.subdocumentId) {
        //     // Subdocument identifier found, continue with the request
        //     req.subdocumentId = decoded.subdocumentId;
        //     return next();
        // } else {
        //     // Subdocument identifier not found, deny the request
        //     return res.status(401).json({ error: 'Invalid token' });
        // }
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