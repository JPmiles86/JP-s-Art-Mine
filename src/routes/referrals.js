// my-gallery/routes/referrals.js

const express = require('express');
const router = express.Router();
const { Users, Referrals } = require('../models');
const sendReferralEmail = require('../utils/sendReferralEmail'); // Utility function to send emails

router.post('/refer', async (req, res) => {
  const { referrerId, referredEmail } = req.body;

  try {
    // Validate referrer
    const referrer = await Users.findByPk(referrerId);
    if (!referrer) {
      return res.status(404).json({ error: 'Referrer not found' });
    }

    // Create referral entry
    const referral = await Referrals.create({
      referrerId,
      referredEmail,
      status: 'pending'
    });

    // Send referral email
    const referralLink = `http://localhost:3000/signup?referralCode=${referral.referralId}`;
    await sendReferralEmail(referredEmail, referralLink);

    res.status(201).json({ message: 'Referral sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
