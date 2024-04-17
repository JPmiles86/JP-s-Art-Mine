// my-gallery/models/PurchaseProvenanceRecords.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Artwork = require('./Artwork');
const Sale = require('./Sale');

const PurchaseProvenanceRecords = sequelize.define('PurchaseProvenanceRecords', {
  purchaseProvenanceId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  artworkId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Artwork,
      key: 'id'
    }
  },
  purchaseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Sale,
      key: 'saleId'
    }
  },
  entityType: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  person_firstName: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  person_middleName: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  person_lastName: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  person_preferredName: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  person_primaryEmail: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  person_secondaryEmail: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  person_primaryPhone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  person_secondaryPhone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  person_profession: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  person_instagram: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  person_twitter: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  person_linkedIn: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  person_website: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  person_dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  person_countryOfBirth: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  person_countryOfResidence: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  person_relationshipToArtist: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  org_organizationName: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  org_organizationType: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  org_taxIdNumber: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  org_primaryEmail: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  org_secondaryEmail: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  org_primaryPhone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  org_secondaryPhone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  org_instagram: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  org_twitter: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  org_linkedIn: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  org_website: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  org_contactPersonName: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  org_contactPersonRole: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  org_contactPersonEmail: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  org_contactPersonPhone: {
    type: DataTypes.STRING(20),
    allowNull: true
  }
}, {
  timestamps: true,
  createdAt: 'creationDate',
  updatedAt: 'updatedDate'
});

module.exports = PurchaseProvenanceRecords;