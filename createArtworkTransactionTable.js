// my-gallery/createArtworkTransactionTable.js
const sequelize = require('./config/database');
const ArtworkTransaction = require('./models/ArtworkTransaction');

const createArtworkTransactionTable = async () => {
  try {
    await ArtworkTransaction.sync({ alter: true });
    console.log("ArtworkTransaction table created or updated!");
  } catch (error) {
    console.log("Unable to create or update ArtworkTransaction table", error);
  }
};

createArtworkTransactionTable();