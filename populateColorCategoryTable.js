// my-gallery/populateColorCategoryTable.js
const sequelize = require('./config/database');
const ColorCategory = require('./models/ColorCategory');
const colorCategoryMatrix = require('./data/colorCategoryMatrix');

const populateColorCategoryTable = async () => {
    try {
        for (const category of colorCategoryMatrix) {
            await ColorCategory.findOrCreate({
                where: { name: category.name },
                defaults: category
            });
        }
        console.log("ColorCategory table populated successfully!");
    } catch (error) {
        console.log("Unable to populate ColorCategory table", error);
    } finally {
        await sequelize.close();
    }
};

populateColorCategoryTable();