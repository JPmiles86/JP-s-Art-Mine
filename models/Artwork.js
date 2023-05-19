const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Photo = require('./Photo');

const Artwork = sequelize.define('Artwork', {
    // your fields...
});

Artwork.belongsTo(Photo, { foreignKey: 'photoId' });

module.exports = Artwork;
