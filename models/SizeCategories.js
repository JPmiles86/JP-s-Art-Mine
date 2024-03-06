// SizeCategories.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class SizeCategories extends Model {}

SizeCategories.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  sizeLabel: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  sizeName: { // Add this new column
    type: DataTypes.STRING,
    allowNull: true // Assuming it can be null initially; adjust as needed
  }
}, {
  sequelize,
  modelName: 'SizeCategories'
});

module.exports = SizeCategories;
