const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')

const port = process.env.PORT || 8080


const corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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
mongoose.connect(`mongodb://localhost:27017/QronosUserDB`, (error) => {
    if (error) {
        console.log("Error", error);
    } else {
        console.log("Successfully Connected");
    }
});


app.get("/", (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged In' : 'Logged Out')
})


routes(app)

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user))
})

app.listen(port, () => {
    console.log(`Server is running at PORT ${port}`);
})