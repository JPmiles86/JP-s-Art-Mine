// my-gallery/createEntityTypeTable.js

const sequelize = require('./config/database');
const EntityType = require('./models/EntityType');

const createEntityTypeTable = async () => {
  try {
    await EntityType.sync({ force: true });
    console.log("EntityType table created!");
  } catch (error) {
    console.log("Unable to create EntityType table", error);
  }
};

createEntityTypeTable();