// createArtworksTable.js
const sequelize = require('./config/database');
const Artwork = require('./models/Artwork');

const createArtworksTable = async () => {
    try {
        await Artwork.sync({alter: true});
        console.log("Artworks table created or updated!");
    } catch (error) {
        console.log("Unable to create or update Artworks table", error);
    }
};

createArtworksTable();
