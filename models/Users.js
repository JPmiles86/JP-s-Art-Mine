// my-gallery/models/Users.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Users = sequelize.define('Users', {
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  authMethod: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  provider: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  providerId: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  accessToken: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  refreshToken: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  username: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: true
  },
  profilePhotoUrl: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  isAnonymous: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  role: {
    type: DataTypes.ENUM('Admin', 'RegularUser', 'AnonymousUser'),
    defaultValue: 'RegularUser'
  },
  entityType: {
    type: DataTypes.ENUM('Person', 'Organization'),
    allowNull: true
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  creationReason: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true
});

// Define the self-reference association separately
Users.belongsTo(Users, { as: 'CreatedByUser', foreignKey: 'createdBy', constraints: false });

module.exports = Users;