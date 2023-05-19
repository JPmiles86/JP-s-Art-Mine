const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const Photo = require('./models/Photo'); 
const CameraModel = require('./models/CameraModel');
const Series = require('./models/Series');
const Dates = require('./models/Dates');
const ImageNumbers = require('./models/ImageNumbers');
require('./models/associations');
const sequelize = require('./config/database');
const format = require('date-fns/format');

const results = [];
const cameraModels = new Set();
const uniqueDates = new Set();

const csvFilePath = path.join(__dirname, 'build', 'assets', 'images', 'originals', '2023', '03', '230321', '-230321.csv');
// Change file path above to import new folders/csv files. 

const parseSeriesInfo = (series) => {
    const parts = series.split(' - ');
    return {
      seriesCode: parts[0],
      seriesName: parts[1]
    };
  }

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

const createCameraModels = async () => {
    for (const model of cameraModels) {
      let cameraModel = await CameraModel.findOne({ where: { Model: model } });
      if (!cameraModel) {
        cameraModel = await CameraModel.create({ Model: model, cameraMake: 'Unknown', cameraModel: 'Unknown' });
      }
    }
  }

  const createOrUpdate = async (Model, condition, values) => {
    const item = await Model.findOne({ where: condition });
    if (!item) {
      return await Model.create(values);
    }
    return await item.update(values);
  }
  

  sequelize.sync()
  .then(() => {
    console.log('Tables have been created');
    
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => {
        const date = data['File name'].split('.')[0].split('-')[0];
        uniqueDates.add(date);
      })
      .on('end', async () => {
        for (const date of uniqueDates) {
          await createOrUpdate(Dates, { date }, { date });
        }

        fs.createReadStream(csvFilePath)
          .pipe(csv())
          .on('data', async (data) => {
            const { seriesCode, seriesName } = parseSeriesInfo(data['Keywords']);
            cameraModels.add(data['Model']);

            const record = {
              photoID: data['File name'].split('.')[0], 
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
              imagePath: path.join('/assets/images/originals/2023/03/230321', data['File name'].replace('.CR2', '.jpg')),
              uniqueKey: data['File name'].split('.')[0] + '-' + format(new Date(data['Date Original']), 'yyyyMMddHHmmss'),
            };
            results.push(record);
          })
          .on('end', async () => {
            await createCameraModels();

            for (const record of results) {
              await createOrUpdate(Series, { seriesCode: record.seriesCode }, { seriesCode: record.seriesCode, seriesName: record.seriesName });
            }

            Photo.bulkCreate(results, { returning: true })
            .then((createdPhotos) => {
              console.log('Data has been inserted successfully');
              console.log(createdPhotos);
            })
            .catch((error) => {
              console.error('Error inserting data', error);
              console.log('Failed records:', results);
            });
        });
    });
});
