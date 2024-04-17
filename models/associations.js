// my-gallery/models/associations.js

const models = require('./index');

const { Photo, CameraModel, Series, Dates, ImageNumbers,
    Artwork, Diptych, DiptychSVG, Frame, Pricing, PrintSizes,
    SizeCategories, Users, Locations, PersonContactInfo,
    OrganizationContactInfo, Artists, ArtistsAdditionalPhotos,
    PrivacyPreferences, AuditTrail, Like, HiddenPhoto, UserLocations,
    ProvenanceLocations, Event, EventType, EventRole, Role, Sale,
    Production, Shipping, ArtworkTransaction, Exhibition, ConditionReport,
    Document, Insurance, ArtworkTransfer, Loan, ArtworkImage, ExhibitionImage, 
    ArtworkTag, PrintShop, PrinterMachine, ShippingCompany, APSaleEligibility, 
    UserNotification, ArtworkPending, ArtworkLocations, PurchaseProvenanceRecords } = models;

// Artwork associations
Artwork.belongsTo(Photo, { foreignKey: 'photoRefId' });
Photo.hasMany(Artwork, { foreignKey: 'photoRefId' });

Artwork.belongsTo(Diptych, { foreignKey: 'diptychId' });
Diptych.hasMany(Artwork, { foreignKey: 'diptychId' });

Artwork.belongsTo(SizeCategories, { foreignKey: 'sizeCategoryId' });
SizeCategories.hasMany(Artwork, { foreignKey: 'sizeCategoryId' });

Artwork.belongsTo(Pricing, { foreignKey: 'pricingId' });
Pricing.hasMany(Artwork, { foreignKey: 'pricingId' });

Artwork.belongsTo(PrintSizes, { foreignKey: 'printSizeId' });
PrintSizes.hasMany(Artwork, { foreignKey: 'printSizeId' });

Artwork.hasMany(Event, { foreignKey: 'artworkId' });
Event.belongsTo(Artwork, { foreignKey: 'artworkId' });

Artwork.hasMany(Sale, { foreignKey: 'artworkId' });
Sale.belongsTo(Artwork, { foreignKey: 'artworkId' });

Artwork.hasMany(Production, { foreignKey: 'artworkId' });
Production.belongsTo(Artwork, { foreignKey: 'artworkId' });

Artwork.hasMany(Shipping, { foreignKey: 'artworkId' });
Shipping.belongsTo(Artwork, { foreignKey: 'artworkId' });

Artwork.hasMany(ArtworkTransaction, { foreignKey: 'artworkId' });
ArtworkTransaction.belongsTo(Artwork, { foreignKey: 'artworkId' });

Artwork.hasOne(APSaleEligibility, { as: 'cpArtwork', foreignKey: 'cpArtworkId' });
APSaleEligibility.belongsTo(Artwork, { as: 'cpArtwork', foreignKey: 'cpArtworkId' });

Artwork.hasOne(APSaleEligibility, { as: 'apArtwork', foreignKey: 'apArtworkId' });
APSaleEligibility.belongsTo(Artwork, { as: 'apArtwork', foreignKey: 'apArtworkId' });

ArtworkLocations.belongsTo(Artwork, { foreignKey: 'artworkId' });
Artwork.hasMany(ArtworkLocations, { foreignKey: 'artworkId' });

ArtworkLocations.belongsTo(Locations, { foreignKey: 'locationId' });
Locations.hasMany(ArtworkLocations, { foreignKey: 'locationId' });

ArtworkLocations.belongsTo(Event, { foreignKey: 'eventId' });
Event.hasMany(ArtworkLocations, { foreignKey: 'eventId' });

Artwork.hasMany(ConditionReport, { foreignKey: 'artworkId' });
ConditionReport.belongsTo(Artwork, { foreignKey: 'artworkId' });

Artwork.hasMany(Document, { foreignKey: 'artworkId' });
Document.belongsTo(Artwork, { foreignKey: 'artworkId' });

Artwork.hasMany(ArtworkImage, { foreignKey: 'artworkId' });
ArtworkImage.belongsTo(Artwork, { foreignKey: 'artworkId' });

Artwork.hasMany(Insurance, { foreignKey: 'artworkId' });
Insurance.belongsTo(Artwork, { foreignKey: 'artworkId' });

Artwork.hasMany(Loan, { foreignKey: 'artworkId' });
Loan.belongsTo(Artwork, { foreignKey: 'artworkId' });

