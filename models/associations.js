// my-gallery/models/associations.js

const models = require('./index');

const { Photo, CameraModel, Series, Dates, ImageNumbers, 
    Artwork, Diptych, DiptychSVG, Frame, Pricing, PrintSizes, 
    SizeCategories, Users, EntityType, Locations, PersonContactInfo, 
    OrganizationContactInfo, Artists, ArtistsAdditionalPhotos, 
    PrivacyPreferences, AuditTrail } = models;

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

Users.hasOne(EntityType, { foreignKey: 'userId' });
EntityType.belongsTo(Users, { foreignKey: 'userId' });

EntityType.hasOne(PersonContactInfo, { foreignKey: 'entityId' });
PersonContactInfo.belongsTo(EntityType, { foreignKey: 'entityId' });

EntityType.hasOne(OrganizationContactInfo, { foreignKey: 'entityId' });
OrganizationContactInfo.belongsTo(EntityType, { foreignKey: 'entityId' });

Locations.hasMany(PersonContactInfo, { foreignKey: 'locationId' });
PersonContactInfo.belongsTo(Locations, { foreignKey: 'locationId' });

Locations.hasMany(OrganizationContactInfo, { foreignKey: 'locationId' });
OrganizationContactInfo.belongsTo(Locations, { foreignKey: 'locationId' });

Users.hasOne(Artists, { foreignKey: 'userId' });
Artists.belongsTo(Users, { foreignKey: 'userId' });

Artists.hasMany(ArtistsAdditionalPhotos, { foreignKey: 'artistId' });
ArtistsAdditionalPhotos.belongsTo(Artists, { foreignKey: 'artistId' });

Users.hasMany(PrivacyPreferences, { foreignKey: 'userId' });
PrivacyPreferences.belongsTo(Users, { foreignKey: 'userId' });

Users.hasMany(AuditTrail, { foreignKey: 'UserID' });
AuditTrail.belongsTo(Users, { foreignKey: 'UserID' });