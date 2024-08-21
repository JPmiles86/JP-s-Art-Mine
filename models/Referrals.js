// Referrals.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Referrals extends Model {}

Referrals.init({
  referralId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  referrerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId'
    }
  },
  referredEmail: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  refferedUserId: {    
    type: DataTypes.INTEGER,    
    references: {      
      model: 'Users',      
      key: 'userId',    
    },    
    allowNull: true, // This will be populated after the referred user signs up  
  },
  referralCode: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'signed_up', 'purchased'),
    defaultValue: 'pending'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Referrals',
  tableName: 'Referrals',
  timestamps: false
});

module.exports = Referrals;