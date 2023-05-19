const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Dates = sequelize.define('Dates', {
  date: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  shortDescription: {
    type: DataTypes.STRING(150),  // Instagram bios are typically up to 150 characters
  },
  extendedDescription: {
    type: DataTypes.TEXT,
  },
  imageUrl: {
    type: DataTypes.STRING,
  }
}, {
  freezeTableName: true
});

module.exports = Dates;
