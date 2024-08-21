// my-gallery/src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Users, PersonContactInfo, OrganizationContactInfo, PasswordResetToken, Referrals, DiscountCodes } = require('../../models');
const jwt = require('jsonwebtoken');
const { sendReferrerNotification, sendSignUpEmail, sendPasswordResetEmail, sendReferralEmail, sendRewardNotificationToReferrer } = require('../../src/utils/emailService');
const { getUserDetails } = require('../../src/utils/userService'); // Import getUserDetails here
const crypto = require('crypto');
const JWT_SECRET_KEY = 'jpm-is-the-best-artist-not';

function generateResetToken() {
  return crypto.randomBytes(20).toString('hex');
}

// Generate a unique referral code
function generateReferralCode() {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
}

router.post('/register', async (req, res) => {
  const { email, password, referralCode } = req.body;
  const lowercaseEmail = email.toLowerCase();

  try {
    const existingUser = await Users.findOne({ where: { email: lowercaseEmail } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    const paddedNumber = randomNumber.toString().padStart(2, '0');

    const newUser = await Users.create({
      email: lowercaseEmail,
      password: hashedPassword,
      authMethod: 'email',
      profilePhotoUrl: `/userProfileImages/anonymous${paddedNumber}.jpg`,
    });

    await newUser.update({
      createdBy: newUser.userId,
      creationReason: 'User Sign-up',
    });

    const username = `${lowercaseEmail.split('@')[0]}#${newUser.userId}`;
    await newUser.update({ username });

    if (referralCode) {
      const referral = await Referrals.findOne({ 
        where: { 
          referralCode: referralCode,
          referredEmail: lowercaseEmail,
          status: 'pending'
        } 
      });

      if (referral) {
        referral.status = 'signed_up';
        await referral.save();

        // Ensure referrerId is numeric
        if (referral.referrerId && !isNaN(referral.referrerId)) {
          await sendReferrerNotification(referral.referrerId, newUser.PersonContactInfo?.firstName, newUser.PersonContactInfo?.lastName, newUser.email);
        } else {
          console.error('Invalid referrerId:', referral.referrerId);
        }
      }
    }

    const token = jwt.sign({ userId: newUser.userId }, JWT_SECRET_KEY);

    const userData = {
      userId: newUser.userId,
      email: newUser.email,
      username: newUser.username,
      role: newUser.role,
      isAnonymous: newUser.isAnonymous,
    };

    res.status(201).json({ message: 'User registered successfully', token, userData });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/referralSignUp', async (req, res) => {
  const { email, password, firstName, lastName, referralCode } = req.body;
  const lowercaseEmail = email.toLowerCase();

  try {
    // Check if the user already exists
    const existingUser = await Users.findOne({ where: { email: lowercaseEmail } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a random profile photo number
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    const paddedNumber = randomNumber.toString().padStart(2, '0');

    // Create the new user
    const newUser = await Users.create({
      email: lowercaseEmail,
      password: hashedPassword,
      authMethod: 'email',
      profilePhotoUrl: `/userProfileImages/anonymous${paddedNumber}.jpg`,
    });

    // Update the user with additional information
    await newUser.update({
      createdBy: newUser.userId,
      creationReason: 'User Sign-up',
    });

    // Create a unique username for the user
    const username = `${lowercaseEmail.split('@')[0]}#${newUser.userId}`;
    await newUser.update({ username });

    // Save the first and last name to PersonContactInfo if the user is a person
    await PersonContactInfo.create({
      userId: newUser.userId,
      firstName,
      lastName,
      primaryEmail: lowercaseEmail,
    });

    // Handle the referral logic if a referral code is provided
    if (referralCode) {
      const referral = await Referrals.findOne({ where: { referralCode } });

      if (referral && referral.referrerId && !isNaN(referral.referrerId)) {
        referral.status = 'signed_up';
        referral.referredUserId = newUser.userId; // Record the referred user's userId
        await referral.save();

        // Send notification to referrer
        const referrer = await Users.findOne({ where: { userId: referral.referrerId } });

        if (referrer) {
          let referrerFirstName = '';
          let referrerLastName = '';

          if (referrer.entityType === 'Person') {
            const referrerContact = await PersonContactInfo.findOne({ where: { userId: referrer.userId } });
            referrerFirstName = referrerContact?.firstName || '';
            referrerLastName = referrerContact?.lastName || '';
          }

          await sendReferrerNotification(
            referral.referrerId,
            firstName,
            lastName,
            lowercaseEmail
          );
        } else {
          console.error('Referrer not found:', referral.referrerId);
        }
      } else {
        console.error('Invalid referral or referrerId:', referral);
      }
    }

    // Generate a JWT token for the new user
    const token = jwt.sign({ userId: newUser.userId }, JWT_SECRET_KEY);

    // Prepare the user data to be sent in the response
    const userData = {
      userId: newUser.userId,
      email: newUser.email,
      username: newUser.username,
      role: newUser.role,
      isAnonymous: newUser.isAnonymous,
    };

    // Send the success response
    res.status(201).json({ message: 'User registered successfully', token, userData });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});



router.post('/anonymous-signup', async (req, res) => {
  const { userId, email, password, username } = req.body;
  const lowercaseEmail = email.toLowerCase();

  try {
    const anonymousUser = await Users.findByPk(userId);
    if (!anonymousUser) {
      return res.status(404).json({ error: 'Anonymous user not found' });
    }

    const existingUser = await Users.findOne({ where: { email: lowercaseEmail } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await anonymousUser.update({
      email: lowercaseEmail,
      password: hashedPassword,
      username: username,
      role: 'RegularUser',
      isAnonymous: false,
      createdBy: userId,
      creationReason: 'Anonymous User Sign-up',
    });

    const token = jwt.sign({ userId: anonymousUser.userId }, JWT_SECRET_KEY);

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

  try {
    const user = await Users.findOne({ where: { email: lowercaseEmail } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.userId }, JWT_SECRET_KEY);

    const userData = {
      userId: user.userId,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({ message: 'Login successful', token, userData });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

router.post('/anonymous', async (req, res) => {
  try {
    const maxUserId = await Users.max('userId');
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    const paddedNumber = randomNumber.toString().padStart(2, '0');

    const anonymousUser = await Users.create({
      isAnonymous: true,
      role: 'AnonymousUser',
      authMethod: 'email',
      username: `Anonymous#${maxUserId + 1}`,
      profilePhotoUrl: `/userProfileImages/anonymous${paddedNumber}.jpg`,
    });

    await anonymousUser.update({
      createdBy: anonymousUser.userId,
      creationReason: 'Anonymous Sign-up',
    });

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
      res.status(200).json({ exists: true, userId: user.userId });
    } else {
      res.status(404).json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking email:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const lowercaseEmail = email.toLowerCase();

  try {
    const user = await Users.findOne({ where: { email: lowercaseEmail } });

    if (user) {
      const resetToken = generateResetToken();
      await PasswordResetToken.create({
        email: lowercaseEmail,
        token: resetToken,
        expires: Date.now() + 3600000,
      });

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

router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;

  try {
    const resetToken = await PasswordResetToken.findOne({ where: { token } });

    if (resetToken && resetToken.expires > Date.now()) {
      const user = await Users.findOne({ where: { email: resetToken.email } });

      if (user) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await user.update({ password: hashedPassword });
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

router.get('/user', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const user = await Users.findByPk(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User data retrieved:', user);
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

router.post('/send-referral', async (req, res) => {
  const { friendFirstName, friendLastName, friendEmail, referrerEmail } = req.body;

  try {
    // Find the referrer by their email
    const referrer = await Users.findOne({ where: { email: referrerEmail } });

    if (!referrer) {
      return res.status(404).json({ error: 'Referrer not found' });
    }

    // Log the userId before calling getUserDetails
    console.log('Referrer userId:', referrer.userId);

    // Use the getUserDetails function to retrieve referrer information
    const { entityType, firstName, lastName, organizationName } = await getUserDetails(referrer.userId);

    const referrerName = entityType === 'Organization' ? organizationName : `${firstName} ${lastName}`;

    // Check if the email is already registered
    const existingUser = await Users.findOne({ where: { email: friendEmail } });
    if (existingUser) {
      return res.status(400).json({ message: 'This email is already registered.' });
    }

    // Check if someone else has already sent a referral to this email
    const existingReferral = await Referrals.findOne({ where: { referredEmail: friendEmail } });
    if (existingReferral) {
      return res.status(400).json({ message: 'This email has already been referred by someone else.' });
    }

    // Generate a unique referral code
    const referralCode = generateReferralCode();

    // Create referral entry
    await Referrals.create({
      referrerId: referrer.userId,
      referredEmail: friendEmail,
      referralCode: referralCode,
      status: 'pending'
    });

    // Generate a referral link
    const referralLink = `http://localhost:3000/register?referralCode=${referralCode}`;

    // Send referral email with the correct details
    await sendReferralEmail(referrer.userId, friendEmail, referralLink, friendFirstName, friendLastName);

    res.status(200).json({ message: 'Referral email sent successfully. Feel free to send another referral.' });
  } catch (error) {
    console.error('Error sending referral email:', error.message);
    res.status(500).json({ error: 'Failed to send referral email' });
  }
});

router.get('/api/referrer-details/:saleId', async (req, res) => {
  const { saleId } = req.params;

  try {
    const reward = await Reward.findOne({ where: { saleId } });

    if (!reward || !reward.userId) {
      return res.status(404).json({ error: 'Referrer not found for the given saleId' });
    }

    const referrer = await Users.findOne({ where: { userId: reward.userId } });

    if (!referrer) {
      return res.status(404).json({ error: 'Referrer not found' });
    }

    const referrerContactInfo = referrer.entityType === 'Person'
      ? await PersonContactInfo.findOne({ where: { userId: referrer.userId } })
      : await OrganizationContactInfo.findOne({ where: { userId: referrer.userId } });

    const referrerName = referrer.entityType === 'Person'
      ? `${referrerContactInfo?.firstName || ''} ${referrerContactInfo?.lastName || ''}`.trim()
      : referrerContactInfo?.organizationName || '';

    res.json({
      firstName: referrerName,
      email: referrer.email,
    });
  } catch (error) {
    console.error('Error fetching referrer details:', error);
    res.status(500).json({ error: 'Failed to fetch referrer details' });
  }
});


module.exports = router;
