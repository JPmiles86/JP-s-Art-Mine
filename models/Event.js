// my-gallery/models/Event.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Event extends Model {}

Event.init({
  eventId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  eventTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'EventTypes',
      key: 'eventTypeId'
    }
  },
  artworkId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Artworks',
      key: 'id'
    }
  },
  eventDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  transferType: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Event',
  tableName: 'Events',
  timestamps: true
});

module.exports = Event;