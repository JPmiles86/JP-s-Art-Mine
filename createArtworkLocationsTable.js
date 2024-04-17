// my-gallery/createArtworkLocationsTable.js

const sequelize = require('./config/database');
const ArtworkLocations = require('./models/ArtworkLocations');

const createArtworkLocationsTable = async () => {
  try {
    await ArtworkLocations.sync({ force: true });
    console.log("ArtworkLocations table created!");
  } catch (error) {
    console.log("Unable to create ArtworkLocations table", error);
  }
};

createArtworkLocationsTable();