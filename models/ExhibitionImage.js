// my-gallery/models/ExhibitionImage.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ExhibitionImage extends Model {}

ExhibitionImage.init({
  exhibitionImageId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  exhibitionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Exhibitions',
      key: 'exhibitionId'
    }
  },
  imageUrl: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  caption: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'ExhibitionImage',
  tableName: 'ExhibitionImages',
  timestamps: true
});

module.exports = ExhibitionImage;