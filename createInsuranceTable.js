// my-gallery/createInsuranceTable.js
const sequelize = require('./config/database');
const Insurance = require('./models/Insurance');

const createInsuranceTable = async () => {
  try {
    await Insurance.sync({ alter: true });
    console.log("Insurance table created or updated!");
  } catch (error) {
    console.log("Unable to create or update Insurance table", error);
  }
};

createInsuranceTable();