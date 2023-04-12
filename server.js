const express = require('express')
const app = express()
const redis = require('redis');
// require('dotenv').config()
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}


const cors = require('cors')
const bodyParser = require('body-parser');
// const cli
const port = process.env.PORT || 8080

const client = require('./utils/redis-client')

const corsOptions = {
    origin: process.env.BASE_URL
};

// let client = redis.createClient();
// client.on('error', (error) => console.log(`redis error ${error}`))
// client.connect()

// module.exports.redisClient = client;


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


const { auth, requiresAuth } = require('express-openid-connect');
const { getUser } = require('./controller/user.controller');
const { routes } = require('./routes/routes');
const { default: mongoose } = require('mongoose');
const { routesAPI } = require('./routes/api.routes');
app.use(
    auth({
        authRequired: false,
        auth0Logout: true,
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        baseURL: process.env.BASE_URL,
        clientID: process.env.CLIENT_ID,
        secret: process.env.SECRET,
        // idpLogout: true,
    })
);

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI, (error) => {
    if (error) {
        console.log("Error", error);
    } else {
        console.log("Successfully Connected");
    }
});


// app.get("/", async (req, res) => {
//     // console.log(await req.oidc.)
//     res.send(req.oidc.isAuthenticated() ? JSON.stringify(req.oidc.user) : 'Logged Out')
// })


routes(app)
routesAPI(app)

// app.get('/profile', requiresAuth(), (req, res) => {
//     res.send(JSON.stringify(req.oidc.user))
// })

app.listen(port, () => {
    console.log(`Server is running at PORT ${port}`);
})