// my-gallery/createAPSaleEligibilityTable.js
const sequelize = require('./config/database');
const APSaleEligibility = require('./models/APSaleEligibility');

const createAPSaleEligibilityTable = async () => {
  try {
    await APSaleEligibility.sync({ alter: true });
    console.log("APSaleEligibility table created or updated!");
  } catch (error) {
    console.log("Unable to create or update APSaleEligibility table", error);
  }
};

createAPSaleEligibilityTable();