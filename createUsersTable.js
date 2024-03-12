// my-gallery/createUsersTable.js

const sequelize = require('./config/database');
const Users = require('./models/Users');

   const createUsersTable = async () => {
     try {
       await Users.sync({ alter: true });
       console.log("Users table created or updated!");
     } catch (error) {
       console.log("Unable to create or update Users table", error);
     }
   };

   createUsersTable();