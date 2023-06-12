// PrintSizes.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class PrintSizes extends Model {}

PrintSizes.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  sizeCategoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'SizeCategories',
      key: 'id'
    },
    allowNull: false
  },
  photoAspectRatio: {
    type: DataTypes.ENUM,
    values: ['2:3', '3:4'],
    allowNull: false
  },
  diptychType: {
    type: DataTypes.ENUM,
    values: ['Singles', 'mergedPortrait', 'mergedLandscape'],
    allowNull: false
  },
  sizeInInches: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sizeInCm: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'PrintSizes'
});

module.exports = PrintSizes;
