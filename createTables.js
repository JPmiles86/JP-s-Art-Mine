// createTables.js
const sequelize = require('./config/database');
const models = require('./models');
require('./models/associations');

const createTables = async () => {
    try {
        await sequelize.sync({force: false});
        console.log("Database & tables created!");
    } catch (error) {
        console.log("Unable to create tables", error);
    }
};

createTables();
