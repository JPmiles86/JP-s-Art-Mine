// UserNotification.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class UserNotification extends Model {}

UserNotification.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId',
    },
  },
  type: {
    type: DataTypes.ENUM(
      'curation_approval', 
      'artwork_sale', 
      'subscription_renewal', 
      'quota_reset', 
      'artwork_like',
      'artwork_added_to_list',
      'artwork_made_public',
      'followed_user_action'
    ),
    allowNull: false,
  },
  entityId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'UserNotification',
  tableName: 'UserNotifications',
  timestamps: true,
});

module.exports = UserNotification;
