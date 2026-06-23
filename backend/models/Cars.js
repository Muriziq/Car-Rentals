const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    // Vehicle Specs & Visuals
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    transmission: { type: String, enum: ['Automatic', 'Manual'], required: true },
    seatCount: { type: Number, required: true },
    description: { type: String, required: true },
    images: [{ type: String }], // Array of strings from Multer

    // Pricing & Logistics
    pricePerDay: { type: Number, required: true },
    dynamicPricingEnabled: { type: Boolean, default: false },
    region: { type: String, required: true },

    // Status & Availability
    status: { 
        type: String, 
        enum: ['Available', 'Rented', 'In Maintenance'], 
        default: 'Available' 
    },
    operationalStatus: { 
        type: String, 
        enum: ['Ready for Rent', 'In Maintenance', 'Pending Inspection'], 
        default: 'Ready for Rent' 
    },

    // Audit Trail
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lastModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Car', carSchema);