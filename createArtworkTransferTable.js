// my-gallery/createTransferTable.js
const sequelize = require('./config/database');
const ArtworkTransfer = require('./models/ArtworkTransfer');

const createArtworkTransferTable = async () => {
  try {
    await ArtworkTransfer.sync({ alter: true });
    console.log("ArtworkTransfer table created or updated!");
  } catch (error) {
    console.log("Unable to create or update ArtworkTransfer table", error);
  }
};

createArtworkTransferTable();