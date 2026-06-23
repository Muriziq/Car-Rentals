// Inside utils/sendEmail.js
const nodemailer = require('nodemailer');

const sendVerificationEmail = async (userEmail, firstName, verificationUrl) => {
    try {
        // 1. Configure the "Transporter" (The email service you are using)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // e.g., yourcompany@gmail.com
                pass: process.env.EMAIL_PASS  // An "App Password" generated in your Google Account settings
            }
        });

        // 2. Format the actual email content
        const mailOptions = {
            from: `"Your Rental Company" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: 'Verify your email address',
            html: `
                <h2>Hello ${firstName}!</h2>
                <p>Welcome to our platform. Please click the link below to verify your account so you can start renting cars:</p>
                <a href="${verificationUrl}" style="padding: 10px 20px; background-color: #e20c26; color: white; text-decoration: none; border-radius: 5px;">Verify My Email</a>
                <p>If the button doesn't work, copy and paste this link into your browser:</p>
                <p>${verificationUrl}</p>
                <p>This link will expire in 24 hours.</p>
            `
        };

        // 3. Send it!
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent successfully to ${userEmail}`);

    } catch (error) {
        console.error("Error sending email:", error);
        // Note: Even if the email fails, we don't necessarily want to crash the whole signup process, 
        // which is why this error is just logged.
    }
};

module.exports = sendVerificationEmail;