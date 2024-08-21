// my-gallery/models/PhotoColor.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class PhotoColor extends Model {}

PhotoColor.init({
  photoId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  colors: {
    type: DataTypes.JSONB,
    allowNull: false,
    comment: 'Array of color objects, each containing: hex, red, green, blue, percentage, rank'
  },
  brightness: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment: 'Average brightness of the image'
  },
  colorfulness: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment: 'Average saturation of the image'
  }
}, {
  sequelize,
  modelName: 'PhotoColor',
  tableName: 'PhotoColors',
  timestamps: false,
  indexes: [
    {
      fields: ['colors'],
      using: 'gin'
    }
  ]
});

module.exports = PhotoColor;
