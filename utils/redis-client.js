const redis = require('redis');
let client
(async () => {
    client = redis.createClient();
    client.on('error', (error) => console.log(`redis error ${error}`))
    await client.connect()
})

// client.on('connect', function () {
//     console.log('Redis Client Connected!');
// });

module.exports = client;