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
  }
}, {
  sequelize,
  modelName: 'SizeCategories'
});

module.exports = SizeCategories;