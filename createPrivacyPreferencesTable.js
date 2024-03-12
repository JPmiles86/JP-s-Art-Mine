// my-gallery/createPrivacyPreferencesTable.js

const sequelize = require('./config/database');
const PrivacyPreferences = require('./models/PrivacyPreferences');

const createPrivacyPreferencesTable = async () => {
  try {
    await PrivacyPreferences.sync({ force: true });
    console.log("PrivacyPreferences table created!");
  } catch (error) {
    console.log("Unable to create PrivacyPreferences table", error);
  }
};

createPrivacyPreferencesTable();