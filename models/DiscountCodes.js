// my-gallery/models/DiscountCodes.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class DiscountCodes extends Model {}

DiscountCodes.init({
  discountId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId'
    }
  },
  discountCode: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  percentage: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
    defaultValue: 5.00
  },
  used: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'DiscountCodes',
  tableName: 'DiscountCodes',
  timestamps: true
});

module.exports = DiscountCodes;
