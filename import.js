// import.js
const fs = require('fs');
const parseCSV = require('./csv_parser');
const insertData = require('./insert_data');
const createArtworks = require('./artwork_creation');
const { resolve } = require('path');

const date = '230330'; // Change this to modify YYMMDD

const year = '20' + date.slice(0,2); // extracts '23' and prefixes it with '20' to get '2023'
const month = date.slice(2,4); // extracts '03'

const csvFileName = `-${date}.csv`;
const csvDirectory = `originals/${year}/${month}/${date}`;

const csvFilePath = resolve(__dirname, 'build', 'assets', 'images', csvDirectory, csvFileName);

// check if the file exists
if (!fs.existsSync(csvFilePath)) {
    console.error(`CSV file does not exist: ${csvFilePath}`);
    process.exit(1);
}

parseCSV(csvFilePath, date)
  .then(insertData)
  .then(createArtworks)
  .then(() => {
    console.log('Import completed successfully');
  })
  .catch((error) => {
    console.error('Error during import', error);
  });
