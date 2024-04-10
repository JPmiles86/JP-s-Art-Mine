// my-gallery/createSaleTable.js
const sequelize = require('./config/database');
const Sale = require('./models/Sale');

const createSaleTable = async () => {
  try {
    await Sale.sync({ alter: true });
    console.log("Sale table created or updated!");
  } catch (error) {
    console.log("Unable to create or update Sale table", error);
  }
};

createSaleTable();