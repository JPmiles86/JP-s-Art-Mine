// my-gallery/models/ConditionReport.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ConditionReport extends Model {}

ConditionReport.init({
  conditionReportId: {
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
  dateReported: {
    type: DataTypes.DATE,
    allowNull: false
  },
  reporterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId'
    }
  },
  conditionSummary: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  detailedReport: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  images: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'ConditionReport',
  tableName: 'ConditionReports',
  timestamps: true
});

module.exports = ConditionReport;