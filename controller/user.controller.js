const User = require('../models/user.models');
const { redisClient: client } = require('../server');
const { encodeAccessToken } = require('../utils/helpers');
// const client = require('../utils/redis-client');

const getUser = async (req, res) => {
    const emailId = req.query.emailId

    let value = await client.get(emailId)
    if (!value) {
        value = await User.findOne({ email: emailId })
        // let newCreatedValue;

        if (!value) {
            value = await createUser(req, res, req.query)
        }

        client.set(emailId, JSON.stringify(value), 'EX', 3600)
        // await setRedisValue(emailId, value)
    } else {
        value = JSON.parse(value)
        console.log("asdasdasasd", value);
    }

    const encodedValue = encodeAccessToken(value)

    res.status(200).send(JSON.stringify(encodedValue))
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