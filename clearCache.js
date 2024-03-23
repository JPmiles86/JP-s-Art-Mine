const sequelize = require('./config/database');

sequelize.modelManager.removeModel('Photo');
sequelize.modelManager.removeModel('HiddenPhoto');

console.log('Cache cleared successfully!');