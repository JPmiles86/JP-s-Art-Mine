// my-gallery/models/Locations.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Locations = sequelize.define('Locations', {
  LocationID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  AddressLine1: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  AddressLine2: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  City: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  StateProvince: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  PostalCode: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  Country: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  LocationType: {
    type: DataTypes.ENUM('Home', 'Business', 'Other'),
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = Locations;