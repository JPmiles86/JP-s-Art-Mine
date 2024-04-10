// my-gallery/models/PrinterMachine.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class PrinterMachine extends Model {}

PrinterMachine.init({
  printerId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  printerName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  printerLocation: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'PrinterMachine',
  tableName: 'PrinterMachines',
  timestamps: false
});

module.exports = PrinterMachine;