// my-gallery/models/PurchaseLocations.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Sale = require('./Sale');
const Locations = require('./Locations');

const PurchaseLocations = sequelize.define('PurchaseLocations', {
  purchaseLocationId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  saleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Sale,
      key: 'saleId'
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
  locationType: {
    type: DataTypes.ENUM('Shipping', 'Billing'),
    allowNull: false
  }
}, {
  timestamps: true,
  createdAt: 'creationDate',
  updatedAt: 'updatedDate'
});

module.exports = PurchaseLocations;