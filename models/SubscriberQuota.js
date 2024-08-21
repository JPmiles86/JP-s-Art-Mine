// SubscriberQuota.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class SubscriberQuota extends Model {}

SubscriberQuota.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  subscriberId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Subscribers',
      key: 'id',
    },
  },
  month: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  quota: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  usedQuota: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  sequelize,
  modelName: 'SubscriberQuota',
  tableName: 'SubscriberQuotas',
  timestamps: false,
});

module.exports = SubscriberQuota;