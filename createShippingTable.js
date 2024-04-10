// my-gallery/createShippingTable.js
const sequelize = require('./config/database');
const Shipping = require('./models/Shipping');

const createShippingTable = async () => {
  try {
    await Shipping.sync({ alter: true });
    console.log("Shipping table created or updated!");
  } catch (error) {
    console.log("Unable to create or update Shipping table", error);
  }
};

createShippingTable();