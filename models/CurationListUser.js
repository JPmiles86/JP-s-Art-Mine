// my-gallery/src/models/CurationListUser.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class CurationListUser extends Model {}

CurationListUser.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  visibility: {
    type: DataTypes.ENUM('private', 'shared', 'public'),
    allowNull: false,
    defaultValue: 'private',
  },
  deleted: { // New column to track deletion
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'CurationListUser',
  tableName: 'CurationListUser',
  timestamps: true,
});

module.exports = CurationListUser;
