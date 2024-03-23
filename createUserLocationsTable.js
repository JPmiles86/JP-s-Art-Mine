// my-gallery/createUserLocationsTable.js

const sequelize = require('./config/database');
const UserLocations = require('./models/UserLocations');

const createUserLocationsTable = async () => {
  try {
    await UserLocations.sync({ force: true });
    console.log("UserLocations table created!");
  } catch (error) {
    console.log("Unable to create UserLocations table", error);
  }
};

createUserLocationsTable();