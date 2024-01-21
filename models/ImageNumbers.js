//my-gallery/models/ImageNumbers.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ImageNumbers = sequelize.define('ImageNumbers', {
  number: {
    type: DataTypes.STRING,
    primaryKey: true
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

module.exports = ImageNumbers;
