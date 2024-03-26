// my-gallery/models/associations.js

const models = require('./index');

const { Photo, CameraModel, Series, Dates, ImageNumbers, 
    Artwork, Diptych, DiptychSVG, Frame, Pricing, PrintSizes, 
    SizeCategories, Users, Locations, PersonContactInfo, 
    OrganizationContactInfo, Artists, ArtistsAdditionalPhotos, 
    PrivacyPreferences, AuditTrail, Like, HiddenPhoto, UserLocations, ProvenanceLocations } = models;

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

Artwork.belongsTo(Diptych, { foreignKey: 'DiptychId' });
Diptych.hasMany(Artwork, { foreignKey: 'DiptychId' });

Diptych.hasMany(DiptychSVG, { foreignKey: 'DiptychId' });
DiptychSVG.belongsTo(Diptych, { foreignKey: 'DiptychId' });

Frame.hasMany(DiptychSVG, { foreignKey: 'FrameId' });
DiptychSVG.belongsTo(Frame, { foreignKey: 'FrameId' });

Artwork.belongsTo(Pricing, { foreignKey: 'pricingId' });
Pricing.hasMany(Artwork, { foreignKey: 'pricingId' });

Artwork.belongsTo(PrintSizes, { foreignKey: 'printSizeId' });
PrintSizes.hasMany(Artwork, { foreignKey: 'printSizeId' });

PrintSizes.belongsTo(SizeCategories, { foreignKey: 'sizeCategoryId' });
SizeCategories.hasMany(PrintSizes, { foreignKey: 'sizeCategoryId' }); 

Users.hasOne(PersonContactInfo, { foreignKey: 'userId' });
PersonContactInfo.belongsTo(Users, { foreignKey: 'userId' });

Users.hasOne(OrganizationContactInfo, { foreignKey: 'userId' });
OrganizationContactInfo.belongsTo(Users, { foreignKey: 'userId' });

Users.hasMany(UserLocations, { foreignKey: 'userId' });
UserLocations.belongsTo(Users, { foreignKey: 'userId' });

Locations.hasMany(UserLocations, { foreignKey: 'locationId' });
UserLocations.belongsTo(Locations, { foreignKey: 'locationId' });

Users.hasOne(Artists, { foreignKey: 'userId' });
Artists.belongsTo(Users, { foreignKey: 'userId' });

Artists.hasMany(ArtistsAdditionalPhotos, { foreignKey: 'artistId' });
ArtistsAdditionalPhotos.belongsTo(Artists, { foreignKey: 'artistId' });

Users.hasMany(PrivacyPreferences, { foreignKey: 'userId' });
PrivacyPreferences.belongsTo(Users, { foreignKey: 'userId' });

Users.hasMany(AuditTrail, { foreignKey: 'userID' });
AuditTrail.belongsTo(Users, { foreignKey: 'userID' });

Users.hasMany(Like, { foreignKey: 'userId' });
Like.belongsTo(Users, { foreignKey: 'userId' });

Photo.hasMany(Like, { foreignKey: 'photoId' });
Like.belongsTo(Photo, { foreignKey: 'photoId' });

DiptychSVG.hasMany(Like, { foreignKey: 'diptychIdCode' });
Like.belongsTo(DiptychSVG, { foreignKey: 'diptychIdCode' });

Photo.hasMany(HiddenPhoto, { foreignKey: 'photoId' });
HiddenPhoto.belongsTo(Photo, { foreignKey: 'photoId' });

Users.hasMany(HiddenPhoto, { foreignKey: 'userId' });
HiddenPhoto.belongsTo(Users, { foreignKey: 'userId' });

//Artwork.hasMany(ProvenanceLocations, { foreignKey: 'artworkId' });
//ProvenanceLocations.belongsTo(Artwork, { foreignKey: 'artworkId' });

//Locations.hasMany(ProvenanceLocations, { foreignKey: 'locationId' });
//ProvenanceLocations.belongsTo(Locations, { foreignKey: 'locationId' });