// my-gallery/createCurationListArtMineTable.js
const sequelize = require('./config/database');
const CurationListArtMine = require('./models/CurationListArtMine');

const createCurationListArtMineTable = async () => {
  try {
    await CurationListArtMine.sync({ alter: true });
    console.log("CurationListArtMine table created or updated!");
  } catch (error) {
    console.log("Unable to create or update CurationListArtMine table", error);
  }
};

createCurationListArtMineTable();