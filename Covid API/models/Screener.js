const mongoose = require("mongoose");

const screenerModel = mongoose.Schema({
    _id: {
        type: String,
        length: 13,
        required: true
    },
    name: {
        type: String,
        min: 4,
        max: 255,
        required: true
    },
    email: {
        type: String, 
        min: 6,
        max: 255,
        required: true
    },
    password: {
        type: String,
        min: 8,
        max: 255,
        required: true
    },
    isActive: {
        required: true,
        type: Boolean
    },
    userType: {
        type: Number,
        required: true,
        min: 1, //1. Assistant 2. Teacher 3. Principal
        max: 3
    },
    addedAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const screeners = mongoose.model("screeners", screenerModel);

module.exports = screeners;