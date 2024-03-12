// my-gallery/createArtistsTable.js

const sequelize = require('./config/database');
const Artists = require('./models/Artists');

const createArtistsTable = async () => {
  try {
    await Artists.sync({ force: true });
    console.log("Artists table created!");
  } catch (error) {
    console.log("Unable to create Artists table", error);
  }
};

createArtistsTable();