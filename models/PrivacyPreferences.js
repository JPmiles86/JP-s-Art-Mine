// my-gallery/models/PrivacyPreferences.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Users = require('./Users');

const PrivacyPreferences = sequelize.define('PrivacyPreferences', {
  privacyId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'userId'
    }
  },
  transactionId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  preferenceType: {
    type: DataTypes.ENUM('Public', 'Private', 'Anonymous'),
    allowNull: false
  }
}, {
  timestamps: true,
  createdAt: 'creationDate',
  updatedAt: 'updatedDate'
});

PrivacyPreferences.belongsTo(Users, { foreignKey: 'userId' });

module.exports = PrivacyPreferences;