// my-gallery/createExhibitionImageTable.js
const sequelize = require('./config/database');
const ExhibitionImage = require('./models/ExhibitionImage');

const createExhibitionImageTable = async () => {
  try {
    await ExhibitionImage.sync({ alter: true });
    console.log("ExhibitionImage table created or updated!");
  } catch (error) {
    console.log("Unable to create or update ExhibitionImage table", error);
  }
};

createExhibitionImageTable();