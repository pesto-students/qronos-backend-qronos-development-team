const { default: mongoose } = require("mongoose");
const { DatabaseModel } = require("./database.models");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    database: [DatabaseModel]
})

module.exports = User = mongoose.model('User', UserSchema)