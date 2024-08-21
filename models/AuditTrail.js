// AuditTrail.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class AuditTrail extends Model {}

AuditTrail.init({
  AuditID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId',
    },
  },
  ChangeType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ChangeDetails: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  EntityID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  EntityType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ChangeDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'AuditTrail',
  tableName: 'AuditTrails',
  timestamps: false,
});

module.exports = AuditTrail;
