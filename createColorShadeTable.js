// my-gallery/createColorShadeTable.js
const sequelize = require('./config/database');
const ColorShade = require('./models/ColorShade');

const createColorShadeTable = async () => {
    try {
        await ColorShade.sync({alter: true});
        console.log("ColorShade table created or updated!");
    } catch (error) {
        console.log("Unable to create or update ColorShade table", error);
    } finally {
        await sequelize.close();
    }
};

createColorShadeTable();