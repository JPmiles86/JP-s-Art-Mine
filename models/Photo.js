const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const CameraModel = require('./CameraModel');
const Series = require('./Series');
const Dates = require('./Dates');
const ImageNumbers = require('./ImageNumbers');
// const Artwork = require('./Artwork');

const Photo = sequelize.define('Photo', {
    photoID: DataTypes.STRING,
    series: DataTypes.STRING,
    seriesCode: {
        type: DataTypes.STRING,
        references: {
            model: 'Series',
            key: 'seriesCode'
        }
    },
    seriesName: DataTypes.STRING,
    date: {
        type: DataTypes.STRING,
        references: {
            model: 'Dates',
            key: 'date'
        }
    },
    number: {
        type: DataTypes.STRING,
        references: {
            model: 'ImageNumbers',
            key: 'number'
        }
    },
    model: {
        type: DataTypes.STRING,
        references: {
            model: 'CameraModels',
            key: 'Model'
        }
    },
    lens: DataTypes.STRING,
    focalLength: DataTypes.STRING,
    shutterSpeed: DataTypes.STRING,
    aperture: DataTypes.STRING,
    iso: DataTypes.STRING,
    dimensions: DataTypes.STRING, 
    aspectRatio: DataTypes.STRING,
    dateOriginal: DataTypes.DATE,
    imagePath: DataTypes.STRING,
    uniqueKey: {
        type: DataTypes.STRING,
        unique: true
    },
});


module.exports = Photo;
