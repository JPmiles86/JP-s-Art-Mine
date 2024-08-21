// createCurationListUserTable.js
const sequelize = require('./config/database');
const CurationListUser = require('./models/CurationListUser');

const createCurationListUserTable = async () => {
  try {
    await CurationListUser.sync({ alter: true });
    console.log("CurationListUser table created or updated!");
  } catch (error) {
    console.log("Unable to create or update CurationListUser table", error);
  }
};

createCurationListUserTable();