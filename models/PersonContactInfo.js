// my-gallery/models/PersonContactInfo.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Locations = require('./Locations');
const Users = require('./Users');

const PersonContactInfo = sequelize.define('PersonContactInfo', {
  personContactId: {
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
  firstName: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  middleName: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  lastName: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  preferredName: {
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
  profession: {
    type: DataTypes.STRING(255),
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
  relationshipToArtist: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  timestamps: true,
  createdAt: 'creationDate',
  updatedAt: 'updatedDate'
});

PersonContactInfo.belongsTo(Users, { foreignKey: 'userId' });

module.exports = PersonContactInfo;