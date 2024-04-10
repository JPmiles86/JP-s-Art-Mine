// my-gallery/models/Role.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Role extends Model {}

Role.init({
  roleId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  roleName: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Role',
  tableName: 'Roles',
  timestamps: false
});

module.exports = Role;