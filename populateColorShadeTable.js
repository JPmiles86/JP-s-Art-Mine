// my-gallery/populateColorShadeTable.js
const sequelize = require('./config/database');
const ColorCategory = require('./models/ColorCategory');
const ColorShade = require('./models/ColorShade');
const colorShadeMatrix = require('./data/colorShadeMatrix');

const populateColorShadeTable = async () => {
    try {
        for (const shade of colorShadeMatrix) {
            const category = await ColorCategory.findOne({ where: { name: shade.colorCategoryName } });
            if (category) {
                await ColorShade.findOrCreate({
                    where: { name: shade.name, colorCategoryId: category.id },
                    defaults: {
                        colorCategoryId: category.id,
                        name: shade.name,
                        colorCode: shade.colorCode,
                        minRed: shade.minRed,
                        maxRed: shade.maxRed,
                        minGreen: shade.minGreen,
                        maxGreen: shade.maxGreen,
                        minBlue: shade.minBlue,
                        maxBlue: shade.maxBlue
                    }
                });
            } else {
                console.log(`Category not found for shade: ${shade.name}`);
            }
        }
        console.log("ColorShade table populated successfully!");
    } catch (error) {
        console.log("Unable to populate ColorShade table", error);
    } finally {
        await sequelize.close();
    }
};

populateColorShadeTable();