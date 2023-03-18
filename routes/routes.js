const express = require('express');
const { createDatabase, createProductEntry, createBlogEntry, updateProduct, updateBlog } = require('../controller/database.controller');
const { getUser } = require('../controller/user.controller');
const router = express.Router()

const checkAuthentication = (req, res, func) => {
    if (req.oidc.isAuthenticated()) {
        func(req, res)
    } else {
        res.send('Please login first')
    }
}

const routes = (app) => {
    router.get('/get-user', (req, res) => {
        checkAuthentication(req, res, getUser)
    })
    router.get('/database/:name', (req, res) => {
        checkAuthentication(req, res, createDatabase)
    })
    router.get('/product/:emailId/:databaseId', (req, res) => {
        checkAuthentication(req, res, createProductEntry)
    })
    router.get('/blog/:emailId/:databaseId', (req, res) => {
        checkAuthentication(req, res, createBlogEntry)
    })
    router.patch('/blog/:databaseId/:entryId', (req, res) => {
        checkAuthentication(req, res, updateBlog)
    })
    router.patch('/product/:databaseId/:entryId', (req, res) => {
        checkAuthentication(req, res, updateProduct)
    })
    app.use(router)
}

module.exports = {
    routes
}