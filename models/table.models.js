const { default: mongoose } = require("mongoose");

const Product = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnailTitle: {
        type: String,
    },
    seoTitle: {
        type: String,
    },
    seoDescription: {
        type: String,
    },
    price: {
        type: Number
    },
    sku: {
        type: String
    },
    priceCountryCode: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})


const Blog = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    thumbnailTitle: {
        type: String,
    },
    seoTitle: {
        type: String,
    },
    seoDescription: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = {
    Product,
    Blog
}