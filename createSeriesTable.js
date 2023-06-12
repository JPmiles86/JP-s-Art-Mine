// createSeriesTable.js
const sequelize = require('./config/database');
const Series = require('./models/Series');

const createSeriesTable = async () => {
    try {
        await Series.sync({alter: true});
        console.log("Series table created or updated!");
    } catch (error) {
        console.log("Unable to create or update Seires table", error);
    }
};

createSeriesTable();
