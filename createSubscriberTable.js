// my-gallery/createSubscriberTable.js
const sequelize = require('./config/database');
const Subscriber = require('./models/Subscriber');

const createSubscriberTable = async () => {
  try {
    await Subscriber.sync({ alter: true });
    console.log("Subscriber table created or updated!");
  } catch (error) {
    console.log("Unable to create or update Subscriber table", error);
  }
};

createSubscriberTable();