const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class CurationListUserPhotos extends Model {}

CurationListUserPhotos.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  listId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'CurationListUser', // Ensure this matches the actual table/model name
      key: 'id',
    },
  },
  photoId: {
    type: DataTypes.STRING, // Ensure this matches the data type of photoID in the Photos model
    allowNull: false,
  },
  diptychCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5,
    },
  },
  privateNotes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  publicNotes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  removed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'CurationListUserPhotos',
  tableName: 'CurationListUserPhotos',
  timestamps: true,
});

module.exports = CurationListUserPhotos;
