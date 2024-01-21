// my-gallery/models/Dates.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Dates = sequelize.define('Dates', {
  date: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  dateFormal: {
    type: DataTypes.STRING,
  },
  shortDescription: {
    type: DataTypes.STRING(150),  // Instagram bios are typically up to 150 characters
  },
  extendedDescription: {
    type: DataTypes.TEXT,
  },
  imageUrl: {
    type: DataTypes.STRING,
  }
}, {
  freezeTableName: true,

  // Add this instance method
  instanceMethods: {
    async updateImageUrl(imageUrl) {
      this.imageUrl = imageUrl;
      await this.save();
    }
  }
});

module.exports = Dates;
