// my-gallery/models/UserLocations.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Locations = require('./Locations');
const Users = require('./Users');

const UserLocations = sequelize.define('UserLocations', {
  userLocationId: {
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
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Locations,
      key: 'locationId'
    }
  },
}, {
  timestamps: true,
  createdAt: 'creationDate',
  updatedAt: 'updatedDate'
});

Users.hasMany(UserLocations, { foreignKey: 'userId' });
UserLocations.belongsTo(Users, { foreignKey: 'userId' });

Locations.hasMany(UserLocations, { foreignKey: 'locationId' });
UserLocations.belongsTo(Locations, { foreignKey: 'locationId' });

module.exports = UserLocations;