// const mongoose = require('mongoose');
const User = require('../models/user.models')

const getUser = async (req, res) => {
    const emailId = req.query.emailId
    const value = await User.findOne({ email: emailId })
    let newCreatedValue;
    
    if (!value) {
        newCreatedValue = await createUser(req, res, req.query)
    }
    res.status(200).send(JSON.stringify(value ? value : newCreatedValue))
}

const createUser = async (req, res, body) => {
    // const user = req.oidc.user
    const userValues = await User.create({
        name: body.name,
        email: body.emailId,
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
