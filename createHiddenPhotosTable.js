// my-gallery/createHiddenPhotosTable.js

const sequelize = require('./config/database');
const HiddenPhoto = require('./models/HiddenPhoto');

const createHiddenPhotosTable = async () => {
  try {
    await HiddenPhoto.sync({ alter: false });
    console.log("HiddenPhotos table created or updated!");
  } catch (error) {
    console.log("Unable to create or update HiddenPhotos table", error);
  }
};

createHiddenPhotosTable();