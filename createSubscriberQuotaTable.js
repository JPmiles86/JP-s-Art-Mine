// my-gallery/createSubscriberQuotaTable.js
const sequelize = require('./config/database');
const SubscriberQuota = require('./models/SubscriberQuota');

const createSubscriberQuotaTable = async () => {
  try {
    await SubscriberQuota.sync({ alter: true });
    console.log("SubscriberQuota table created or updated!");
  } catch (error) {
    console.log("Unable to create or update SubscriberQuota table", error);
  }
};

createSubscriberQuotaTable();