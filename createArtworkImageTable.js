// my-gallery/createArtworkImageTable.js
const sequelize = require('./config/database');
const ArtworkImage = require('./models/ArtworkImage');

const createArtworkImageTable = async () => {
  try {
    await ArtworkImage.sync({ alter: true });
    console.log("ArtworkImage table created or updated!");
  } catch (error) {
    console.log("Unable to create or update ArtworkImage table", error);
  }
};

createArtworkImageTable();