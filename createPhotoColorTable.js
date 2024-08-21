// my-gallery/createPhotoColorTable.js
const sequelize = require('./config/database');
const PhotoColor = require('./models/PhotoColor');

const createPhotoColorTable = async () => {
    try {
        await PhotoColor.sync({alter: true});
        console.log("PhotoColor table created or updated successfully!");
    } catch (error) {
        console.error("Unable to create or update PhotoColor table:", error);
        if (error.name === 'SequelizeDatabaseError') {
            console.error("SQL Error:", error.parent.sql);
        }
    } finally {
        await sequelize.close();
    }
};

createPhotoColorTable();