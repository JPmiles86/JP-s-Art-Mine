// my-gallery/models/APSaleEligibility.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const APSaleEligibility = sequelize.define('APSaleEligibility', {
  apSaleEligibilityId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  cpArtworkId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Artworks',
      key: 'id'
    }
  },
  apArtworkId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Artworks',
      key: 'id'
    }
  },
  cpSaleDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  apSaleEligibilityDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'APSaleEligibilities',
  timestamps: false
});

module.exports = APSaleEligibility;

// my-gallery/models/Artwork.js
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

// my-gallery/models/ArtworkLocations.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ArtworkLocations extends Model {}

ArtworkLocations.init({
  artworkLocationId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  artworkId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Artworks',
      key: 'id'
    }
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Locations',
      key: 'locationId'
    }
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Events',
      key: 'eventId'
    }
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'ArtworkLocations',
  tableName: 'ArtworkLocations',
  timestamps: true
});

module.exports = ArtworkLocations;

// my-gallery/models/ArtworkPending.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ArtworkPending extends Model {}

ArtworkPending.init({
  artworkPendingId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  artworkId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Artworks',
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId'
    }
  },
  pendingUntil: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'ArtworkPending',
  tableName: 'ArtworkPendings',
  timestamps: true
});

module.exports = ArtworkPending;

// my-gallery/models/ArtworkTransaction.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ArtworkTransaction extends Model {}

ArtworkTransaction.init({
  transactionId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  artworkId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Artworks',
      key: 'id'
    }
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Events',
      key: 'eventId'
    }
  },
  transactionType: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  currency: {
    type: DataTypes.STRING(3),
    allowNull: true
  },
  paymentMethod: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  termsConditions: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  transactionDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  partyAEntityId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'userId'
    }
  },
  partyBEntityId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'userId'
    }
  },
  agreementUrl: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'ArtworkTransaction',
  tableName: 'ArtworkTransactions',
  timestamps: true
});

module.exports = ArtworkTransaction;

// my-gallery/models/ArtworkTransfer.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ArtworkTransfer extends Model {}

ArtworkTransfer.init({
  artworkTransferId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  artworkId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Artworks',
      key: 'id'
    }
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Events',
      key: 'eventId'
    }
  },
  transferDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  transferType: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  fromUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId'
    }
  },
  toUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId'
    }
  },
  ownershipTransferred: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  possessionTransferred: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'ArtworkTransfer',
  tableName: 'ArtworkTransfers',
  timestamps: true
});

module.exports = ArtworkTransfer;

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

module.exports = AuditTrail;


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
    values: ['entangledPrints', 'fusedPortrait', 'fusedLandscape'],
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

// my-gallery/models/Document.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Document extends Model {}

Document.init({
  documentId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  documentType: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  documentUrl: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  saleId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Sales',
      key: 'saleId'
    }
  },
  transactionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'ArtworkTransactions',
      key: 'transactionId'
    }
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Events',
      key: 'eventId'
    }
  },
  productionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Productions',
      key: 'productionId'
    }
  },
  shippingId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Shippings',
      key: 'shippingId'
    }
  },
  artworkId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Artworks',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Document',
  tableName: 'Documents',
  timestamps: true,
  createdAt: 'creationDate'
});

module.exports = Document;

// my-gallery/models/Event.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Event extends Model {}

Event.init({
  eventId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  eventTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'EventTypes',
      key: 'eventTypeId'
    }
  },
  artworkId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Artworks',
      key: 'id'
    }
  },
  eventDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  transferType: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Event',
  tableName: 'Events',
  timestamps: true
});

module.exports = Event;

// my-gallery/models/EventRole.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class EventRole extends Model {}

EventRole.init({
  eventRoleId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Events',
      key: 'eventId'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId'
    }
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Roles',
      key: 'roleId'
    }
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'EventRole',
  tableName: 'EventRoles',
  timestamps: false
});

module.exports = EventRole;

// my-gallery/models/EventType.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class EventType extends Model {}

EventType.init({
  eventTypeId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  eventType: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'EventType',
  tableName: 'EventTypes',
  timestamps: false
});

module.exports = EventType;

// my-gallery/models/Locations.js

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

module.exports = Locations;

// my-gallery/models/OrganizationContactInfo.js

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

module.exports = OrganizationContactInfo;

// my-gallery/models/PersonContactInfo.js

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

module.exports = PersonContactInfo;


