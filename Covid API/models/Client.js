const mongoose = require("mongoose");

// Client is a visitor
//Rules
const requirements = {
    type: String,
    required: true
};

const addressInfo = {
    streetAddress: requirements,
    town: String,
    postalCode: String
};

const addressModel = mongoose.Schema({
    addressA: addressInfo,
    addressB: addressInfo
});

const clientModel = mongoose.Schema({
    name: requirements,
    surname: requirements,
    cellphone: {
        type: String,
        length: 10,
        required: false
    },
    age: {
        type: Number
    },
    sex: {
        type: Number,
        min: 1, //1. Male 2. Female 3. Other or did not specify
        max: 3
    },
    date: {
        type: Date,
        default: Date.now
    },
    address: addressModel
});

const clients = mongoose.model("clients", clientModel);

module.exports = clients;