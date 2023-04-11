const client = require("./redis-client")

const setRedisValue = async (key, data) => {
    if (!data || !key)
        return false
    console.log("SetValue", key, data);
    await client.connect()
    client.set(key, data, 'EX', 3600)
    return true
}

const getRedisValue = async (key) => {
    if (!key) return false

    let data
    await client.connect()
    client.on('ready', async () => {
        // Redis client is ready to be used
        data = await client.get(key)
    });

    console.log("getValue", key);
    console.log("getValue", data);

    if (!data) return false

    return data
}

module.exports = {
    setRedisValue,
    getRedisValue
}