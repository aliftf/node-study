const mongoose = require('mongoose');

// Create a model for contact
const Contact = mongoose.model('Contact', { // Collection name 'contacts'
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String
    }
});

module.exports = Contact; // Export the model