const User = require('../models/user.models')

const createDatabase = async (req, res) => {
    const emailId = req.body.emailId
    const database = {
        name: req.params.name
    }
    const databaseEntry = await User.findOneAndUpdate(
        { email: emailId },
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
    console.log(blog);
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

const updateProduct = async (req, res) => {
    // const emailId = '30varanshu@gmail.com'
    const databaseId = req.params.databaseId
    const productId = req.params.entryId

    const emailId = req.body.emailId
    console.log("new Date()", new Date());
    const newProductContent = { ...req.body.product, updatedAt: new Date() }

    // console.log("qweqee", emailId, newProductContent);

    const productEntry = await User.updateOne(
        {
            email: emailId,
            'database._id': databaseId,
            'database.productTable._id': productId
        },
        {
            $set: {
                'database.$[databaseId].productTable.$[productId]': newProductContent
            }
        },
        {
            arrayFilters: [
                { 'databaseId._id': databaseId },
                { 'productId._id': productId }
            ]
        }
    ).exec()

    console.log("productEntry", productEntry);
    res.status(200).send(JSON.stringify(productEntry))
}

const updateBlog = async (req, res) => {
    // const emailId = '30varanshu@gmail.com'
    const databaseId = req.params.databaseId
    const blogId = req.params.entryId

    const emailId = req.body.emailId
    const newBlogContent = { ...req.body.blog, updatedAt: new Date() }

    const blogEntry = await User.updateOne(
        {
            email: emailId,
            'database._id': databaseId,
            'database.blogTable._id': blogId
        },
        {
            $set: {
                'database.$[databaseId].blogTable.$[blogTable]': newBlogContent
            }
        },
        {
            arrayFilters: [
                { 'databaseId._id': databaseId },
                { 'blogTable._id': blogId }
            ]
        }
    ).exec()

    console.log(blogEntry);
    res.status(200).send(JSON.stringify(blogEntry))
}

const getEntries = async (req, res) => {
    const databaseId = req.params.databaseId
    const emailId = req.query.emailId
    const entries = await User.findOne(
        {
            email: emailId,
            'database._id': databaseId
        },
        {
            "database.$": 1
        }
    ).exec()
    const { database } = entries

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

    // console.log(entriesArray);
    res.status(200).send(JSON.stringify(entriesArray))
}

module.exports = {
    createDatabase,
    createProductEntry,
    createBlogEntry,
    updateProduct,
    updateBlog,
    getEntries
}