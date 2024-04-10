// my-gallery/models/Document.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Document extends Model {}

Document.init({
  documentId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  documentType: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  documentUrl: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  saleId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Sales',
      key: 'saleId'
    }
  },
  transactionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'ArtworkTransactions',
      key: 'transactionId'
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
  productionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Productions',
      key: 'productionId'
    }
  },
  shippingId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Shippings',
      key: 'shippingId'
    }
  },
  artworkId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Artworks',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Document',
  tableName: 'Documents',
  timestamps: true,
  createdAt: 'creationDate'
});

module.exports = Document;