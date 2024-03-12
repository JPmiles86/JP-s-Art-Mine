// my-gallery/createPersonContactInfoTable.js

const sequelize = require('./config/database');
const PersonContactInfo = require('./models/PersonContactInfo');

const createPersonContactInfoTable = async () => {
  try {
    await PersonContactInfo.sync({ force: true });
    console.log("PersonContactInfo table created!");
  } catch (error) {
    console.log("Unable to create PersonContactInfo table", error);
  }
};

createPersonContactInfoTable();