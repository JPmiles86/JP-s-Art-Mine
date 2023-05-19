const Photo = require('./Photo');
const CameraModel = require('./CameraModel');
const Series = require('./Series');
const Dates = require('./Dates');
const ImageNumbers = require('./ImageNumbers');

Photo.belongsTo(CameraModel, { foreignKey: 'model' });
CameraModel.hasMany(Photo, { foreignKey: 'model' });

Photo.belongsTo(Series, { foreignKey: 'seriesCode' });
Series.hasMany(Photo, { foreignKey: 'seriesCode' });

Photo.belongsTo(Dates, { foreignKey: 'date' });
Dates.hasMany(Photo, { foreignKey: 'date' });

Photo.belongsTo(ImageNumbers, { foreignKey: 'number' });
ImageNumbers.hasMany(Photo, { foreignKey: 'number' });