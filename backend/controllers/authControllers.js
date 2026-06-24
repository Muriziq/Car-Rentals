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
        const verificationUrl = `http://localhost:5504/verify-email?token=${emailVerificationToken}`;
        await sendVerificationEmail(newUser.email, newUser.firstName, verificationUrl);

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

exports.verifyEmail = async (req,res)=>{
try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
        // 1. Grab the token sent by the frontend
        const { token } = req.body;

        // 2. Find the user with this exact token
        const user = await User.findOne({ emailVerificationToken: token });

        if (!user) {
            return res.status(400).json({ message: "Invalid verification token." });
        }

        // 3. Check if the token has expired
        if (user.emailVerificationExpires < Date.now()) {
            return res.status(400).json({ message: "This verification link has expired. Please request a new one." });
        }

        // 4. Success! Flip the verification status to true
        user.isEmailVerified = true;

        // 5. Clean up the database by deleting the used token and expiration date
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;

        // 6. Save the updated user document
        await user.save();

        res.status(200).json({ message: "Email verified successfully! You can now log in and rent cars." });

    } catch (error) {
        console.error("Email Verification Error:", error);
        res.status(500).json({ message: "Server error during email verification." });
    }
}

exports.login = async (req,res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {email,password} = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        if (!user.isEmailVerified) {
            return res.status(400).json({ message: "Email not verified. Please verify your email to log in." });
        }
        const isPasswordValid = bcrypt.compareSync(password,user.password);
        if(!isPasswordValid) {
            return res.status(400).json({msg:"Invalid password"})
        }
        const accessToken = jwt.sign({id: user._id, role: user.role, region: user.assignedRegion}, process.env.ACCESS_TOKEN, {expiresIn: "15m"});
        const refreshToken = jwt.sign({id: user._id}, process.env.REFRESH_TOKEN, {expiresIn: "7d"});
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true, secure: true, sameSite: "none", maxAge: 7 * 24 * 60 * 60 * 1000
        });
        user.refreshToken = refreshToken;
        await user.save();
        res.status(200).json({accessToken, user: {id: user._id, firstName: user.firstName, email: user.email}});
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error during login." });
    }
}

exports.emailVerificationRequest = async (req,res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {email} = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        if (user.isEmailVerified) {
            return res.status(400).json({ message: "Email already verified." });
        }
        if (user.emailVerificationToken && user.emailVerificationExpires > Date.now()) {
            return res.status(400).json({ message: "A verification email has already been sent. Please check your email." });
        }
        const emailVerificationToken = crypto.randomBytes(32).toString('hex');
        const emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; 
        user.emailVerificationToken = emailVerificationToken;
        user.emailVerificationExpires = emailVerificationExpires;
        await user.save();
        const verificationUrl = `http://localhost:5504/verify-email?token=${emailVerificationToken}`;
        await sendVerificationEmail(user.email, user.firstName, verificationUrl);
        res.status(200).json({ message: "Verification email sent successfully." });
    } catch (error) {
        console.error("Email Verification Request Error:", error);
        res.status(500).json({ message: "Server error during email verification request." });
    }
}

exports.logout = async (req,res) =>{
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token found." });
        }
        const user = await User.findOne({ refreshToken });
        if (!user) {
            return res.status(401).json({ message: "User not found." });
        }
        user.refreshToken = "";
        await user.save();
        res.clearCookie("refreshToken", {
            httpOnly: true, 
            secure: true, 
            sameSite: "none", 
            maxAge: 0
        });
        res.status(200).json({ message: "Logout successful." });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: "Server error during logout." });
    }
}