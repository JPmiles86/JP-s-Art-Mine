// my-gallery/models/EntityType.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Users = require('./Users');

const EntityType = sequelize.define('EntityType', {
  entityId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'userId'
    }
  },
  entityType: {
    type: DataTypes.ENUM('Person', 'Company', 'Organization'),
    allowNull: false
  }
}, {
  timestamps: false
});

EntityType.belongsTo(Users, { foreignKey: 'userId' });

module.exports = EntityType;