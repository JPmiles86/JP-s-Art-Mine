const nodemailer = require('nodemailer');
const config = require('../../config/config');
const { getUserDetails } = require('./userService'); // Import the helper function

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email.user,
    pass: config.email.pass
  }
});

async function sendSignUpEmail(userId) {
  try {
    const { email, entityType, firstName, lastName, organizationName } = await getUserDetails(userId);
    const displayName = entityType === 'Organization' ? organizationName : `Hey there, ${firstName}`;

    const mailOptions = {
      from: config.email.user,
      to: email,
      subject: 'Welcome to the JP Miles Art Fam! 🎨',
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: 'EB Garamond', serif;
                font-size: 16px;
                line-height: 1.5;
                color: #333;
              }
              h1 {
                font-size: 24px;
                font-weight: bold;
                color: #555;
                text-align: center;
                margin-bottom: 20px;
              }
              p {
                margin-bottom: 15px;
              }
              .highlight {
                font-style: italic;
                color: #666;
              }
            </style>
          </head>
          <body>
            <h1>Welcome to the JP Miles Art Fam!</h1>
            <p>${displayName}! Thanks for joining my creative community. I'm JP, your friendly neighborhood abstract photography artist, and I'm stoked to have you on board. 🙌</p>
            <p>By signing up, you've unlocked some seriously cool perks...</p>
            <p>Let's create something extraordinary together!</p>
            <p>- JP</p>
          </body>
        </html>
      `
    };

    await sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending sign-up email:', error);
    throw new Error('Failed to send sign-up email');
  }
}

async function sendPasswordResetEmail(userId, token) {
  try {
    const { email } = await getUserDetails(userId);
    const resetLink = `http://localhost:3000/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

    const mailOptions = {
      from: config.email.user,
      to: email,
      subject: 'Password Reset',
      text: `You are receiving this email because you (or someone else) have requested a password reset for your account.\n\n
        Please click on the following link, or paste it into your browser to complete the process:\n\n
        ${resetLink}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
}

async function sendReferralEmail(referrerId, friendEmail, referralLink, friendFirstName, friendLastName) {
  try {
    // Retrieve referrer details using the userId
    const { email: referrerEmail, entityType, firstName, lastName, organizationName } = await getUserDetails(referrerId);
    const referrerName = entityType === 'Organization' ? organizationName : `${firstName} ${lastName}`;
    
    const referralUrl = `${referralLink}&firstName=${encodeURIComponent(friendFirstName)}&lastName=${encodeURIComponent(friendLastName)}&email=${encodeURIComponent(friendEmail)}`;

    const mailOptions = {
      from: config.email.user,
      to: friendEmail,
      subject: `${referrerName} thinks you might be interested in JP Miles Fine Art Photography`,
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: 'EB Garamond', serif;
                font-size: 16px;
                line-height: 1.5;
                color: #333;
              }
              h1 {
                font-size: 24px;
                font-weight: bold;
                color: #555;
                text-align: center;
                margin-bottom: 20px;
              }
              p {
                margin-bottom: 15px;
              }
              .highlight {
                font-style: italic;
                color: #666;
              }
            </style>
          </head>
          <body>
            <h1>Join the JP Miles Art Community!</h1>
            <p>Hi ${friendFirstName} ${friendLastName},</p>
            <p>${referrerName} (${referrerEmail}) thought you'd appreciate my collection of Abstract Fine Art Photography.</p>
            <p>As a thank you for joining, ${referrerName} will receive a reward when you make your first purchase, and you can too by referring others.</p>
            <p>Click the link below to sign up:</p>
            <p><a href="${referralUrl}">Join the JP Miles Art Community</a></p>
            <p>- JP Miles</p>
          </body>
        </html>
      `
    };

    await sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending referral email:', error);
    throw new Error('Failed to send referral email');
  }
}


