// my-gallery/models/AuditTrail.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Users = require('./Users');

const AuditTrail = sequelize.define('AuditTrail', {
  AuditID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'userId'
    }
  },
  ChangeType: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ChangeDetails: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ChangeDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
});

module.exports = AuditTrail;