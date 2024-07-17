// Diptych.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Diptych extends Model {}

Diptych.init({
  diptychName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  diptychType: {
    type: DataTypes.ENUM,
    values: ['entangledPrints', 'fusedPortrait', 'fusedLandscape'],
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Diptych',
  tableName: 'Diptychs',  // Specify the correct table name
});

module.exports = Diptych;
