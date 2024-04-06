// my-gallery/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Users, PasswordResetToken } = require('../models');
const jwt = require('jsonwebtoken');
const { sendSignUpEmail, sendPasswordResetEmail } = require('../src/utils/emailService');
const crypto = require('crypto');

function generateResetToken() {
  return crypto.randomBytes(20).toString('hex');
}

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const lowercaseEmail = email.toLowerCase();
  const JWT_SECRET_KEY = 'jpm-is-the-best-artist-not'; 


  try {
    // Check if the user already exists
    const existingUser = await Users.findOne({ where: { email: lowercaseEmail } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

     // Generate a random number between 1 and 20
     const randomNumber = Math.floor(Math.random() * 20) + 1;
     const paddedNumber = randomNumber.toString().padStart(2, '0'); 

    // Create a new user with lowercase email and assign a random profile picture URL
    const newUser = await Users.create({
      email: lowercaseEmail,
      password: hashedPassword,
      authMethod: 'email',
      profilePhotoUrl: `/userProfileImages/anonymous${paddedNumber}.jpg`,
    });
    
    // Generate username based on email and userId
    const username = `${lowercaseEmail.split('@')[0]}#${newUser.userId}`;

    // Update the user's username
    await newUser.update({ username });

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser.userId }, JWT_SECRET_KEY);

    // Include user data in the response
    const userData = {
      userId: newUser.userId,
      email: newUser.email,
      username: newUser.username,
      role: newUser.role,
      isAnonymous: newUser.isAnonymous,
      // Include any other user properties you need
    };

    res.status(201).json({ message: 'User registered successfully', token, userData });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/anonymous-signup', async (req, res) => {
  const { userId, email, password, username } = req.body;
  const lowercaseEmail = email.toLowerCase();
  const JWT_SECRET_KEY = 'jpm-is-the-best-artist-not';

  try {
    // Find the anonymous user by userId
    const anonymousUser = await Users.findByPk(userId);
    if (!anonymousUser) {
      return res.status(404).json({ error: 'Anonymous user not found' });
    }

    // Check if the email is already in use by another user
    const existingUser = await Users.findOne({ where: { email: lowercaseEmail } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the anonymous user's email, password, role, and username
    await anonymousUser.update({
      email: lowercaseEmail,
      password: hashedPassword,
      username: username,
      role: 'RegularUser',
      isAnonymous: false,
    });

    // Generate a new JWT token
    const token = jwt.sign({ userId: anonymousUser.userId }, JWT_SECRET_KEY);

    // Include user data in the response
    const userData = {
      userId: anonymousUser.userId,
      email: anonymousUser.email,
      username: anonymousUser.username,
      role: anonymousUser.role,
      isAnonymous: anonymousUser.isAnonymous,
    };

    res.status(200).json({ message: 'Anonymous user sign-up successful', token, userData });
  } catch (error) {
    console.error('Anonymous user sign-up error:', error);
    res.status(500).json({ error: 'Anonymous user sign-up failed' });
  }
});

router.post('/send-signup-email', async (req, res) => {
  const { email } = req.body;

  try {
    await sendSignUpEmail(email);
    res.status(200).json({ message: 'Sign-up email sent successfully' });
  } catch (error) {
    console.error('Error sending sign-up email:', error);
    res.status(500).json({ error: 'Failed to send sign-up email' });
  }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const lowercaseEmail = email.toLowerCase();
    const JWT_SECRET_KEY = 'jpm-is-the-best-artist-not'; 
  
    try {
      // Check if the user exists
      const user = await Users.findOne({ where: { email: lowercaseEmail } });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Compare the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user.userId }, JWT_SECRET_KEY);

      // Include user data in the response
      const userData = {
        userId: user.userId,
        email: user.email,
        role: user.role,
        // Include any other user properties you need
      };
  
      res.status(200).json({ message: 'Login successful', token, userData });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  });

  router.post('/anonymous', async (req, res) => {
    const JWT_SECRET_KEY = 'jpm-is-the-best-artist-not'; 
    try {
      // Get the current maximum userId
      const maxUserId = await Users.max('userId');

      // Generate a random number between 1 and 20
      const randomNumber = Math.floor(Math.random() * 20) + 1;
      const paddedNumber = randomNumber.toString().padStart(2, '0');

       // Create an anonymous user with the next available userId and random profile picture URL
      const anonymousUser = await Users.create({
        isAnonymous: true,
        role: 'AnonymousUser',
        username: `Anonymous#${maxUserId + 1}`,
        profilePhotoUrl: `/userProfileImages/anonymous${paddedNumber}.jpg`,
      });

      // Generate a JWT token for the anonymous user
      const token = jwt.sign({ userId: anonymousUser.userId }, JWT_SECRET_KEY);

      res.status(200).json({ message: 'Anonymous user created', token, userId: anonymousUser.userId });
    } catch (error) {
      console.error('Anonymous user creation error:', error);
      res.status(500).json({ error: 'Anonymous user creation failed' });
    }
  });

  router.post('/check-email', async (req, res) => {
    const { email } = req.body;
    const lowercaseEmail = email.toLowerCase();

    try {
      const user = await Users.findOne({ where: { email: lowercaseEmail } });
      if (user) {
        // User exists, send password reset email
        // Implement your email sending logic here
        res.status(200).json({ exists: true });
      } else {
        res.status(404).json({ exists: false });
      }
    } catch (error) {
      console.error('Error checking email:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

// Password reset request route
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const lowercaseEmail = email.toLowerCase();

  try {
    const user = await Users.findOne({ where: { email: lowercaseEmail } });

    if (user) {
      // Generate a unique password reset token
      const resetToken = generateResetToken();

      // Store the reset token in the database along with the user's email and expiration timestamp
      await PasswordResetToken.create({
        email: lowercaseEmail,
        token: resetToken,
        expires: Date.now() + 3600000, // Token expires in 1 hour
      });

      // Send the password reset email
      await sendPasswordResetEmail(lowercaseEmail, resetToken);

      res.status(200).json({ message: 'Password reset email sent' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ error: 'Failed to send password reset email' });
  }
});

// Password reset route
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;

  try {
    // Find the password reset token in the database
    const resetToken = await PasswordResetToken.findOne({ where: { token } });

    if (resetToken && resetToken.expires > Date.now()) {
      const user = await Users.findOne({ where: { email: resetToken.email } });

      if (user) {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password
        await user.update({ password: hashedPassword });

        // Delete the used reset token from the database
        await resetToken.destroy();

        res.status(200).json({ message: 'Password reset successful' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } else {
      res.status(400).json({ error: 'Invalid or expired token' });
    }
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

module.exports = router;