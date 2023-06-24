// DiptychSVG.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class DiptychSVG extends Model {}

DiptychSVG.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  DiptychId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Diptychs', // name of your model
      key: 'id',
    },
    allowNull: false,
  },
  fused: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  FrameId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Frames', // name of your model
      key: 'id',
    },
    allowNull: false,
  },
  aspectRatio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orientation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  leftSide: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  leftRotation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rightSide: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rightRotation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shapeInCenterEdge: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shapeAtTopEdge: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shapeCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  DiptychIdName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  DiptychIdCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'DiptychSVG',
  tableName: 'DiptychSVGs',  // Specify the correct table name
});

module.exports = DiptychSVG;
