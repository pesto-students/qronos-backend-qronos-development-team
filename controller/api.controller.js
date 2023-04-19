const User = require('../models/user.models');
const jwt = require('jsonwebtoken');
const { getKeys } = require('../utils/helpers');

const getAllEntries = async (req, res) => {

    const {
        database_id,
        jwt_token
    } = getKeys(req)

    try {
        const table = await User.findOne({
            database: {
                $elemMatch: {
                    _id: database_id,
                    jwt: jwt_token
                }
            }
        }, {
            "database.$": 1
        })

        const { database } = table
        const entriesArray = []
        database[0].productTable.map((product) => {
            entriesArray.push({
                type: 'productType',
                ...product._doc
            })
        })

        database[0].blogTable?.map((blog) => {
            entriesArray.push({
                type: 'blogType',
                ...blog._doc
            })
        })

        // console.log("table", entriesArray);
        res.status(200).send(entriesArray)
    } catch (error) {
        // console.log(error);
        res.status(400).send(error)
    }
}

const getProductEntries = async (req, res) => {

    const {
        database_id,
        jwt_token
    } = getKeys(req)

    try {
        const table = await User.findOne({
            database: {
                $elemMatch: {
                    _id: database_id,
                    jwt: jwt_token
                }
            }
        }, {
            "database.$": 1
        })

        const { database } = table
        const entriesArray = []
        database[0].productTable.map((product) => {
            entriesArray.push({
                type: 'productType',
                ...product._doc
            })
        })
        res.status(200).send(entriesArray)
    } catch (error) {
        // console.log(error);
        res.status(400).send(error)
    }
}


const getBlogEntries = async (req, res) => {

    const {
        database_id,
        jwt_token
    } = getKeys(req)

    try {
        const table = await User.findOne({
            database: {
                $elemMatch: {
                    _id: database_id,
                    jwt: jwt_token
                }
            }
        }, {
            "database.$": 1
        })

        const { database } = table
        const entriesArray = []
        database[0].blogTable?.map((blog) => {
            entriesArray.push({
                type: 'blogType',
                ...blog._doc
            })
        })

        res.status(200).send(entriesArray)
    } catch (error) {
        // console.log(error);
        res.status(400).send(error)
    }
}

module.exports = {
    getAllEntries,
    getBlogEntries,
    getProductEntries
}