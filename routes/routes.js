const express = require('express');
const {
    createDatabase,
    createProductEntry,
    createBlogEntry,
    updateProduct,
    updateBlog,
    getEntries,
    deleteProduct,
    deleteBlog,
    getProductEntry,
    getBlogEntry
    // getSingleEntry
} = require('../controller/database.controller');
const { getUser } = require('../controller/user.controller');
const router = express.Router()

const checkAuthentication = (req, res, func) => {
    // if (req.oidc.isAuthenticated()) {
    func(req, res)
    // } else {
    //     res.send('Please login first')
    // }
}

const routes = (app) => {
    router.get('/get-user', (req, res) => {
        checkAuthentication(req, res, getUser)
    })

    // APIs to edit entries
    router.post('/database/:name', (req, res) => {
        checkAuthentication(req, res, createDatabase)
    })
    //To create a new product entry
    router.post('/product/:databaseId', (req, res) => {
        checkAuthentication(req, res, createProductEntry)
    })
    //To create a new blog entry
    router.post('/blog/:databaseId', (req, res) => {
        checkAuthentication(req, res, createBlogEntry)
    })

    //Edit Entries
    router.patch('/blog/:databaseId/:entryId', (req, res) => {
        checkAuthentication(req, res, updateBlog)
    })
    router.patch('/product/:databaseId/:entryId', (req, res) => {
        checkAuthentication(req, res, updateProduct)
    })

    //Delete Entry
    router.delete(`/product/:entryId`, (req, res) => {
        checkAuthentication(req, res, deleteProduct)
    })
    router.delete(`/blog/:entryId`, (req, res) => {
        checkAuthentication(req, res, deleteBlog)
    })

    // APIs to get entries
    router.get('/database/:databaseId', (req, res) => {
        checkAuthentication(req, res, getEntries)
    })
    // router.get('/database', (req, res) => {
    //     checkAuthentication(req, res, getSingleEntry)
    // })

    //GET Specific Entry
    router.get(`/product/:entryId`, (req, res) => {
        checkAuthentication(req, res, getProductEntry)
    })
    router.get(`/blog/:entryId`, (req, res) => {
        checkAuthentication(req, res, getBlogEntry)
    })

    app.use(router)
}

module.exports = {
    routes
}