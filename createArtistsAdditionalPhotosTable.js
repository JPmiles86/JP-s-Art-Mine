// my-gallery/createArtistsAdditionalPhotosTable.js

const sequelize = require('./config/database');
const ArtistsAdditionalPhotos = require('./models/ArtistsAdditionalPhotos');

const createArtistsAdditionalPhotosTable = async () => {
  try {
    await ArtistsAdditionalPhotos.sync({ force: true });
    console.log("ArtistsAdditionalPhotos table created!");
  } catch (error) {
    console.log("Unable to create ArtistsAdditionalPhotos table", error);
  }
};

createArtistsAdditionalPhotosTable();