const express = require('express')
const app = express()
// require('dotenv').config()
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const cors = require('cors')
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080


const corsOptions = {
    origin: process.env.BASE_URL
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


const { auth, requiresAuth } = require('express-openid-connect');
const { getUser } = require('./controller/user.controller');
const { routes } = require('./routes/routes');
const { default: mongoose } = require('mongoose')
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


app.get("/", async (req, res) => {
    // console.log(await req.oidc.)
    res.send(req.oidc.isAuthenticated() ? JSON.stringify(req.oidc.user) : 'Logged Out')
})


routes(app)

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user))
})

app.listen(port, () => {
    console.log(`Server is running at PORT ${port}`);
})