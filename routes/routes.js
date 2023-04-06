const express = require('express');
const cors = require('cors')
const router = express.Router()

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
    getBlogEntry,
    deleteEntries
    // getSingleEntry
} = require('../controller/database.controller');
const { getUser } = require('../controller/user.controller');

const checkAuthentication = (req, res, func) => {
    // if (req.oidc.isAuthenticated()) {
    func(req, res)
    // } else {
    //     res.send('Please login first')
    // }
}

const allowedOrigins = [
    "http://localhost:3000",
    "https://qronos-cms.netlify.app"
]

function allowOnlySpecificOrigins(req, res, next) {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        next();
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
}

const routes = (app) => {
    router.get('/get-user', allowOnlySpecificOrigins, (req, res) => {
        checkAuthentication(req, res, getUser)
    })

    // APIs to edit entries
    router.post('/database/:name', allowOnlySpecificOrigins, (req, res) => {
        checkAuthentication(req, res, createDatabase)
    })
    //To create a new product entry
    router.post('/product/:databaseId', allowOnlySpecificOrigins, (req, res) => {
        checkAuthentication(req, res, createProductEntry)
    })
    //To create a new blog entry
    router.post('/blog/:databaseId', allowOnlySpecificOrigins, (req, res) => {
        checkAuthentication(req, res, createBlogEntry)
    })

    //Edit Entries
    router.patch('/blog/:databaseId/:entryId', allowOnlySpecificOrigins, (req, res) => {
        checkAuthentication(req, res, updateBlog)
    })
    router.patch('/product/:databaseId/:entryId', allowOnlySpecificOrigins, (req, res) => {
        checkAuthentication(req, res, updateProduct)
    })

    //Delete Entry
    router.delete(`/database/:databaseId`, allowOnlySpecificOrigins, (req, res) => {
        checkAuthentication(req, res, deleteEntries)
    })
    router.delete(`/product/:entryId`, allowOnlySpecificOrigins, (req, res) => {
        checkAuthentication(req, res, deleteProduct)
    })
    router.delete(`/blog/:entryId`, allowOnlySpecificOrigins, (req, res) => {
        checkAuthentication(req, res, deleteBlog)
    })

    // APIs to get entries
    router.get('/database/:databaseId', allowOnlySpecificOrigins, (req, res) => {
        checkAuthentication(req, res, getEntries)
    })
    // router.get('/database', (req, res) => {
    //     checkAuthentication(req, res, getSingleEntry)
    // })

    //GET Specific Entry
    router.get(`/product/:entryId`, allowOnlySpecificOrigins, (req, res) => {
        checkAuthentication(req, res, getProductEntry)
    })
    router.get(`/blog/:entryId`, allowOnlySpecificOrigins, (req, res) => {
        checkAuthentication(req, res, getBlogEntry)
    })
    router.get('/testing', (req, res) => {
        console.log("qweqeqw");
    })

    app.use(router)
}

module.exports = {
    routes
}