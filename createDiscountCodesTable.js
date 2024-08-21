// my-gallery/createDiscountCodesTable.js

const sequelize = require('./config/database');
const DiscountCodes = require('./models/DiscountCodes');

const createDiscountCodesTable = async () => {
  try {
    await DiscountCodes.sync({ alter: true });
    console.log("DiscountCodes table created or updated!");
  } catch (error) {
    console.log("Unable to create or update DiscountCodes table", error);
  }
};

createDiscountCodesTable();
