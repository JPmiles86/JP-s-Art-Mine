// my-gallery/models/ColorShade.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ColorShade extends Model {}

ColorShade.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  colorCategoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ColorCategories',
      key: 'id'
    }
  },
  colorCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  minRed: DataTypes.INTEGER,
  maxRed: DataTypes.INTEGER,
  minGreen: DataTypes.INTEGER,
  maxGreen: DataTypes.INTEGER,
  minBlue: DataTypes.INTEGER,
  maxBlue: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'ColorShade',
  tableName: 'ColorShades',
  timestamps: false
});

module.exports = ColorShade;