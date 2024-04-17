// my-gallery/models/ArtworkLocations.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ArtworkLocations extends Model {}

ArtworkLocations.init({
  artworkLocationId: {
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
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Locations',
      key: 'locationId'
    }
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Events',
      key: 'eventId'
    }
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'ArtworkLocations',
  tableName: 'ArtworkLocations',
  timestamps: true
});

module.exports = ArtworkLocations;