// Artwork.js
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

Artwork.belongsTo(Photo, { foreignKey: 'photoRefId' });
Photo.hasMany(Artwork, { foreignKey: 'photoRefId' });

Artwork.belongsTo(Diptych, { foreignKey: 'diptychId' });
Diptych.hasMany(Artwork, { foreignKey: 'diptychId' });

Artwork.belongsTo(SizeCategories, { foreignKey: 'sizeCategoryId' });
SizeCategories.hasMany(Artwork, { foreignKey: 'sizeCategoryId' });

Artwork.belongsTo(Pricing, { foreignKey: 'pricingId' });
Pricing.hasMany(Artwork, { foreignKey: 'pricingId' });

Artwork.belongsTo(PrintSizes, { foreignKey: 'printSizeId' });
PrintSizes.hasMany(Artwork, { foreignKey: 'printSizeId' });


module.exports = Artwork;
