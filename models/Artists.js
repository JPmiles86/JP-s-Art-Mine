// my-gallery/models/Artists.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Users = require('./Users');

const Artists = sequelize.define('Artists', {
  artistId: {
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
  birthYear: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  deathYear: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  shortBio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  extendedBio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  birthCountry: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  cityOfResidence: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  countryOfResidence: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  profilePhotoUrl: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  exhibitionHistory: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: false
});

module.exports = Artists;