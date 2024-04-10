// my-gallery/createArtworkTagTable.js
const sequelize = require('./config/database');
const ArtworkTag = require('./models/ArtworkTag');

const createArtworkTagTable = async () => {
  try {
    await ArtworkTag.sync({ alter: true });
    console.log("ArtworkTag table created or updated!");
  } catch (error) {
    console.log("Unable to create or update ArtworkTag table", error);
  }
};

createArtworkTagTable();