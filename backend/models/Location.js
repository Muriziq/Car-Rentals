// models/Location.js
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    country: { 
        type: String, 
        required: true, 
        unique: true 
    },
    states: [{  // Changed from 'regions' to 'states'
        type: String, 
        required: true 
    }],
    isActive: { 
        type: Boolean, 
        default: true 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Location', locationSchema);