// Pricing.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const pricingMatrix = {
    '2:3': {
      entangledPrints: {
        S: 100,
        M: 200,
        L: 300,
        XL: 400,
      },
      fusedPortrait: {
        S: 150,
        M: 250,
        L: 350,
        XL: 450,
      },
      fusedLandscape: {
        S: 200,
        M: 300,
        L: 400,
        XL: 500,
      }
    },
    '3:4': {
      entangledPrints: {
        S: 110,
        M: 210,
        L: 310,
        XL: 410,
      },
      fusedPortrait: {
        S: 160,
        M: 260,
        L: 360,
        XL: 460,
      },
      fusedLandscape: {
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
      values: ['entangledPrints', 'fusedPortrait', 'fusedLandscape']
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
  
  module.exports = Pricing;
  
  // PrintSizes.js
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
    values: ['entangledPrints', 'fusedPortrait', 'fusedLandscape'],
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

module.exports = PrivacyPreferences;

// my-gallery/models/Production.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Production extends Model {}

Production.init({
  productionId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  artworkId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Artworks',
      key: 'id'
    }
  },
  printShopId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'PrintShops',
      key: 'printShopId'
    }
  },
  printerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'PrinterMachines',
      key: 'printerId'
    }
  },
  paperTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  inkTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  printingDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  proofingIterations: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  finalApprovalBy: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  additionalNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  printCost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  printInvoice: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  shippingId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Shippings',
      key: 'shippingId'
    }
  }
}, {
  sequelize,
  modelName: 'Production',
  tableName: 'Productions',
  timestamps: true,
  createdAt: 'creationDate',
  updatedAt: 'updatedDate'
});

module.exports = Production;

// my-gallery/models/ProvenanceLocations.js

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
      key: 'id'
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

module.exports = ProvenanceLocations;

// my-gallery/models/Role.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Role extends Model {}

Role.init({
  roleId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  roleName: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Role',
  tableName: 'Roles',
  timestamps: false
});

module.exports = Role;

// my-gallery/models/Sale.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Sale extends Model {}

Sale.init({
  saleId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  artworkId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Artworks',
      key: 'id'
    }
  },
  sellerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId'
    }
  },
  sellerAgentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'userId'
    }
  },
  buyerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId'
    }
  },
  buyerAgentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'userId'
    }
  },
  newOwnerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId'
    }
  },
  saleDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  salePrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  discountCode: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  discountPercentage: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  purchasePrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  saleType: {
    type: DataTypes.ENUM('Primary', 'Secondary'),
    allowNull: false
  },
  charityId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'userId'
    }
  },
  charityRevenue: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  sellerRevenue: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  buyerAgentFee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  sellerAgentFee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  artistResaleRoyalty: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  platformFee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  saleStatus: {
    type: DataTypes.ENUM('Pending', 'Completed', 'Cancelled'),
    allowNull: false
  },
  productionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Productions',
      key: 'productionId'
    }
  },
  shippingId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Shippings',
      key: 'shippingId'
    }
  },
  anonymousPurchase: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  agentPurchaserRelationship: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  termsConditions: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  paymentMethod: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Sale',
  tableName: 'Sales',
  timestamps: true
});

module.exports = Sale;

// my-gallery/models/Shipping.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Shipping extends Model {}

Shipping.init({
  shippingId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  artworkId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Artworks',
      key: 'id'
    }
  },
  originLocationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Locations',
      key: 'locationId'
    }
  },
  destinationLocationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Locations',
      key: 'locationId'
    }
  },
  shippingCompanyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ShippingCompanies',
      key: 'shippingCompanyId'
    }
  },
  trackingNumber: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  shippedDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  estimatedArrivalDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  actualArrivalDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  shippingCost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  shippingInvoice: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  insuranceValue: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Shipping',
  tableName: 'Shippings',
  timestamps: true
});

module.exports = Shipping;

// my-gallery/models/ShippingCompany.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ShippingCompany extends Model {}

ShippingCompany.init({
  shippingCompanyId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  companyName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  trackingUrlTemplate: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'ShippingCompany',
  tableName: 'ShippingCompanies',
  timestamps: false
});

module.exports = ShippingCompany;

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

module.exports = UserLocations;

// my-gallery/models/UserNotification.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class UserNotification extends Model {}

UserNotification.init({
  userNotificationId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId'
    }
  },
  artworkId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Artworks',
      key: 'id'
    }
  },
  notified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'UserNotification',
  tableName: 'UserNotifications',
  timestamps: true
});

module.exports = UserNotification;

// my-gallery/models/Users.js

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

module.exports = Users;

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
    UserNotification, ArtworkPending, ArtworkLocations } = models;

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

// Users.belongsTo(Users, { as: 'CreatedByUser', foreignKey: 'createdBy', constraints: false });



// my-gallery/models/index.js
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
    ArtworkTransfer: require('./ArtworkTransfer'),
    Loan: require('./Loan'),
    ArtworkImage: require('./ArtworkImage'),
    ExhibitionImage: require('./ExhibitionImage'),
    ArtworkTag: require('./ArtworkTag'),
    PrintShop: require('./PrintShop'),
    PrinterMachine: require('./PrinterMachine'),
    ShippingCompany: require('./ShippingCompany'),
    ArtworkPending: require('./ArtworkPending'),
    UserNotification: require('./UserNotification'),
    APSaleEligibility: require('./APSaleEligibility'),
    ArtworkLocations: require('./ArtworkLocations'),
    ProvenanceLocations: require('./ProvenanceLocations'),
  };
  