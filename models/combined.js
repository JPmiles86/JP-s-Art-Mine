// my-gallery/models/Artists.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Users = require('./Users');

const Artists = sequelize.define('Artists', {
  artistId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'userId'
    }
  },
  firstName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  middleName: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  lastName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  birthYear: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  deathYear: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  shortBio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  extendedBio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  birthCountry: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  cityOfResidence: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  countryOfResidence: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  profilePhotoUrl: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  exhibitionHistory: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: false
});

module.exports = Artists;// my-gallery/models/ArtistsAdditionalPhotos.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Artists = require('./Artists');

const ArtistsAdditionalPhotos = sequelize.define('ArtistsAdditionalPhotos', {
  artistImageId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  artistId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Artists,
      key: 'artistId'
    }
  },
  photoUrl: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  photographer: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  dateTaken: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  yearTaken: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  timestamps: true,
  createdAt: 'creationDate',
  updatedAt: 'updatedDate'
});

module.exports = ArtistsAdditionalPhotos;// my-gallery/models/Artwork.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Photo = require('./Photo');
const Diptych = require('./Diptych');
const Pricing = require('./Pricing');
const PrintSizes = require('./PrintSizes');
const SizeCategories = require('./SizeCategories');

const Artwork = sequelize.define('Artwork', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  artworkID: {
    type: DataTypes.STRING,
    unique: true
  },
  sizeCategoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'SizeCategories',
      key: 'id'
    }
  },
  edition: {
    type: DataTypes.ENUM,
    values: ['CP', 'AP']
  },
  status: DataTypes.STRING,
  photoRefId: {
    type: DataTypes.INTEGER,  
    references: {
      model: 'Photos',
      key: 'id'
    },
  },
  diptychId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Diptychs',
      key: 'id'
    }
  },
  pricingId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Pricings',  // this should match exactly with your Pricing table name in your database
      key: 'id'
    }
  },
  printSizeId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'PrintSizes',  // this should match exactly with your PrintSizes table name in your database
      key: 'id'
    }
  },  
});

module.exports = Artwork;
// my-gallery/models/AuditTrail.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Users = require('./Users');

const AuditTrail = sequelize.define('AuditTrail', {
  AuditID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'userId'
    }
  },
  ChangeType: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ChangeDetails: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ChangeDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
});

module.exports = AuditTrail;//CameraModels.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CameraModel = sequelize.define('CameraModel', {
  Model: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  cameraMake: DataTypes.STRING,
  cameraModel: DataTypes.STRING
});

module.exports = CameraModel;
// my-gallery/models/Dates.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Dates = sequelize.define('Dates', {
  date: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  dateFormal: {
    type: DataTypes.STRING,
  },
  shortDescription: {
    type: DataTypes.STRING(150),  // Instagram bios are typically up to 150 characters
  },
  extendedDescription: {
    type: DataTypes.TEXT,
  },
  imageUrl: {
    type: DataTypes.STRING,
  }
}, {
  freezeTableName: true,

  // Add this instance method
  instanceMethods: {
    async updateImageUrl(imageUrl) {
      this.imageUrl = imageUrl;
      await this.save();
    }
  }
});

module.exports = Dates;
// Diptych.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Diptych extends Model {}

Diptych.init({
  diptychName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  diptychType: {
    type: DataTypes.ENUM,
    values: ['Singles', 'mergedPortrait', 'mergedLandscape'],
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Diptych',
  tableName: 'Diptychs',  // Specify the correct table name
});

module.exports = Diptych;
// DiptychSVG.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class DiptychSVG extends Model {}

DiptychSVG.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  DiptychId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Diptychs', // name of your model
      key: 'id',
    },
    allowNull: false,
  },
  fused: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  FrameId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Frames', // name of your model
      key: 'id',
    },
    allowNull: false,
  },
  aspectRatio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orientation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  leftSide: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  leftRotation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rightSide: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rightRotation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shapeInCenterEdge: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shapeAtTopEdge: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shapeCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  DiptychIdName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  DiptychIdCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'DiptychSVG',
  tableName: 'DiptychSVGs',  
});

module.exports = DiptychSVG;
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Frame extends Model {}

Frame.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  frameType: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Frame',
  tableName: 'Frames',  // Specify the correct table name
});

