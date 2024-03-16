// my-gallery/models/HiddenPhoto.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class HiddenPhoto extends Model {}

HiddenPhoto.init({
  hiddenPhotoId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  photoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Photos',
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId',
    },
  },
}, {
  sequelize,
  modelName: 'HiddenPhoto',
  tableName: 'HiddenPhotos',
});

module.exports = HiddenPhoto;