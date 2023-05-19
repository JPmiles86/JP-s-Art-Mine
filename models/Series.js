const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Series = sequelize.define('Series', {
  seriesCode: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  seriesName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shortDescription: {
    type: DataTypes.STRING(150),
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

module.exports = Series;