module.exports = Frame;
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

module.exports = HiddenPhoto;//my-gallery/models/ImageNumbers.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ImageNumbers = sequelize.define('ImageNumbers', {
  number: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  shortDescription: {
    type: DataTypes.STRING(150),
  },
  extendedDescription: {
    type: DataTypes.TEXT,
  },
  imageUrl: {
    type: DataTypes.STRING,
  }
}, {
  freezeTableName: true
});

module.exports = ImageNumbers;
// my-gallery/models/Like.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Like extends Model {}

Like.init({
  likeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId',
    },
  },
  photoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Photos',
      key: 'id',
    },
  },
  diptychIdCode: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'DiptychSVGs',
      key: 'id',
    },
  },
  isLiked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  sequelize,
  modelName: 'Like',
  tableName: 'Likes',
});

module.exports = Like;// my-gallery/models/Locations.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Locations = sequelize.define('Locations', {
  locationId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  businessName: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  addressLine1: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  addressLine2: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  stateProvince: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  postalCode: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  country: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  locationType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false
});

module.exports = Locations;// my-gallery/models/OrganizationContactInfo.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Locations = require('./Locations');
const Users = require('./Users');

const OrganizationContactInfo = sequelize.define('OrganizationContactInfo', {
  organizationContactId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'userId'
    }
  },
  organizationName: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  organizationType: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  taxIdNumber: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  primaryEmail: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  secondaryEmail: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  primaryPhone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  secondaryPhone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  instagram: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  twitter: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  linkedIn: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  website: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  contactPersonName: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  contactPersonRole: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  contactPersonEmail: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  contactPersonPhone: {
    type: DataTypes.STRING(20),
    allowNull: true
  }
}, {
  timestamps: true,
  createdAt: 'creationDate',
  updatedAt: 'updatedDate'
});

module.exports = OrganizationContactInfo;// my-gallery/models/PasswordResetToken.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PasswordResetToken = sequelize.define('PasswordResetToken', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expires: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = PasswordResetToken;// my-gallery/models/PersonContactInfo.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Locations = require('./Locations');
const Users = require('./Users');

const PersonContactInfo = sequelize.define('PersonContactInfo', {
  personContactId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'userId'
    }
  },
  firstName: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  middleName: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  lastName: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  preferredName: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  primaryEmail: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  secondaryEmail: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  primaryPhone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  secondaryPhone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  profession: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  instagram: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  twitter: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  linkedIn: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  website: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  relationshipToArtist: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  timestamps: true,
  createdAt: 'creationDate',
  updatedAt: 'updatedDate'
});

module.exports = PersonContactInfo;// my-gallery/models/Photo.js
const {  Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const CameraModel = require('./CameraModel');
const Series = require('./Series');
const Dates = require('./Dates');
const ImageNumbers = require('./ImageNumbers');
const HiddenPhoto = require('./HiddenPhoto');
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
// Pricing.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const pricingMatrix = {
    '2:3': {
      Singles: {
        S: 100,
        M: 200,
        L: 300,
        XL: 400,
      },
      mergedPortrait: {
        S: 150,
        M: 250,
        L: 350,
        XL: 450,
      },
      mergedLandscape: {
        S: 200,
        M: 300,
        L: 400,
        XL: 500,
      }
    },
    '3:4': {
      Singles: {
        S: 110,
        M: 210,
        L: 310,
        XL: 410,
      },
      mergedPortrait: {
        S: 160,
        M: 260,
        L: 360,
        XL: 460,
      },
      mergedLandscape: {
        S: 210,
        M: 310,
        L: 410,
        XL: 510,
      }
    }
  };

  class Pricing extends Model {
    calculateSizeAndPrice(sizeCategoryId, photoAspectRatio, diptychType) {
        return pricingMatrix[photoAspectRatio][diptychType][sizeCategoryId];
    }
}

Pricing.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    sizeCategoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'SizeCategories',
        key: 'id',
      },
      allowNull: false
    },
    photoAspectRatio: {
      type: DataTypes.ENUM,
      values: ['2:3', '3:4']
    },
    diptychType: {
      type: DataTypes.ENUM,
      values: ['Singles', 'mergedPortrait', 'mergedLandscape']
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateEffective: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Pricing'
  });
  
  module.exports = Pricing;// PrintSizes.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class PrintSizes extends Model {}

