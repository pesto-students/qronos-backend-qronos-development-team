const User = require('../models/user.models')

const createDatabase = async (req, res) => {

    const database = {
        name: req.params.name
    }

    const databaseEntry = await User.findOneAndUpdate(
        { email: '30varanshu@gmail.com' },
        { $push: { database: database } },
        { new: true }
    )

    res.status(200).send(JSON.stringify(databaseEntry))
}

const createProductEntry = async (req, res) => {
    // const emailId = req.params.emailId
    const databaseId = req.params.databaseId

    const emailId = req.body.emailId
    const product = req.body.product

    if (!emailId || !product) {
        res.status(400).send('Please send the data in a proper structure')
    }

    const tableEntry = await User.updateOne(
        {
            email: emailId,
            'database._id': databaseId
        },
        {
            $push: { 'database.$.productTable': product }
        }
    )

    console.log("product", tableEntry);
    res.status(200).send(JSON.stringify(tableEntry))
}

const createBlogEntry = async (req, res) => {
    const databaseId = req.params.databaseId

    const emailId = req.body.emailId
    const blog = req.body.blog

    if (!emailId || !blog) {
        res.status(400).send('Please send the data in a proper structure')
    }

    const tableEntry = await User.updateOne(
        {
            email: emailId,
            'database._id': databaseId
        },
        {
            $push: { 'database.$.blogTable': blog }
        }
    )

    res.status(200).send(JSON.stringify(tableEntry))
}


module.exports = {
    createDatabase,
    createProductEntry,
    createBlogEntry
}