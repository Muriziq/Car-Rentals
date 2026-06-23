const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // Account Basics & Contact
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePictureUrl: { type: String, default: '' },
    phoneNumber: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },

    // Security & Verification
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    emailVerificationExpires: { type: Date },
    dateOfBirth: { type: Date },
    driversLicenseDetails: { type: mongoose.Schema.Types.Mixed }, // Can be an object or string
    verificationStatus: { 
        type: String, 
        enum: ['Pending', 'Approved', 'Rejected'], 
        default: 'Pending' 
    },

    // Permissions & Legal
    agreedToTerms: { type: Boolean, required: true },
    agreedToPrivacy: { type: Boolean, required: true },
    role: { 
        type: String, 
        enum: ['customer', 'regional-editor', 'super-admin'], 
        default: 'customer' 
    },
    assignedRegion: { type: String, default: null }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);