PrintSizes.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  sizeCategoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'SizeCategories',
      key: 'id'
    },
    allowNull: false
  },
  photoAspectRatio: {
    type: DataTypes.ENUM,
    values: ['2:3', '3:4'],
    allowNull: false
  },
  diptychType: {
    type: DataTypes.ENUM,
    values: ['Singles', 'mergedPortrait', 'mergedLandscape'],
    allowNull: false
  },
  sizeInInches: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sizeInCm: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'PrintSizes'
});

module.exports = PrintSizes;
// my-gallery/models/PrivacyPreferences.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Users = require('./Users');

const PrivacyPreferences = sequelize.define('PrivacyPreferences', {
  privacyId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'userId'
    }
  },
  transactionId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  preferenceType: {
    type: DataTypes.ENUM('Public', 'Private', 'Anonymous'),
    allowNull: false
  }
}, {
  timestamps: true,
  createdAt: 'creationDate',
  updatedAt: 'updatedDate'
});

module.exports = PrivacyPreferences;// my-gallery/models/ProvenanceLocations.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Artwork = require('./Artwork');
const Locations = require('./Locations');

const ProvenanceLocations = sequelize.define('ProvenanceLocations', {
  provenanceLocationId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  artworkId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Artwork,
      key: 'artworkId'
    }
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Locations,
      key: 'locationId'
    }
  },
  eventType: {
    type: DataTypes.ENUM('Exhibition', 'Storage', 'Other'),
    allowNull: false
  },
  eventDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: true,
  createdAt: 'creationDate',
  updatedAt: 'updatedDate'
});

module.exports = ProvenanceLocations;// Series.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Series = sequelize.define('Series', {
  seriesCode: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  seriesName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shortDescription: {
    type: DataTypes.STRING(150),
  },
  extendedDescription: {
    type: DataTypes.TEXT,
  },
  imageUrl: {
    type: DataTypes.STRING,
  }
}, {
  freezeTableName: true
});

module.exports = Series;
// SizeCategories.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class SizeCategories extends Model {}

SizeCategories.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  sizeLabel: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  sizeName: { // Add this new column
    type: DataTypes.STRING,
    allowNull: true // Assuming it can be null initially; adjust as needed
  }
}, {
  sequelize,
  modelName: 'SizeCategories'
});

module.exports = SizeCategories;
// my-gallery/models/UserLocations.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Locations = require('./Locations');
const Users = require('./Users');

const UserLocations = sequelize.define('UserLocations', {
  userLocationId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'userId'
    }
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Locations,
      key: 'locationId'
    }
  },
}, {
  timestamps: true,
  createdAt: 'creationDate',
  updatedAt: 'updatedDate'
});

module.exports = UserLocations;// my-gallery/models/Users.js

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

module.exports = Users;// my-gallery/models/associations.js

const models = require('./index');

const { Photo, CameraModel, Series, Dates, ImageNumbers, 
    Artwork, Diptych, DiptychSVG, Frame, Pricing, PrintSizes, 
    SizeCategories, Users, Locations, PersonContactInfo, 
    OrganizationContactInfo, Artists, ArtistsAdditionalPhotos, 
    PrivacyPreferences, AuditTrail, Like, HiddenPhoto, UserLocations, 
    ProvenanceLocations } = models;

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

Artwork.hasMany(ConditionReport, { foreignKey: 'artworkId' });
ConditionReport.belongsTo(Artwork, { foreignKey: 'artworkId' });

Artwork.hasMany(Document, { foreignKey: 'artworkId' });
Document.belongsTo(Artwork, { foreignKey: 'artworkId' });

Artwork.hasMany(Insurance, { foreignKey: 'artworkId' });
Insurance.belongsTo(Artwork, { foreignKey: 'artworkId' });

Artwork.hasMany(Loan, { foreignKey: 'artworkId' });
Loan.belongsTo(Artwork, { foreignKey: 'artworkId' });

//Artwork.hasMany(ProvenanceLocations, { foreignKey: 'artworkId' });
//ProvenanceLocations.belongsTo(Artwork, { foreignKey: 'artworkId' });

