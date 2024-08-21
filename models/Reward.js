// my-gallery/models/Reward.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Reward extends Model {}

Reward.init({
  rewardId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId',
    },
  },
  type: {
    type: DataTypes.ENUM('discount', 'subscription'),
    allowNull: true,
  },
  value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Monetary value of the reward (e.g., subscription price or discount amount)',
  },
  percentage: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
    defaultValue: 5.00,
    comment: 'Discount percentage, default to 5%',
  },
  subscriptionLevel: {
    type: DataTypes.ENUM('patron', 'curator_level_1', 'curator_level_2'),
    allowNull: true,
    comment: 'Subscription level if the reward is used for a subscription',
  },
  issuedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    comment: 'Timestamp when the reward was issued',
  },
  usedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Timestamp when the reward was used',
  },
  usedFor: {
    type: DataTypes.ENUM('discount', 'subscription'),
    allowNull: true,
    comment: 'Indicates what the reward was used for',
  },
  saleId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Sales',
      key: 'saleId',
    },
    comment: 'The sale ID associated with the reward if it was used for a discount',
  },
  earnedFrom: {
    type: DataTypes.ENUM('referral', 'curation'),
    allowNull: false,
    comment: 'Indicates how the reward was earned',
  },
}, {
  sequelize,
  modelName: 'Reward',
  tableName: 'Rewards',
  timestamps: true,
});

module.exports = Reward;
