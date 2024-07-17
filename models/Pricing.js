// Pricing.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const pricingMatrix = {
    '2:3': {
      entangledPrints: {
        S: 100,
        M: 200,
        L: 300,
        XL: 400,
      },
      fusedPortrait: {
        S: 150,
        M: 250,
        L: 350,
        XL: 450,
      },
      fusedLandscape: {
        S: 200,
        M: 300,
        L: 400,
        XL: 500,
      }
    },
    '3:4': {
      entangledPrints: {
        S: 110,
        M: 210,
        L: 310,
        XL: 410,
      },
      fusedPortrait: {
        S: 160,
        M: 260,
        L: 360,
        XL: 460,
      },
      fusedLandscape: {
        S: 210,
        M: 310,
        L: 410,
        XL: 510,
      }
    }
  };

  class Pricing extends Model {
    calculateSizeAndPrice(sizeCategoryId, photoAspectRatio, diptychType) {
        return pricingMatrix[photoAspectRatio][diptychType][sizeCategoryId];
    }
}

Pricing.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    sizeCategoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'SizeCategories',
        key: 'id',
      },
      allowNull: false
    },
    photoAspectRatio: {
      type: DataTypes.ENUM,
      values: ['2:3', '3:4']
    },
    diptychType: {
      type: DataTypes.ENUM,
      values: ['entangledPrints', 'fusedPortrait', 'fusedLandscape']
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateEffective: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Pricing'
  });
  
  module.exports = Pricing;