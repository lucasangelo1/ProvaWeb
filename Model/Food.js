const mongoose = require('mongoose');


const FoodSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Id: {
        type: Number,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    ExpirationDate: {
        type: Date,
        required: true
    },
    Price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Food', FoodSchema);