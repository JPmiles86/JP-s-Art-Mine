// my-gallery/createReferralsTable.js

const sequelize = require('./config/database');
const Referrals = require('./models/Referrals');
const Users = require('./models/Users');

const createReferralsTable = async () => {
  try {
    await Referrals.sync({ alter: true });
    console.log("Referrals table created or updated!");
  } catch (error) {
    console.log("Unable to create or update Referrals table", error);
  }
};

createReferralsTable();
