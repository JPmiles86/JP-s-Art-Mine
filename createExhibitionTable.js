// my-gallery/createExhibitionTable.js
const sequelize = require('./config/database');
const Exhibition = require('./models/Exhibition');

const createExhibitionTable = async () => {
  try {
    await Exhibition.sync({ alter: true });
    console.log("Exhibition table created or updated!");
  } catch (error) {
    console.log("Unable to create or update Exhibition table", error);
  }
};

createExhibitionTable();