async function sendReferrerNotification(referrerId, referredUserFirstName, referredUserLastName, referredUserEmail) {
  try {
    console.log('sendReferrerNotification - referrerId:', referrerId); // Add this line for debugging
    
    // Validate referrerId is numeric before fetching user details
    if (!referrerId || isNaN(referrerId)) {
      console.error('Invalid referrerId detected:', referrerId); // Log the invalid ID
      throw new Error('Invalid referrerId');
    }

    const { email: referrerEmail, entityType, firstName, lastName, organizationName } = await getUserDetails(referrerId);

    const referrerName = entityType === 'Organization' ? organizationName : `${firstName} ${lastName}`;
    const displayName = entityType === 'Organization' ? referrerName : `Hi ${referrerName}`;

    const mailOptions = {
      from: config.email.user,
      to: referrerEmail,
      subject: `Your Friend ${referredUserFirstName || ''} ${referredUserLastName || ''} Just Signed Up!`,
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: 'EB Garamond', serif;
                font-size: 16px;
                line-height: 1.5;
                color: #333;
              }
              h1 {
                font-size: 24px;
                font-weight: bold;
                color: #555;
                text-align: center;
                margin-bottom: 20px;
              }
              p {
                margin-bottom: 15px;
              }
            </style>
          </head>
          <body>
            <h1>Your Friend Signed Up!</h1>
            <p>${displayName},</p>
            <p>Your friend ${referredUserFirstName || ''} ${referredUserLastName || ''} (${referredUserEmail}) just signed up using your referral link!</p>
            <p>If and when they make a purchase, you'll receive your reward.</p>
            <p>Thank you for spreading the word!</p>
            <p>- JP Miles</p>
          </body>
        </html>
      `,
    };

    await sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending referrer notification email:', error.message);
    throw new Error('Failed to send referrer notification email');
  }
}

async function sendRewardNotificationToReferrer(recipientEmail, recipientFirstName, recipientLastName) {
  try {
    if (!recipientEmail) {
      throw new Error('No email found for recipient');
    }

    const mailOptions = {
      from: config.email.user,
      to: recipientEmail,
      subject: 'You’ve Earned a Reward!',
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: 'EB Garamond', serif;
                font-size: 16px;
                line-height: 1.5;
                color: #333;
              }
              h1 {
                font-size: 24px;
                font-weight: bold;
                color: #555;
                text-align: center;
                margin-bottom: 20px;
              }
              p {
                margin-bottom: 15px;
              }
            </style>
          </head>
          <body>
            <h1>You’ve Earned a Reward!</h1>
            <p>Hi ${recipientFirstName || ''} ${recipientLastName || ''},</p>
            <p>Your friend just made a purchase using your referral link, and you’ve earned a reward!</p>
            <p>Your reward is 1 month of Level 1 Curator access in the Art Mine (a $10 value).</p>
            <p>You can choose to use this reward for 5% off your next purchase or for a subscription. Check your account for more details.</p>
            <p>Thank you for being a part of the JP Miles Art Community!</p>
            <p>- JP Miles</p>
          </body>
        </html>
      `,
    };

    await sendMail(mailOptions);
    console.log(`Reward notification email sent to ${recipientEmail}`);
  } catch (error) {
    console.error('Error sending reward notification email:', error);
    throw new Error('Failed to send reward notification email');
  }
}


async function sendRewardNotificationToCurator(curatorId) {
  try {
    const { email, firstName, lastName } = await getUserDetails(curatorId);
    const displayName = `${firstName} ${lastName}`;

    const mailOptions = {
      from: config.email.user,
      to: email,
      subject: 'You’ve Earned a Reward!',
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: 'EB Garamond', serif;
                font-size: 16px;
                line-height: 1.5;
                color: #333;
              }
              h1 {
                font-size: 24px;
                font-weight: bold;
                color: #555;
                text-align: center;
                margin-bottom: 20px;
              }
              p {
                margin-bottom: 15px;
              }
              .highlight {
                font-style: italic;
                color: #666;
              }
            </style>
          </head>
          <body>
            <h1>You’ve Earned a Reward!</h1>
            <p>Hi ${displayName},</p>
            <p>Your curation efforts have earned you a reward!</p>
            <p>Your reward is 1 month of Level 2 Curator access in the Art Mine.</p>
            <p>Check your account for more details on how to redeem it.</p>
            <p>Thank you for your contributions to the JP Miles Art Community!</p>
            <p>- JP Miles</p>
          </body>
        </html>
      `,
    };

    await sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending reward notification to curator:', error);
    throw new Error('Failed to send reward notification to curator');
  }
}

// Utility function for sending emails
function sendMail(mailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error while sending email:', error.message);
        console.error('Stack trace:', error.stack);
        console.error('Email options:', mailOptions); // Log the email options for further debugging
        return reject(error);
      } else {
        console.log('Email sent successfully:', info.response);
        return resolve(info.response);
      }
    });
  });
}


module.exports = {
  sendSignUpEmail,
  sendPasswordResetEmail,
  sendReferralEmail,
  sendReferrerNotification,
  sendRewardNotificationToReferrer,
  sendRewardNotificationToCurator,
};
