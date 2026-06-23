// Inside controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { validationResult } = require('express-validator');
const sendVerificationEmail = require('../utils/sendEmail'); // We will create this next!

exports.signup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { 
            firstName, lastName, username, email, password, 
            phoneNumber, country, state, 
            agreedToTerms, agreedToPrivacy // Extract the new fields
        } = req.body;

        // --- NEW: Strict Legal Check ---
        if (agreedToTerms !== true || agreedToPrivacy !== true) {
            return res.status(400).json({ message: "You must agree to the Terms and Privacy Policy to register." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "A user with this email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const emailVerificationToken = crypto.randomBytes(32).toString('hex');
        const emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; 

        // Save everything to the database
        const newUser = await User.create({
            firstName, lastName, username, email, password: hashedPassword,
            phoneNumber, country, state,
            agreedToTerms, agreedToPrivacy, // Save the booleans to MongoDB
            emailVerificationToken, emailVerificationExpires
        });

        const accessToken = jwt.sign(
            { id: newUser._id, role: newUser.role, region: newUser.assignedRegion }, 
            process.env.ACCESS_TOKEN, 
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { id: newUser._id }, 
            process.env.REFRESH_TOKEN, 
            { expiresIn: '7d' }
        );

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, secure: true, sameSite: 'none', 
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        // --- NEW: Where Nodemailer fires ---
        // We call our email function AFTER the user is safely in the database, 
        // but BEFORE we send the final success response to the frontend.
        // const verificationUrl = `http://localhost:5504/verify-email?token=${emailVerificationToken}`;
        // await sendVerificationEmail(newUser.email, newUser.firstName, verificationUrl);

        res.status(201).json({
            message: "Account created successfully. Please check your email to verify your account.",
            accessToken,
            user: {
                id: newUser._id, firstName: newUser.firstName, email: newUser.email
            }
        });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error during registration.", error: error.message });
    }
};