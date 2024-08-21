// my-gallery/createPhotosTable.js
const sequelize = require('./config/database');
const Photo = require('./models/Photo');

const createPhotosTable = async () => {
    try {
        await Photo.sync({alter: true});
        console.log("Photos table created or updated!");
    } catch (error) {
        console.log("Unable to create or update Photos table", error);
    }
};

createPhotosTable();
