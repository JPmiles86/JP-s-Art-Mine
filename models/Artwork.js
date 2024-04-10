// my-gallery/models/Artwork.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Photo = require('./Photo');
const Diptych = require('./Diptych');
const Pricing = require('./Pricing');
const PrintSizes = require('./PrintSizes');
const SizeCategories = require('./SizeCategories');

const Artwork = sequelize.define('Artwork', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  artworkID: {
    type: DataTypes.STRING,
    unique: true
  },
  sizeCategoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'SizeCategories',
      key: 'id'
    }
  },
  edition: {
    type: DataTypes.ENUM,
    values: ['CP', 'AP']
  },
  status: DataTypes.STRING,
  photoRefId: {
    type: DataTypes.INTEGER,  
    references: {
      model: 'Photos',
      key: 'id'
    },
  },
  diptychId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Diptychs',
      key: 'id'
    }
  },
  pricingId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Pricings',  // this should match exactly with your Pricing table name in your database
      key: 'id'
    }
  },
  printSizeId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'PrintSizes',  // this should match exactly with your PrintSizes table name in your database
      key: 'id'
    }
  },  
});

module.exports = Artwork;
