// my-gallery/createDocumentTable.js
const sequelize = require('./config/database');
const Document = require('./models/Document');

const createDocumentTable = async () => {
  try {
    await Document.sync({ alter: true });
    console.log("Document table created or updated!");
  } catch (error) {
    console.log("Unable to create or update Document table", error);
  }
};

createDocumentTable();