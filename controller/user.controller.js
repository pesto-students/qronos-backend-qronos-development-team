// const mongoose = require('mongoose');
const User = require('../models/user.models')

const getUser = async (req, res) => {
    const value = await User.findOne({ email: '30varanshu@gmail.com' })
    console.log("allValues", value);

    let newCreatedValue;

    if (!value) {
        newCreatedValue = await createUser(req, res)
    }
    res.status(200).send(JSON.stringify(value))
}

const createUser = async (req, res) => {
    const user = req.oidc.user
    const userValues = await User.create({
        name: user.name,
        email: user.email,
    })
    return userValues
}

module.exports = {
    getUser
}



        // const product = {
        //     title: 'Product 2',
        //     description: 'This is Product 2',
        //     thumbnailTitle: 'Product 2',
        //     seoTitle: 'Product 2',
        //     seoDescription: 'Product 2',
        // }

        // await User.updateOne(
        //     {
        //         email: '30varanshu@gmail.com',
        //         'database._id': '640df52fc54a34c00c2b614d'
        //     },
        //     {
        //         $push: { 'database.$.productTable': product }
        //     }
        // )
