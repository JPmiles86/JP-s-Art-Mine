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