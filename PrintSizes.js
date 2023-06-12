// PrintSizes.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('./config/database');
const sizeMatrix = require('./SizeMatrix');

class PrintSizes extends Model {
    static calculatePrintSize(sizeCategoryId, photoAspectRatio, diptychType) {
        const sizeInInches = sizeMatrix[photoAspectRatio][diptychType][sizeCategoryId];
        const [widthInInches, heightInInches] = sizeInInches.split("x").map(Number);
        const widthInCm = (widthInInches * 2.54).toFixed(2);
        const heightInCm = (heightInInches * 2.54).toFixed(2);
        const sizeInCm = `${widthInCm}x${heightInCm}`;
        return {
          photoAspectRatio: photoAspectRatio,
          diptychType: diptychType,
          sizeCategoryId: sizeCategoryId,
          sizeInInches: sizeInInches,
          sizeInCm: sizeInCm
        };
    }
}

PrintSizes.init({
    photoAspectRatio: DataTypes.STRING,
    diptychType: DataTypes.STRING,
    sizeCategoryId: DataTypes.STRING,
    sizeInInches: DataTypes.STRING,
    sizeInCm: DataTypes.STRING,
}, { sequelize, modelName: 'printSizes' });

module.exports = PrintSizes;
