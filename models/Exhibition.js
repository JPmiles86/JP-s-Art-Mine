// my-gallery/models/Exhibition.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Exhibition extends Model {}

Exhibition.init({
  exhibitionId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  location: {
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
  curator: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Exhibition',
  tableName: 'Exhibitions',
  timestamps: true
});

module.exports = Exhibition;