const { body } = require('express-validator');

exports.registerValidation = [
    // 1. Validate and Sanitize basic text fields
    body('firstName').trim().notEmpty().withMessage('First name is required').escape(),
    body('lastName').trim().notEmpty().withMessage('Last name is required').escape(),
    body('username').trim().notEmpty().withMessage('Username is required').escape(),
    
    // 2. Validate and Sanitize Email
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email address')
        .normalizeEmail(), 

    // 3. Validate Password 
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

    // 4. Validate Location and Contact
    body('phoneNumber').trim().notEmpty().withMessage('Phone number is required').escape(),
    body('country').trim().notEmpty().withMessage('Country is required').escape(),
    body('state').trim().notEmpty().withMessage('State is required').escape(),

    // 5. NEW: Validate Legal Agreements
    body('agreedToTerms')
        .isBoolean().withMessage('Agreement format is invalid')
        .custom((value) => value === true)
        .withMessage('You must agree to the Terms and Conditions to register.'),
        
    body('agreedToPrivacy')
        .isBoolean().withMessage('Agreement format is invalid')
        .custom((value) => value === true)
        .withMessage('You must agree to the Privacy Policy to register.')
];