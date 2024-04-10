// my-gallery/createShippingCompanyTable.js
const sequelize = require('./config/database');
const ShippingCompany = require('./models/ShippingCompany');

const createShippingCompanyTable = async () => {
  try {
    await ShippingCompany.sync({ alter: true });
    console.log("ShippingCompany table created or updated!");
  } catch (error) {
    console.log("Unable to create or update ShippingCompany table", error);
  }
};

createShippingCompanyTable();