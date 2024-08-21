// my-gallery/createRewardsTable.js

const sequelize = require('./config/database');
const Reward = require('./models/Reward');

const createRewardsTable = async () => {
  try {
    await Reward.sync({ alter: true });
    console.log("Rewards table created or updated!");
  } catch (error) {
    console.log("Unable to create or update Rewards table", error);
  }
};

createRewardsTable();