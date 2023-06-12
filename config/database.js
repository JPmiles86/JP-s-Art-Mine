const { Sequelize } = require('sequelize');

const config = {
    development: {
      username: 'jpm_art',
      password: 'Willywanka1',
      database: 'jpm_art_database',
      host: '127.0.0.1',
      dialect: 'postgres',
      operatorsAliases: false
    }
};

const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
      host: config.development.host,
      dialect: 'postgres',
      timezone: 'UTC', // Add this line
    }
);

module.exports = sequelize;
