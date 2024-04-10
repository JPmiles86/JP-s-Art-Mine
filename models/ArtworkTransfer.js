// my-gallery/models/ArtworkTransfer.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ArtworkTransfer extends Model {}

ArtworkTransfer.init({
  artworkTransferId: {
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
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Events',
      key: 'eventId'
    }
  },
  transferDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  transferType: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  fromUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId'
    }
  },
  toUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId'
    }
  },
  ownershipTransferred: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  possessionTransferred: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'ArtworkTransfer',
  tableName: 'ArtworkTransfers',
  timestamps: true
});

module.exports = ArtworkTransfer;