Artwork.hasMany(ProvenanceLocations, { foreignKey: 'artworkId' });
ProvenanceLocations.belongsTo(Artwork, { foreignKey: 'artworkId' });

Locations.hasMany(ProvenanceLocations, { foreignKey: 'locationId' });
ProvenanceLocations.belongsTo(Locations, { foreignKey: 'locationId' });

Artwork.hasMany(ArtworkTag, { foreignKey: 'artworkId' });
ArtworkTag.belongsTo(Artwork, { foreignKey: 'artworkId' });

Photo.belongsTo(CameraModel, { foreignKey: 'model' });
CameraModel.hasMany(Photo, { foreignKey: 'model' });

Photo.belongsTo(Series, { foreignKey: 'seriesCode' });
Series.hasMany(Photo, { foreignKey: 'seriesCode' });

Photo.belongsTo(Dates, { foreignKey: 'date' });
Dates.hasMany(Photo, { foreignKey: 'date' });

Photo.belongsTo(ImageNumbers, { foreignKey: 'number' });
ImageNumbers.hasMany(Photo, { foreignKey: 'number' });

Diptych.hasMany(DiptychSVG, { foreignKey: 'DiptychId' });
DiptychSVG.belongsTo(Diptych, { foreignKey: 'DiptychId' });

Frame.hasMany(DiptychSVG, { foreignKey: 'FrameId' });
DiptychSVG.belongsTo(Frame, { foreignKey: 'FrameId' });

PrintSizes.belongsTo(SizeCategories, { foreignKey: 'sizeCategoryId' });
SizeCategories.hasMany(PrintSizes, { foreignKey: 'sizeCategoryId' }); 


// Users associations
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


// Event associations
Event.belongsTo(EventType, { foreignKey: 'eventTypeId' });
EventType.hasMany(Event, { foreignKey: 'eventTypeId' });

Event.hasMany(EventRole, { foreignKey: 'eventId' });
EventRole.belongsTo(Event, { foreignKey: 'eventId' });

Event.belongsTo(Locations, { foreignKey: 'locationId' });
Locations.hasMany(Event, { foreignKey: 'locationId' });

Event.hasMany(Document, { foreignKey: 'eventId' });
Document.belongsTo(Event, { foreignKey: 'eventId' });

Event.hasMany(Shipping, { foreignKey: 'eventId' });
Shipping.belongsTo(Event, { foreignKey: 'eventId' });

Event.hasMany(ArtworkTransfer, { foreignKey: 'eventId' });
ArtworkTransfer.belongsTo(Event, { foreignKey: 'eventId' });


// EventRole associations
EventRole.belongsTo(Users, { foreignKey: 'userId' });
Users.hasMany(EventRole, { foreignKey: 'userId' });

EventRole.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(EventRole, { foreignKey: 'roleId' });

// Sale associations
Sale.belongsTo(Users, { as: 'seller', foreignKey: 'sellerId' });
Sale.belongsTo(Users, { as: 'sellerAgent', foreignKey: 'sellerAgentId' });

Sale.belongsTo(Users, { as: 'buyer', foreignKey: 'buyerId' });
Sale.belongsTo(Users, { as: 'buyerAgent', foreignKey: 'buyerAgentId' });

Sale.belongsTo(Users, { as: 'newOwner', foreignKey: 'newOwnerId' });
Sale.belongsTo(Users, { as: 'charity', foreignKey: 'charityId' });

Sale.belongsTo(Production, { foreignKey: 'productionId' });
Production.hasMany(Sale, { foreignKey: 'productionId' });

Sale.belongsTo(Shipping, { foreignKey: 'shippingId' });
Shipping.hasMany(Sale, { foreignKey: 'shippingId' });

Sale.hasMany(Document, { foreignKey: 'saleId' });
Document.belongsTo(Sale, { foreignKey: 'saleId' });


// Production associations
Production.belongsTo(Users, { as: 'printShop', foreignKey: 'printShopId' });
Production.belongsTo(Shipping, { foreignKey: 'shippingId' });

Shipping.hasMany(Production, { foreignKey: 'shippingId' });
Production.hasMany(Document, { foreignKey: 'productionId' });

PrintShop.hasMany(Production, { foreignKey: 'printShopId' });
Production.belongsTo(PrintShop, { foreignKey: 'printShopId' });

PrinterMachine.hasMany(Production, { foreignKey: 'printerId' });
Production.belongsTo(PrinterMachine, { foreignKey: 'printerId' });

Document.belongsTo(Production, { foreignKey: 'productionId' });

