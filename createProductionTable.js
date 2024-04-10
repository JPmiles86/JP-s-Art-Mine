// my-gallery/createProductionTable.js
const sequelize = require('./config/database');
const Production = require('./models/Production');

const createProductionTable = async () => {
  try {
    await Production.sync({ alter: true });
    console.log("Production table created or updated!");
  } catch (error) {
    console.log("Unable to create or update Production table", error);
  }
};

createProductionTable();