// createDiptychSVGsTable.js
const sequelize = require('./config/database');
const DiptychSVG = require('./models/DiptychSVG'); // import DiptychSVG model

const createDiptychSVGsTable = async () => {
    try {
        await DiptychSVG.sync({alter: false}); // call sync on DiptychSVG model
        console.log("DiptychSVGs table created or updated!");
    } catch (error) {
        console.log("Unable to create or update DiptychSVGs table", error);
    }
};

createDiptychSVGsTable();