// Shipping associations
Shipping.belongsTo(Locations, { as: 'origin', foreignKey: 'originLocationId' });
Shipping.belongsTo(Locations, { as: 'destination', foreignKey: 'destinationLocationId' });

Shipping.hasMany(Document, { foreignKey: 'shippingId' });
Document.belongsTo(Shipping, { foreignKey: 'shippingId' });

ShippingCompany.hasMany(Shipping, { foreignKey: 'shippingCompanyId' });
Shipping.belongsTo(ShippingCompany, { foreignKey: 'shippingCompanyId' });

// ArtworkTransaction associations
ArtworkTransaction.belongsTo(Event, { foreignKey: 'eventId' });
Event.hasMany(ArtworkTransaction, { foreignKey: 'eventId' });

ArtworkTransaction.belongsTo(Users, { as: 'buyer', foreignKey: 'buyerEntityId' });
ArtworkTransaction.belongsTo(Users, { as: 'seller', foreignKey: 'sellerEntityId' });

ArtworkTransaction.hasMany(Document, { foreignKey: 'transactionId' });
Document.belongsTo(ArtworkTransaction, { foreignKey: 'transactionId' });


// Exhibition associations
Exhibition.hasMany(Event, { foreignKey: 'exhibitionId' });
Event.belongsTo(Exhibition, { foreignKey: 'exhibitionId' });

Exhibition.belongsToMany(Artwork, { through: 'ArtworkExhibition', foreignKey: 'exhibitionId' });
Artwork.belongsToMany(Exhibition, { through: 'ArtworkExhibition', foreignKey: 'artworkId' });

Exhibition.hasMany(ExhibitionImage, { foreignKey: 'exhibitionId' });
ExhibitionImage.belongsTo(Exhibition, { foreignKey: 'exhibitionId' });

// ConditionReport associations
ConditionReport.belongsTo(Users, { as: 'reporter', foreignKey: 'reporterId' });


// Document associations
Document.belongsTo(Sale, { foreignKey: 'saleId' });
Sale.hasMany(Document, { foreignKey: 'saleId' });


// Insurance associations
Insurance.belongsTo(Users, { as: 'insurer', foreignKey: 'insurerId' });


// ArtworkTransfer associations
ArtworkTransfer.belongsTo(Users, { as: 'fromUser', foreignKey: 'fromUserId' });
ArtworkTransfer.belongsTo(Users, { as: 'toUser', foreignKey: 'toUserId' });

ArtworkTransfer.belongsTo(Artwork, { foreignKey: 'artworkId' });
Artwork.hasMany(ArtworkTransfer, { foreignKey: 'artworkId' });


// ArtworkPending associations
ArtworkPending.belongsTo(Artwork, { foreignKey: 'artworkId' });
Artwork.hasMany(ArtworkPending, { foreignKey: 'artworkId' });

ArtworkPending.belongsTo(Users, { foreignKey: 'userId' });
Users.hasMany(ArtworkPending, { foreignKey: 'userId' });


// UserNotification associations
UserNotification.belongsTo(Users, { foreignKey: 'userId' });
Users.hasMany(UserNotification, { foreignKey: 'userId' });

UserNotification.belongsTo(Artwork, { foreignKey: 'artworkId' });
Artwork.hasMany(UserNotification, { foreignKey: 'artworkId' });


// Loan associations
Loan.belongsTo(Users, { as: 'lender', foreignKey: 'lenderId' });
Loan.belongsTo(Users, { as: 'borrower', foreignKey: 'borrowerId' });

Loan.belongsTo(Locations, { foreignKey: 'locationId' });
Locations.hasMany(Loan, { foreignKey: 'locationId' });

Loan.belongsTo(ConditionReport, { as: 'startConditionReport', foreignKey: 'startConditionReportId' });
Loan.belongsTo(ConditionReport, { as: 'endConditionReport', foreignKey: 'endConditionReportId' });

Loan.belongsTo(Document, { as: 'loanAgreement', foreignKey: 'loanAgreementId' });

// PurchaseProvenanceRecords associations
PurchaseProvenanceRecords.belongsTo(Artwork, { foreignKey: 'artworkId' });
Artwork.hasMany(PurchaseProvenanceRecords, { foreignKey: 'artworkId' });

PurchaseProvenanceRecords.belongsTo(Sale, { foreignKey: 'purchaseId' });
Sale.hasMany(PurchaseProvenanceRecords, { foreignKey: 'purchaseId' });

// Users.belongsTo(Users, { as: 'CreatedByUser', foreignKey: 'createdBy', constraints: false });