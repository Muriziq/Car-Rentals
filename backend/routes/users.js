const express = require('express');
const router = express.Router();
const {verifyAccessToken}= require("../middleware/verifyJWT")
const { signup,verifyEmail,login,emailVerificationRequest,logout } = require('../controllers/authController');
const { registerValidation,verifyEmailValidation,loginValidation,resendEmailVerificationValidation } = require('../middleware/authValidation');

router.post("/register",registerValidation, signup);

router.post("/verify-email",verifyEmailValidation, verifyEmail)

router.post("/login",loginValidation,login)

router.post("/resend-email-verification",resendEmailVerificationValidation, emailVerificationRequest)

router.get("/profile",verifyAccessToken,(req,res)=>{
    const user = allUsers.users.find(user => user.email === req.user);
    if(!user) {
        return res.status(400).json({msg:"User not found"})
    }
    res.status(200).json(user)
})

router.post("/logout",logout)
module.exports = router;