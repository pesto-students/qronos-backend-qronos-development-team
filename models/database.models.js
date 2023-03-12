const { default: mongoose } = require("mongoose");
const { Blog } = require("./table.models");

const DatabaseModel = mongoose.Schema({
    name: {
        type: String
    },
    productTable: [Blog]
})

module.exports = {
    DatabaseModel
}