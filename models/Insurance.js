// my-gallery/models/Insurance.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Insurance extends Model {}

Insurance.init({
  insuranceId: {
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
  insurerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId'
    }
  },
  policyNumber: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  coverageAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  premium: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  deductible: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  termsConditions: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Insurance',
  tableName: 'Insurances',
  timestamps: true
});

module.exports = Insurance;