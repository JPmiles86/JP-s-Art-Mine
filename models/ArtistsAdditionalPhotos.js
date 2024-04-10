// my-gallery/models/ArtistsAdditionalPhotos.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Artists = require('./Artists');

const ArtistsAdditionalPhotos = sequelize.define('ArtistsAdditionalPhotos', {
  artistImageId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  artistId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Artists,
      key: 'artistId'
    }
  },
  photoUrl: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  photographer: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  dateTaken: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  yearTaken: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  timestamps: true,
  createdAt: 'creationDate',
  updatedAt: 'updatedDate'
});

module.exports = ArtistsAdditionalPhotos;