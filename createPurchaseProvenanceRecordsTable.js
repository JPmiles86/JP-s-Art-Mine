// my-gallery/createPurchaseProvenanceRecordsTable.js

const sequelize = require('./config/database');
const PurchaseProvenanceRecords = require('./models/PurchaseProvenanceRecords');

const createPurchaseProvenanceRecordsTable = async () => {
  try {
    await PurchaseProvenanceRecords.sync({ force: true });
    console.log("PurchaseProvenanceRecords table created!");
  } catch (error) {
    console.log("Unable to create PurchaseProvenanceRecords table", error);
  }
};

createPurchaseProvenanceRecordsTable();