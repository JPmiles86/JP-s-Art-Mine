// my-gallery/models/UserLocations.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const PersonContactInfo = require('./PersonContactInfo');
const OrganizationContactInfo = require('./OrganizationContactInfo');
const Locations = require('./Locations');

const UserLocations = sequelize.define('UserLocations', {
  userLocationId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  personContactInfoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: PersonContactInfo,
      key: 'personContactId'
    }
  },
  organizationContactInfoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: OrganizationContactInfo,
      key: 'organizationContactId'
    }
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Locations,
      key: 'locationId'
    }
  }
}, {
  timestamps: true,
  createdAt: 'creationDate',
  updatedAt: 'updatedDate'
});

UserLocations.belongsTo(PersonContactInfo, { foreignKey: 'personContactInfoId' });
UserLocations.belongsTo(OrganizationContactInfo, { foreignKey: 'organizationContactInfoId' });
UserLocations.belongsTo(Locations, { foreignKey: 'locationId' });

module.exports = UserLocations;