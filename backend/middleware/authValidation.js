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
body('country')
        .trim().notEmpty().withMessage('Country is required').escape()
        .custom(async (value, { req }) => {
            // Query the DB to see if this country exists and is active
            const validLocation = await Location.findOne({ country: value, isActive: true });
            
            if (!validLocation) {
                throw new Error('We do not currently operate in this country.');
            }
            
            // Attach the found location document to the request object 
            // so the Region validation can use it without querying the DB a second time!
            req.validLocation = validLocation; 
            return true;
        }),

    // 2. Hierarchical Region Validation
    body('state')
        .trim().notEmpty().withMessage('state is required').escape()
        .custom((value, { req }) => {
            // Failsafe: If the country was invalid, skip this specific check
            if (!req.validLocation) return true; 

            // Check if the user's region exists INSIDE the array of the country they selected
            if (!req.validLocation.regions.includes(value)) {
                throw new Error(`Invalid region. Supported regions for ${req.validLocation.country} are: ${req.validLocation.regions.join(', ')}`);
            }
            return true;
        }),

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

exports.verifyEmailValidation = [
    body('token')
        .trim() // Removes accidental spaces copied by the user
        .notEmpty().withMessage('Verification token is missing.')
        .isString().withMessage('Invalid token format.') // Blocks NoSQL injection objects
        .isHexadecimal().withMessage('Invalid token structure.') // Pro-level check! We know crypto outputs hex.
];

exports.loginValidation = [
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
];

exports.resendEmailVerificationValidation = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email address')
        .normalizeEmail(),
];