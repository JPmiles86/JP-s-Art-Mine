// my-gallery/createEventTypeTable.js
const sequelize = require('./config/database');
const EventType = require('./models/EventType');

const createEventTypeTable = async () => {
  try {
    await EventType.sync({ alter: true });
    console.log("EventType table created or updated!");
  } catch (error) {
    console.log("Unable to create or update EventType table", error);
  }
};

createEventTypeTable();