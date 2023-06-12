// Pricing.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('./config/database');
const priceMatrix = require('./PriceMatrix');

class Pricing extends Model {
    static calculateSizeAndPrice(sizeCategoryId, photoAspectRatio, diptychType) {
        const price = priceMatrix[photoAspectRatio][diptychType][sizeCategoryId];
        return {
          photoAspectRatio: photoAspectRatio,
          diptychType: diptychType,
          sizeCategoryId: sizeCategoryId,
          price: price,
          currency: 'USD',
          dateEffective: new Date('2023-08-09'),
        };
    }
}

Pricing.init({
    photoAspectRatio: DataTypes.STRING,
    diptychType: DataTypes.STRING,
    sizeCategoryId: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    currency: DataTypes.STRING,
    dateEffective: DataTypes.DATE,
}, { sequelize, modelName: 'pricing' });

module.exports = Pricing;