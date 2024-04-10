// my-gallery/createEventTable.js
const sequelize = require('./config/database');
const Event = require('./models/Event');

const createEventTable = async () => {
  try {
    await Event.sync({ alter: true });
    console.log("Event table created or updated!");
  } catch (error) {
    console.log("Unable to create or update Event table", error);
  }
};

createEventTable();