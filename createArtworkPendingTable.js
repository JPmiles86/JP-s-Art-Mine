// my-gallery/createArtworkPendingTable.js
const sequelize = require('./config/database');
const ArtworkPending = require('./models/ArtworkPending');

const createArtworkPendingTable = async () => {
  try {
    await ArtworkPending.sync({ alter: true });
    console.log("ArtworkPending table created or updated!");
  } catch (error) {
    console.log("Unable to create or update ArtworkPending table", error);
  }
};

createArtworkPendingTable();