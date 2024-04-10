// my-gallery/createEventRoleTable.js
const sequelize = require('./config/database');
const EventRole = require('./models/EventRole');

const createEventRoleTable = async () => {
  try {
    await EventRole.sync({ alter: true });
    console.log("EventRole table created or updated!");
  } catch (error) {
    console.log("Unable to create or update EventRole table", error);
  }
};

createEventRoleTable();