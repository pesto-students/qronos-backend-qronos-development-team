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
        required: true
    },
    seoTitle: {
        type: String,
        required: true
    },
    seoDescription: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    sku: {
        type: String
    },
    priceCountryCode: {
        type: String
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })


const Blog = mongoose.Schema({
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
        required: true
    },
    seoTitle: {
        type: String,
        required: true
    },
    seoDescription: {
        type: String,
        required: true
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })


module.exports = {
    Product,
    Blog
}