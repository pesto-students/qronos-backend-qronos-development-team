const express = require('express');
const { getUser } = require('../controller/user.controller');
const router = express.Router()

const routes = (app) => {
    router.get('/get-user', getUser)
    app.use(router)
}

module.exports = {
    routes
}