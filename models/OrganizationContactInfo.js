// my-gallery/models/OrganizationContactInfo.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const EntityType = require('./EntityType');
const Locations = require('./Locations');

const OrganizationContactInfo = sequelize.define('OrganizationContactInfo', {
  organizationContactId: {
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
  organizationName: {
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
  preferences: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  contactPerson1: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  contactPerson1Role: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  contactPerson1Email: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  contactPerson1Phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  contactPerson2: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  contactPerson2Role: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  contactPerson2Email: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  contactPerson2Phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  contactPerson3: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  contactPerson3Role: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  contactPerson3Email: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  contactPerson3Phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  }
}, {
  timestamps: true,
  createdAt: 'creationDate',
  updatedAt: 'updatedDate'
});

OrganizationContactInfo.belongsTo(EntityType, { foreignKey: 'entityId' });
OrganizationContactInfo.belongsTo(Locations, { foreignKey: 'locationId' });

module.exports = OrganizationContactInfo;