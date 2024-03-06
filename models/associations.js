// my-gallery/models/associations.js

const models = require('./index');

const { Photo, CameraModel, Series, Dates, ImageNumbers, Artwork, Diptych, DiptychSVG, Frame, Pricing, PrintSizes, SizeCategories } = models;

Photo.belongsTo(CameraModel, { foreignKey: 'model' });
CameraModel.hasMany(Photo, { foreignKey: 'model' });

Photo.belongsTo(Series, { foreignKey: 'seriesCode' });
Series.hasMany(Photo, { foreignKey: 'seriesCode' });

Photo.belongsTo(Dates, { foreignKey: 'date' });
Dates.hasMany(Photo, { foreignKey: 'date' });

Photo.belongsTo(ImageNumbers, { foreignKey: 'number' });
ImageNumbers.hasMany(Photo, { foreignKey: 'number' });

Photo.hasMany(Artwork, { foreignKey: 'photoRefId' }); 
Artwork.belongsTo(Photo, { foreignKey: 'photoRefId' }); 

Artwork.belongsTo(Diptych, { foreignKey: 'diptychId' });
Diptych.hasMany(Artwork, { foreignKey: 'diptychId' });

Diptych.hasMany(DiptychSVG, { foreignKey: 'diptychId' });
DiptychSVG.belongsTo(Diptych, { foreignKey: 'diptychId' });

Frame.hasMany(DiptychSVG, { foreignKey: 'frameId' });
DiptychSVG.belongsTo(Frame, { foreignKey: 'frameId' });

Artwork.belongsTo(Pricing, { foreignKey: 'pricingId' });
Pricing.hasMany(Artwork, { foreignKey: 'pricingId' });

Artwork.belongsTo(PrintSizes, { foreignKey: 'printSizeId' });
PrintSizes.hasMany(Artwork, { foreignKey: 'printSizeId' });

PrintSizes.belongsTo(SizeCategories, { foreignKey: 'sizeCategoryId' });
SizeCategories.hasMany(PrintSizes, { foreignKey: 'sizeCategoryId' }); 
