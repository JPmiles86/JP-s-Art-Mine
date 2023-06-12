// createDatesTable.js
const sequelize = require('./config/database');
const Dates = require('./models/Dates');

const createDatesTable = async () => {
    try {
        await Dates.sync({alter: true});
        console.log("Dates table created or updated!");
    } catch (error) {
        console.log("Unable to create or update Dates table", error);
    }
};

createDatesTable();
