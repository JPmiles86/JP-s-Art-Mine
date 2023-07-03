const fs = require('fs');
const Papa = require('papaparse');
const { DiptychSVG } = require('./models'); // Import the DiptychSVG model

const createDiptychSVGsTable = async () => {
  try {
    // Drop and recreate the DiptychSVGs table
    await DiptychSVG.sync({ force: true });
    console.log('DiptychSVGs table dropped and recreated!');

    // Read the CSV file
    const csvData = fs.readFileSync('/Users/jpmiles/JPMilesArtGallery/my-gallery/DiptychSVGsData.csv', 'utf8');

    // Parse the CSV data
    const { data } = Papa.parse(csvData, { header: true });

    // Insert the parsed data into the DiptychSVGs table
    await DiptychSVG.bulkCreate(data);
    console.log('Data imported successfully!');
  } catch (error) {
    console.log('Error occurred while creating DiptychSVGs table and importing data:', error);
  }
};

createDiptychSVGsTable();
