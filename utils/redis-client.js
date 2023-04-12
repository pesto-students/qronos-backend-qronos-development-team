const redis = require('redis');
// (async () => {
const client = redis.createClient();
client.on('error', (error) => console.log(`redis error ${error}`))
client.connect()
// })

// client.on('connect', function () {
//     console.log('Redis Client Connected!');
// });

module.exports = client;