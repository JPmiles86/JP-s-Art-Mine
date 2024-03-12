// my-gallery/createPasswordResetTokensTable.js

const sequelize = require('./config/database');
const PasswordResetToken = require('./models/PasswordResetToken');

const createPasswordResetTokensTable = async () => {
  try {
    await PasswordResetToken.sync({ alter: true });
    console.log("PasswordResetTokens table created or updated!");
  } catch (error) {
    console.log("Unable to create or update PasswordResetTokens table", error);
  }
};

createPasswordResetTokensTable();