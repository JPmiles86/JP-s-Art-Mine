// Subscriber.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Subscriber extends Model {}

Subscriber.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId',
    },
  },
  subscriptionLevel: {
    type: DataTypes.ENUM('patron', 'curator_level_1', 'curator_level_2'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'cancelled', 'paused'),
    defaultValue: 'active',
  },
  renewalDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Subscriber',
  tableName: 'Subscribers',
  timestamps: true,
});

module.exports = Subscriber;
