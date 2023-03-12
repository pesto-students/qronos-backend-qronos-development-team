const mongoose = require('mongoose');
const User = require('../models/user.models')

const getUser = async (req, res) => {
    const value = await User.findOne({ email: '30varanshu@gmail.com' })
    console.log("allValues", value);
    if (value) {
        // res.status(200).send(JSON.stringify(value))
        // if (value.database.length < 0) {

        // }
        const database = {
            name: 'Hello'
        }
        await User.findOneAndUpdate(
            { email: '30varanshu@gmail.com' },
            { $push: { database: database } },
            { new: true }
        )
    } else {
        await createUser(req, res)
    }
    res.status(200).send(JSON.stringify(value))
}

const createUser = async (req, res) => {
    console.log(req.oidc.user);
    const user = req.oidc.user
    const userValues = await User.create({
        name: user.name,
        email: user.email,
        // database: []
    })
    console.log(userValues);
}

module.exports = {
    getUser
}