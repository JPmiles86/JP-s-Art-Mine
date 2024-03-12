// my-gallery/src/utils/emailService.js

const nodemailer = require('nodemailer');
const config = require('../../config/config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email.user,
    pass: config.email.pass
  }
});

function sendSignUpEmail(to) {
    const mailOptions = {
      from: config.email.user,
      to: to,
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
            <p>Hey there, [Name]! Thanks for joining my creative community. I'm JP, your friendly neighborhood abstract photography artist, and I'm stoked to have you on board. 🙌</p>
            
            <p>By signing up, you've unlocked some seriously cool perks. You can save your favorite pieces, curate your own galleries, and <span class="highlight">track the provenance (fancy word for ownership history) of any artworks you collect</span>. Provenance is a major factor in determining an artwork's value, so let's work together to keep those records squeaky clean.</p>
  
            <p>Transparency is kind of my thing in the art world. While my sales history may be a blank canvas for now (hey, Rome wasn't built in a day!), I'm all about keeping things out in the open. <span class="highlight">Artwork sales and pricing? Public knowledge, baby!</span></p>
  
            <p>Speaking of pricing, let me lay it out for you: For every $1 earned, 1/3 goes to production costs, 1/3 to yours truly (gotta keep the brushes stocked, ya know?), and 1/3 to <span class="highlight">charity:water</span>, an organization providing clean water to communities in need. It's my way of using art to make a positive impact.</p>
  
            <p>I'm also a firm believer in Artist's Resale Rights (ARR), which means artists get a cut when their work is resold down the line. ARR isn't legally required in Canada (yet), but I'm offering a voluntary 15% on any resale profits, with half going to charity and half to me. You can adjust that percentage as you see fit, but let's be real – the odds of my artwork skyrocketing in value are slimmer than a toothpick. Still, it's a symbolic gesture that aligns with my philosophy of giving back.</p>
  
            <p>I'm not your typical artist, and I like to shake things up a bit. While some things need to stay hush-hush, <span class="highlight">I believe in transparency and sharing my artistic journey with you</span>. Who knows, maybe one day we'll be celebrating your incredible eye for spotting undervalued talent (wink, wink).</p>
  
            <p>Alright, that's enough rambling from me. Stay tuned for more updates, and don't hesitate to reach out if you have any questions or just want to chat art.</p>
  
            <p>Let's create something extraordinary together!</p>
            <p>- JP</p>
          </body>
        </html>
      `
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }

function sendPasswordResetEmail(to, token) {
    const resetLink = `http://localhost:3000/reset-password?token=${token}&email=${encodeURIComponent(to)}`;
  
    const mailOptions = {
      from: config.email.user,
      to: to,
      subject: 'Password Reset',
      text: `You are receiving this email because you (or someone else) have requested a password reset for your account.\n\n
        Please click on the following link, or paste it into your browser to complete the process:\n\n
        ${resetLink}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }
module.exports = {
  sendSignUpEmail, 
  sendPasswordResetEmail
};