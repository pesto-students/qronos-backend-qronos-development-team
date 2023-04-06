const User = require('../models/user.models');
const { generateJwtToken } = require('../utils/helpers');

const createDatabase = async (req, res) => {
    console.log("hello");
    const emailId = req.body.emailId
    const database = {
        name: req.params.name,
        jwt: [generateJwtToken()]
    }
    const databaseEntry = await User.findOneAndUpdate(
        { email: emailId },
        { $push: { database: database } },
        { new: true }
    )

    res.set('Access-Control-Allow-Origin', '*')
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
    res.set('Access-Control-Allow-Origin', '*')
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

    res.set('Access-Control-Allow-Origin', '*')
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
    res.set('Access-Control-Allow-Origin', '*')
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
    res.set('Access-Control-Allow-Origin', '*')
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
    console.log(database);
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
    res.set('Access-Control-Allow-Origin', '*')
    res.status(200).send(JSON.stringify(entriesArray))
}

const deleteEntries = async (req, res) => {
    const databaseId = req.params.databaseId
    const productIds = req.body.productIds
    const blogIds = req.body.blogIds
    const email = req.body.email
    console.log(blogIds);
    console.log(productIds);
    if (productIds.length > 0)
        await User.updateOne(
            { email: email, "database._id": databaseId },
            { "$pull": { "database.$[database].productTable": { "_id": { "$in": productIds } } } },
            { "arrayFilters": [{ "database._id": databaseId }] }
        ).exec()
    if (blogIds.length > 0)
        await User.updateOne(
            { email: email, "database._id": databaseId },
            { "$pull": { "database.$[database].blogTable": { "_id": { "$in": blogIds } } } },
            { "arrayFilters": [{ "database._id": databaseId }] }
        ).exec()

    res.set('Access-Control-Allow-Origin', '*')
    res.status(200).send('Successfull')
}

const deleteProduct = async (req, res) => {
    // console.log(req);
    const email = req.body.email
    const entryId = req.params.entryId
    const databaseId = req.body.database
    const deleteEntry = await User.updateOne(
        { email: email, 'database._id': databaseId },
        { $pull: { 'database.$.productTable': { _id: entryId } } }
    ).exec();
    res.set('Access-Control-Allow-Origin', '*')
    res.status(200).send(JSON.stringify(deleteEntry))
}

const deleteBlog = async (req, res) => {
    // console.log(req);
    const email = req.body.email
    const entryId = req.params.entryId
    const databaseId = req.body.database
    const deleteEntry = await User.updateOne(
        { email: email, 'database._id': databaseId },
        { $pull: { 'database.$.blogTable': { _id: entryId } } }
    ).exec();
    res.set('Access-Control-Allow-Origin', '*')
    res.status(200).send(JSON.stringify(deleteEntry))
}

const getProductEntry = async (req, res) => {
    const entryId = req.params.entryId
    const databaseId = req.query.databaseId
    const emailId = req.query.email
    console.log(req.query);

    console.log(entryId);
    console.log(databaseId);
    console.log(emailId);

    try {
        await User.findOne({ email: emailId }).exec((err, userTable) => {
            if (err) throw err
            const database = userTable.database.id(databaseId)
            const entry = database.productTable.id(entryId)
            console.log("entry", entry);
            if (!entry) res.status(400).send(JSON.stringify({ message: 'Entry not found' }))
            else res.status(200).send(JSON.stringify(entry))
        })
        // console.log("result", result)
    } catch (error) {
        console.log(error);
        res.status(400).send(JSON.stringify(error))
    }

}

const getBlogEntry = async (req, res) => {
    const entryId = req.params.entryId
    const databaseId = req.query.databaseId
    const emailId = req.query.email

    console.log(req.query);

    console.log(entryId);
    console.log(databaseId);
    console.log(emailId);

    try {
        await User.findOne({ email: emailId }).exec((err, userTable) => {
            if (err) throw err
            const database = userTable.database.id(databaseId)
            const entry = database.blogTable.id(entryId)
            console.log("entry", entry);
            if (!entry) res.status(400).send(JSON.stringify({ message: 'Entry not found' }))
            else {
                res.set('Access-Control-Allow-Origin', '*')
                res.status(200).send(JSON.stringify(entry))
            }
        })
        // console.log("result", result)
    } catch (error) {
        console.log(error);
        res.status(400).send(JSON.stringify(error))
    }
}
// const getSingleEntry = async (req, res) => { 

// }

module.exports = {
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
}