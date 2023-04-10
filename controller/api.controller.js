const User = require('../models/user.models');
const jwt = require('jsonwebtoken');

const getAllEntries = async (req, res) => {

    const authHeader = req.headers.authorization;
    const database_id = req.query.database_id
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const jwt_token = decoded.jwt
    console.log(database_id, jwt_token);
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

        console.log("table", entriesArray);
        res.status(200).send(entriesArray)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllEntries
}