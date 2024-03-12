// my-gallery/createLocationsTable.js

const sequelize = require('./config/database');
const Locations = require('./models/Locations');

const createLocationsTable = async () => {
  try {
    await Locations.sync({ force: true });
    console.log("Locations table created!");
  } catch (error) {
    console.log("Unable to create Locations table", error);
  }
};

createLocationsTable();