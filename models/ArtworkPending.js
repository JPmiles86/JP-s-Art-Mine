// my-gallery/models/ArtworkPending.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ArtworkPending extends Model {}

ArtworkPending.init({
  artworkPendingId: {
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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId'
    }
  },
  pendingUntil: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'ArtworkPending',
  tableName: 'ArtworkPendings',
  timestamps: true
});

module.exports = ArtworkPending;