// createFramesTable.js
const sequelize = require('./config/database');
const Frame = require('./models/Frame');

const createFramesTable = async () => {
    try {
        await Frame.sync({alter: false});
        console.log("Frames table created or updated!");
    } catch (error) {
        console.log("Unable to create or update Frames table", error);
    }
};

createFramesTable();
