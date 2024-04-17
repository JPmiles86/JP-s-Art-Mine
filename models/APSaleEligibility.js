// my-gallery/models/APSaleEligibility.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const APSaleEligibility = sequelize.define('APSaleEligibility', {
  apSaleEligibilityId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  cpArtworkId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Artworks',
      key: 'id'
    }
  },
  apArtworkId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Artworks',
      key: 'id'
    }
  },
  cpSaleDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  apSaleEligibilityDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'APSaleEligibilities',
  timestamps: false
});

module.exports = APSaleEligibility;