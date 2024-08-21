// CurationListArtMine.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class CurationListArtMine extends Model {}

CurationListArtMine.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  photoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Photos',
      key: 'id',
    },
  },
  diptychSvgId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'DiptychSVGs',
      key: 'id',
    },
  },
  addedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId',
    },
  },
  approvalStatus: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
  },
  approvalDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  rejectionReason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'CurationListArtMine',
  tableName: 'CurationListArtMines',
  timestamps: false,
});

module.exports = CurationListArtMine;
