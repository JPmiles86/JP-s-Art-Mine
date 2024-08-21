// my-gallery/createColorCategoryTable.js
const sequelize = require('./config/database');
const ColorCategory = require('./models/ColorCategory');

const createColorCategoryTable = async () => {
    try {
        await ColorCategory.sync({alter: true});
        console.log("ColorCategory table created or updated!");
    } catch (error) {
        console.log("Unable to create or update ColorCategory table", error);
    }
};

createColorCategoryTable();