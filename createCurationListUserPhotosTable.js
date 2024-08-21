const sequelize = require('./config/database');
const CurationListUserPhotos = require('./models/CurationListUserPhotos');

const createCurationListUserPhotosTable = async () => {
  try {
    await CurationListUserPhotos.sync({ alter: true });
    console.log("CurationListUserPhotos table created or updated!");
  } catch (error) {
    console.log("Unable to create or update CurationListUserPhotos table", error);
  }
};

createCurationListUserPhotosTable();
