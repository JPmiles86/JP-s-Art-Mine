// my-gallery/createLikesTable.js

const sequelize = require('./config/database');
const Like = require('./models/Like');

const createLikesTable = async () => {
  try {
    await Like.sync({ alter: false });
    console.log("Likes table created or updated!");
  } catch (error) {
    console.log("Unable to create or update Likes table", error);
  }
};

createLikesTable();