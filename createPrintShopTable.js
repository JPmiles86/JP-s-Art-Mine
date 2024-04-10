// my-gallery/createPrintShopTable.js
const sequelize = require('./config/database');
const PrintShop = require('./models/PrintShop');

const createPrintShopTable = async () => {
  try {
    await PrintShop.sync({ alter: true });
    console.log("PrintShop table created or updated!");
  } catch (error) {
    console.log("Unable to create or update PrintShop table", error);
  }
};

createPrintShopTable();