// my-gallery/config/database.js

const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env]; 

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config // This now includes all remaining properties from the config
);

module.exports = sequelize;
