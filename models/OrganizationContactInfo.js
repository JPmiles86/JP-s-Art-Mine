// my-gallery/models/OrganizationContactInfo.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Locations = require('./Locations');
const Users = require('./Users');

const OrganizationContactInfo = sequelize.define('OrganizationContactInfo', {
  organizationContactId: {
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
  organizationName: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  organizationType: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  taxIdNumber: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  primaryEmail: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  secondaryEmail: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  primaryPhone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  secondaryPhone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  instagram: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  twitter: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  linkedIn: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  website: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  contactPersonName: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  contactPersonRole: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  contactPersonEmail: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  contactPersonPhone: {
    type: DataTypes.STRING(20),
    allowNull: true
  }
}, {
  timestamps: true,
  createdAt: 'creationDate',
  updatedAt: 'updatedDate'
});

module.exports = OrganizationContactInfo;