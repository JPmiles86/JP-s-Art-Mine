// my-gallery/createPurchaseLocationsTable.js

const sequelize = require('./config/database');
const PurchaseLocations = require('./models/PurchaseLocations');

const createPurchaseLocationsTable = async () => {
  try {
    await PurchaseLocations.sync({ force: true });
    console.log("PurchaseLocations table created!");
  } catch (error) {
    console.log("Unable to create PurchaseLocations table", error);
  }
};

createPurchaseLocationsTable();