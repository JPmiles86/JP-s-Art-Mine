// my-gallery/createRoleTable.js
const sequelize = require('./config/database');
const Role = require('./models/Role');

const createRoleTable = async () => {
  try {
    await Role.sync({ alter: true });
    console.log("Role table created or updated!");
  } catch (error) {
    console.log("Unable to create or update Role table", error);
  }
};

createRoleTable();