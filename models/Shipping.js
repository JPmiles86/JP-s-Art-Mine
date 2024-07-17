// my-gallery/models/Shipping.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Shipping extends Model {}

Shipping.init({
  shippingId: {
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
  originLocationId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Changed to allow null
    references: {
      model: 'Locations',
      key: 'locationId'
    }
  },
  destinationLocationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Locations',
      key: 'locationId'
    }
  },
  shippingCompanyId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Changed to allow null
    references: {
      model: 'ShippingCompanies',
      key: 'shippingCompanyId'
    }
  },
  trackingNumber: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  shippedDate: {
    type: DataTypes.DATE,
    allowNull: true, // Changed to allow null
  },
  estimatedArrivalDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  actualArrivalDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  shippingCost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true, // Changed to allow null
  },
  shippingInvoice: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  insuranceValue: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Shipping',
  tableName: 'Shippings',
  timestamps: true
});

module.exports = Shipping;
