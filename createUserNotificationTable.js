// my-gallery/createUserNotificationTable.js
const sequelize = require('./config/database');
const UserNotification = require('./models/UserNotification');

const createUserNotificationTable = async () => {
  try {
    await UserNotification.sync({ alter: true });
    console.log("UserNotification table created or updated!");
  } catch (error) {
    console.log("Unable to create or update UserNotification table", error);
  }
};

createUserNotificationTable();