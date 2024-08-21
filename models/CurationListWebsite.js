// CurationListWebsite.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class CurationListWebsite extends Model {}

CurationListWebsite.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  photo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Photos',
      key: 'id',
    },
  },
  added_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId',
    },
  },
  approvalstatus: {
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
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'CurationListWebsite',
  tableName: 'CurationListWebsite',
  timestamps: false,
});

module.exports = CurationListWebsite;
