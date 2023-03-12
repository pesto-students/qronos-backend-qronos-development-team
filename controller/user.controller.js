const mongoose = require('mongoose');
const User = require('../models/user.models')

const getUser = async (req, res) => {
    mongoose.connect(`mongodb://localhost:27017/QronosUserDB`, (error) => {
        if (error) {
            console.log("Error", error);
        } else {
            console.log("Successfully Connected");
        }
    });

    // mongoose.connection.on('connected',()=>{
    //     console.log("qweqwe");
    // })

    const value = await User.findOne({ email: '30varanshu@gmail.com' })
    console.log("allValues", value);
    if (value) {
        res.status(200).send(JSON.stringify(value))
    } else {
        await createUser(req, res)
    }
    res.send('hello')
}

const createUser = async (req, res) => {
    console.log(req.oidc.user);
    const user = req.oidc.user
    const userValues = await User.create({
        name: user.name,
        email: user.email,
        database: []
    })
    console.log(userValues);
}

module.exports = {
    getUser
}