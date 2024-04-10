// my-gallery/models/EventType.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class EventType extends Model {}

EventType.init({
  eventTypeId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  eventType: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'EventType',
  tableName: 'EventTypes',
  timestamps: false
});

module.exports = EventType;