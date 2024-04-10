// my-gallery/models/ShippingCompany.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ShippingCompany extends Model {}

ShippingCompany.init({
  shippingCompanyId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  companyName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  trackingUrlTemplate: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'ShippingCompany',
  tableName: 'ShippingCompanies',
  timestamps: false
});

module.exports = ShippingCompany;