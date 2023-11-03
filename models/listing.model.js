const mongoose = require('mongoose');


const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter title']
    },
    description: {
        type: String,
        required: [true, 'Plese enter description']
    },
    sizes: {
        type: [],
    },
    category: {
        type: String,
        required: [true, 'Please select a category']
    },
    types: {
        type: String,
        required: [true, 'Please select a type']
    },
    price: {
        type: String,
        required: [true, 'Please enter price']
    },
    offer: {
        type: Boolean,
        default: false
    },
    free_delivery: {
        type: Boolean,
        default: false
    },
    images: {
        type: [],
        required: [true, 'Please upload at least one image of your product']
    }
}, { timestamps: true });

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;