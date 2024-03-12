// my-gallery/createAuditTrailTable.js

const sequelize = require('./config/database');
const AuditTrail = require('./models/AuditTrail');

const createAuditTrailTable = async () => {
  try {
    await AuditTrail.sync({ force: true });
    console.log("AuditTrail table created!");
  } catch (error) {
    console.log("Unable to create AuditTrail table", error);
  }
};

createAuditTrailTable();