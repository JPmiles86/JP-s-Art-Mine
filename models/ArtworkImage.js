// my-gallery/models/ArtworkImage.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ArtworkImage extends Model {}

ArtworkImage.init({
  artworkImageId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  artworkId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Artworks',
      key: 'id'
    }
  },
  imageUrl: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  isPrimary: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  caption: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'ArtworkImage',
  tableName: 'ArtworkImages',
  timestamps: true
});

module.exports = ArtworkImage;