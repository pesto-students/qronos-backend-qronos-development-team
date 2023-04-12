const redis = require('redis');
// (async () => {
const client = process.env.NODE_ENV === "production"
    ? redis.createClient({
        // socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        // },
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PWD
    })
    : redis.createClient();

client.on('error', (error) => {
    console.log(process.env.NODE_ENV === "production", !!process.env.PRODUCTION);
    console.log(process.env.REDIS_HOST, process.env.REDIS_PORT, process.env.REDIS_USERNAME, process.env.REDIS_PWD);
    console.log(`redis error ${error}`)
})
client.connect()
// })

// client.on('connect', function () {
//     console.log('Redis Client Connected!');
// });

module.exports = client;