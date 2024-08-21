//  my-gallery/models/ColorCategory.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ColorCategory extends Model {}

ColorCategory.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  colorCode: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'ColorCategory',
  timestamps: false
});

module.exports = ColorCategory;
