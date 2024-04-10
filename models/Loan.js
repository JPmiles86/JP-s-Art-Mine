// my-gallery/models/Loan.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Loan extends Model {}

Loan.init({
  loanId: {
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
  lenderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId'
    }
  },
  borrowerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId'
    }
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Locations',
      key: 'locationId'
    }
  },
  loanStatus: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  loanPurpose: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  startConditionReportId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'ConditionReports',
      key: 'conditionReportId'
    }
  },
  endConditionReportId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'ConditionReports',
      key: 'conditionReportId'
    }
  },
  loanAgreementId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Documents',
      key: 'documentId'
    }
  }
}, {
  sequelize,
  modelName: 'Loan',
  tableName: 'Loans',
  timestamps: true
});

module.exports = Loan;