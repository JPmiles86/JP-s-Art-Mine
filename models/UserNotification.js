// my-gallery/models/UserNotification.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class UserNotification extends Model {}

UserNotification.init({
  userNotificationId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId'
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
  notified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'UserNotification',
  tableName: 'UserNotifications',
  timestamps: true
});

module.exports = UserNotification;