//Locations.hasMany(ProvenanceLocations, { foreignKey: 'locationId' });
//ProvenanceLocations.belongsTo(Locations, { foreignKey: 'locationId' });

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

Event.belongsTo(Location, { foreignKey: 'locationId' });
Location.hasMany(Event, { foreignKey: 'locationId' });

Event.hasMany(Document, { foreignKey: 'eventId' });
Document.belongsTo(Event, { foreignKey: 'eventId' });

Event.hasMany(Shipping, { foreignKey: 'eventId' });
Shipping.belongsTo(Event, { foreignKey: 'eventId' });

Event.hasMany(Transfer, { foreignKey: 'eventId' });
Transfer.belongsTo(Event, { foreignKey: 'eventId' });


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

Document.belongsTo(Production, { foreignKey: 'productionId' });

// Shipping associations
Shipping.belongsTo(Location, { as: 'origin', foreignKey: 'originLocationId' });
Shipping.belongsTo(Location, { as: 'destination', foreignKey: 'destinationLocationId' });

Shipping.hasMany(Document, { foreignKey: 'shippingId' });
Document.belongsTo(Shipping, { foreignKey: 'shippingId' });


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


// ConditionReport associations
ConditionReport.belongsTo(Users, { as: 'reporter', foreignKey: 'reporterId' });


// Document associations
Document.belongsTo(Sale, { foreignKey: 'saleId' });
Sale.hasMany(Document, { foreignKey: 'saleId' });


// Insurance associations
Insurance.belongsTo(Users, { as: 'insurer', foreignKey: 'insurerId' });


// Transfer associations
Transfer.belongsTo(Users, { as: 'sender', foreignKey: 'senderId' });
Transfer.belongsTo(Users, { as: 'recipient', foreignKey: 'recipientId' });


// Loan associations
Loan.belongsTo(Users, { as: 'lender', foreignKey: 'lenderId' });
Loan.belongsTo(Users, { as: 'borrower', foreignKey: 'borrowerId' });

Loan.belongsTo(Location, { foreignKey: 'locationId' });
Location.hasMany(Loan, { foreignKey: 'locationId' });

Loan.belongsTo(ConditionReport, { as: 'startConditionReport', foreignKey: 'startConditionReportId' });
Loan.belongsTo(ConditionReport, { as: 'endConditionReport', foreignKey: 'endConditionReportId' });

Loan.belongsTo(Document, { as: 'loanAgreement', foreignKey: 'loanAgreementId' });

// Users.belongsTo(Users, { as: 'CreatedByUser', foreignKey: 'createdBy', constraints: false });// my-gallery/models/index.js
module.exports = {
    Artwork: require('./Artwork'),
    CameraModel: require('./CameraModel'),
    Dates: require('./Dates'),
    Diptych: require('./Diptych'),
    DiptychSVG: require('./DiptychSVG'),
    Frame: require('./Frame'),
    ImageNumbers: require('./ImageNumbers'),
    Photo: require('./Photo'),
    Pricing: require('./Pricing'),
    PrintSizes: require('./PrintSizes'),
    Series: require('./Series'),
    SizeCategories: require('./SizeCategories'),
    Users: require('./Users'),
    Locations: require('./Locations'),
    PersonContactInfo: require('./PersonContactInfo'),
    OrganizationContactInfo: require('./OrganizationContactInfo'),
    Artists: require('./Artists'),
    ArtistsAdditionalPhotos: require('./ArtistsAdditionalPhotos'),
    PrivacyPreferences: require('./PrivacyPreferences'),
    AuditTrail: require('./AuditTrail'),
    PasswordResetToken: require('./PasswordResetToken'),
    Like: require('./Like'), 
    HiddenPhoto: require('./HiddenPhoto'),
    UserLocations: require('./UserLocations'),
    Event: require('./Event'),
    EventType: require('./EventType'),
    EventRole: require('./EventRole'),
    Role: require('./Role'),
    Sale: require('./Sale'),
    Production: require('./Production'),
    Shipping: require('./Shipping'),
    ArtworkTransaction: require('./ArtworkTransaction'),
    Exhibition: require('./Exhibition'),
    ConditionReport: require('./ConditionReport'),
    Document: require('./Document'),
    Insurance: require('./Insurance'),
    Transfer: require('./Transfer'),
    Loan: require('./Loan'),
  };
  