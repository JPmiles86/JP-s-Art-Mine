//CameraModels.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CameraModel = sequelize.define('CameraModel', {
  Model: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  cameraMake: DataTypes.STRING,
  cameraModel: DataTypes.STRING
});

module.exports = CameraModel;
