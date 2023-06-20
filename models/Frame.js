const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Frame extends Model {}

Frame.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  frameType: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Frame',
  tableName: 'Frames',  // Specify the correct table name
});

module.exports = Frame;
