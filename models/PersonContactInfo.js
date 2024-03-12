// my-gallery/models/PersonContactInfo.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const EntityType = require('./EntityType');
const Locations = require('./Locations');

const PersonContactInfo = sequelize.define('PersonContactInfo', {
  personContactId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  entityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: EntityType,
      key: 'entityId'
    }
  },
  firstName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  middleName: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  lastName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  primaryEmail: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  secondaryEmail: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  primaryPhone: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  secondaryPhone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Locations,
      key: 'LocationID'
    }
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
  profilePhotoUrl: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  relationshipToArtist: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  purchasePrivacyLevel: {
    type: DataTypes.ENUM('Public', 'Private', 'Anonymous'),
    allowNull: false
  },
  preferences: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true,
  createdAt: 'creationDate',
  updatedAt: 'updatedDate'
});

PersonContactInfo.belongsTo(EntityType, { foreignKey: 'entityId' });
PersonContactInfo.belongsTo(Locations, { foreignKey: 'locationId' });

module.exports = PersonContactInfo;