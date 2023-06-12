// csv_parser.js
const { createReadStream } = require('fs');
const csv = require('csv-parser');
const format = require('date-fns/format');
const path = require('path');

module.exports = function parseCSV(csvFilePath, date) {
  return new Promise((resolve, reject) => {
    const results = [];
    const cameraModels = new Set();
    const uniqueDates = new Set();
    const seriesCodes = new Set();

    const year = '20' + date.slice(0,2); 
    const month = date.slice(2,4); 

    const convertToDateFormal = (dateString) => {
      const year = 2000 + parseInt(dateString.substring(0, 2));
      const month = parseInt(dateString.substring(2, 4)) - 1;  // months are 0-indexed in JavaScript
      const day = parseInt(dateString.substring(4, 6));
    
      const dateObj = new Date(year, month, day);
    
      return dateObj.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    try {
    createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => {
        try {
        console.log('Data:', data); // Log the data being processed

        const { seriesCode, seriesName } = parseSeriesInfo(data['Keywords']);
        cameraModels.add(data['Model']);
        seriesCodes.add(data['Keywords'].split(' - ')[0]);

        const photoID = data['File name'].split('.')[0];

        const record = {
          photoID,
          series: data['Keywords'],
          seriesCode: seriesCode,
          seriesName: seriesName,
          date: data['File name'].split('.')[0].split('-')[0],
          number: data['File name'].split('.')[0].split('-')[1],
          dimensions: data['Dimensions'],
          aspectRatio: calculateAspectRatio(data['Dimensions']),
          model: data['Model'],
          lens: data['Lens'],
          focalLength: data['Focal length'],
          shutterSpeed: data['Shutter speed'],
          aperture: data['Aperture'],
          iso: data['ISO'],
          dateOriginal: new Date(data['Date Original']),
          dateFormal: convertToDateFormal(data['File name'].split('.')[0].split('-')[0]),
          imagePath: path.join('/assets/images/originals', year, month, date, data['File name'].replace('.CR2', '.jpg')),
          uniqueKey: data['File name'].split('.')[0] + '-' + format(new Date(data['Date Original']), 'HHmmss'),
        };
        console.log('Record:', record); // Log the constructed record
        results.push(record);

        const fileName = data['File name'];
        let dateFromFile; // Changed this from 'date' to 'dateFromFile' to avoid shadowing
        if (fileName && typeof fileName === 'string') {
          dateFromFile = fileName.split('.')[0].split('-')[0];
          uniqueDates.add(dateFromFile);
        } else {
          console.log('Unexpected value for file name:', fileName);
        }
    } catch (error) {
        console.error('Error while processing data', error);
      }
    })
      .on('end', () => {
        resolve({
          results,
          cameraModels: Array.from(cameraModels),
          seriesCodes: Array.from(seriesCodes),
          uniqueDates
        });
      })
      .on('error', (error) => {
        reject(error);
      });
    } catch (error) {
        console.error('Error reading CSV file:', error);
      }
  });
}

const parseSeriesInfo = (series) => {
  if (typeof series === 'string') {
    const parts = series.split(' - ');
    return {
      seriesCode: parts[0],
      seriesName: parts[1]
    };
  } else {
    console.error('Unexpected value for series:', series);
    return { seriesCode: null, seriesName: null };
  }
};

const gcd = (a, b) => {
    if (b === 0) {
        return a;
    } else {
        return gcd(b, a % b);
    }
};

const calculateAspectRatio = (dimensions) => {
    const [width, height] = dimensions.split(' x ').map(Number);
    const divisor = gcd(width, height);
    return `${width / divisor}:${height / divisor}`;
};
