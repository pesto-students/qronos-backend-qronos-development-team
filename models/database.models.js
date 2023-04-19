const { default: mongoose } = require("mongoose");
const { Blog, Product } = require("./table.models");

const DatabaseModel = mongoose.Schema({
    name: {
        type: String
    },
    jwt: String,
    productTable: [Product],
    blogTable: [Blog]
})

module.exports = {
    DatabaseModel
}