// my-gallery/createProvenanceLocationsTable.js

const sequelize = require('./config/database');
const ProvenanceLocations = require('./models/ProvenanceLocations');

const createProvenanceLocationsTable = async () => {
  try {
    await ProvenanceLocations.sync({ alter: true });
    console.log("ProvenanceLocations table created or updated!");
  } catch (error) {
    console.log("Unable to create or update ProvenanceLocations table", error);
  }
};

createProvenanceLocationsTable();