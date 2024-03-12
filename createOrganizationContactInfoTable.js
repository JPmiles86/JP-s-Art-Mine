// my-gallery/createOrganizationContactInfoTable.js

const sequelize = require('./config/database');
const OrganizationContactInfo = require('./models/OrganizationContactInfo');

const createOrganizationContactInfoTable = async () => {
  try {
    await OrganizationContactInfo.sync({ force: true });
    console.log("OrganizationContactInfo table created!");
  } catch (error) {
    console.log("Unable to create OrganizationContactInfo table", error);
  }
};

createOrganizationContactInfoTable();