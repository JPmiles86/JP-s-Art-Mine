// my-gallery/createCurationListWebsiteTable.js
const sequelize = require('./config/database');
const CurationListWebsite = require('./models/CurationListWebsite');

const createCurationListWebsiteTable = async () => {
  try {
    await CurationListWebsite.sync({ alter: true });
    console.log("CurationListWebsite table created or updated!");
  } catch (error) {
    console.log("Unable to create or update CurationListWebsite table", error);
  }
};

createCurationListWebsiteTable();