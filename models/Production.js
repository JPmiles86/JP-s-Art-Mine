// my-gallery/models/Production.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Production extends Model {}

Production.init({
  productionId: {
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
  printShopId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'PrintShops',
      key: 'printShopId'
    }
  },
  printerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'PrinterMachines',
      key: 'printerId'
    }
  },
  paperTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  inkTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  printingDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  proofingIterations: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  finalApprovalBy: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  additionalNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  printCost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  printInvoice: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  shippingId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Shippings',
      key: 'shippingId'
    }
  }
}, {
  sequelize,
  modelName: 'Production',
  tableName: 'Productions',
  timestamps: true,
  createdAt: 'creationDate',
  updatedAt: 'updatedDate'
});

module.exports = Production;