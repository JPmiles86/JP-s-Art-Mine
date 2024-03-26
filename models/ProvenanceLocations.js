// my-gallery/models/ProvenanceLocations.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Artwork = require('./Artwork');
const Locations = require('./Locations');

const ProvenanceLocations = sequelize.define('ProvenanceLocations', {
  provenanceLocationId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  artworkId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Artwork,
      key: 'artworkId'
    }
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Locations,
      key: 'locationId'
    }
  },
  eventType: {
    type: DataTypes.ENUM('Exhibition', 'Storage', 'Other'),
    allowNull: false
  },
  eventDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: true,
  createdAt: 'creationDate',
  updatedAt: 'updatedDate'
});

Artwork.hasMany(ProvenanceLocations, { foreignKey: 'artworkId' });
ProvenanceLocations.belongsTo(Artwork, { foreignKey: 'artworkId' });

Locations.hasMany(ProvenanceLocations, { foreignKey: 'locationId' });
ProvenanceLocations.belongsTo(Locations, { foreignKey: 'locationId' });

module.exports = ProvenanceLocations;