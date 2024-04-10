// my-gallery/models/ArtworkTag.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ArtworkTag extends Model {}

ArtworkTag.init({
  artworkTagId: {
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
  tagType: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  tagValue: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'ArtworkTag',
  tableName: 'ArtworkTags',
  timestamps: true
});

module.exports = ArtworkTag;