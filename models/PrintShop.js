// my-gallery/models/PrintShop.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class PrintShop extends Model {}

PrintShop.init({
  printShopId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  companyName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Locations',
      key: 'locationId'
    }
  },
  contactPerson: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'PrintShop',
  tableName: 'PrintShops',
  timestamps: false
});

module.exports = PrintShop;