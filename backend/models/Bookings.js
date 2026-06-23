const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    // The References
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },

    // Trip Logistics
    pickupDate: { type: Date, required: true },
    pickupTime: { type: String, required: true },
    pickupLocation: { type: String, required: true },
    returnDate: { type: Date, required: true },
    returnTime: { type: String, required: true },
    returnLocation: { type: String, required: true },

    // Financials & Status
    totalPrice: { type: Number, required: true },
    addons: [{ type: String }],
    paymentStatus: { 
        type: String, 
        enum: ['Pending', 'Deposit Paid', 'Fully Paid', 'Refunded'], 
        default: 'Pending' 
    },
    orderStatus: { 
        type: String, 
        enum: ['Pending', 'Active', 'Completed', 'Cancelled'], 
        default: 'Pending' 
    },
    region: { type: String, required: true },

    // System Tracking
    lastModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);