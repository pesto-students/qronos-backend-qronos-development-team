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
    const emailId = req.params.emailId
    const databaseId = req.params.databaseId

    console.log(emailId, databaseId);

    const product = {
        title: 'Product 2',
        description: 'This is Product 2',
        thumbnailTitle: 'Product 2',
        seoTitle: 'Product 2',
        seoDescription: 'Product 2',
        price: '20',
        sku: '123',
        priceCountryCode: 'USD'
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
    const emailId = req.params.emailId
    const databaseId = req.params.databaseId

    const blog = {
        title: 'Blog 2',
        description: 'This is Blog 2',
        thumbnailTitle: 'Blog 2',
        seoTitle: 'Blog 2',
        seoDescription: 'Blog 2',
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

    console.log("blog", tableEntry);
    res.status(200).send(JSON.stringify(tableEntry))
}


module.exports = {
    createDatabase,
    createProductEntry,
    createBlogEntry
}