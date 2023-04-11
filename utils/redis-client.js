const redis = require('redis');
const client = redis.createClient({
    host: 'localhost',
    port: '8080'
});

// client.on('connect', function () {
//     console.log('Redis Client Connected!');
// });

module.exports = client;