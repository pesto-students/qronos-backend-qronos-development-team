// const redis = require('redis');
// // (async () => {
// let client

// if (process.env.NODE_ENV === "production")
//     client = redis.createClient({
//         url: 'rediss://red-cgrfa8rk9u56e3mh0te0:MpSGU3inJxvUMFPJ8bjHooBnCK98fH4C@singapore-redis.render.com:6379'
//     })
// else
//     client = redis.createClient();

// client.on('error', (error) => {
//     console.log(process.env.NODE_ENV === "production", !!process.env.PRODUCTION);
//     console.log(process.env.REDIS_HOST, process.env.REDIS_PORT, process.env.REDIS_USERNAME, process.env.REDIS_PWD);
//     console.log(`redis error ${error}`)
// })
// console.log("client", client)
// client.connect()
// // })

// // client.on('connect', function () {
// //     console.log('Redis Client Connected!');
// // });

// module.exports = client;