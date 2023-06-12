// insert_data.js
const sequelize = require('./config/database');
const Photo = require('./models/Photo');
const Dates = require('./models/Dates');
const CameraModel = require('./models/CameraModel');
const Series = require('./models/Series');

module.exports = async function insertData(data) {
  console.log('InsertData input:', data);
  await sequelize.sync();

  // A helper function to create the Series
  async function createSeries(seriesCode, seriesName, imageUrl) {
    const existingSeries = await Series.findOne({ where: { seriesCode: seriesCode } });

    if (!existingSeries) {
      await Series.create({ seriesCode: seriesCode, seriesName: seriesName, imageUrl: imageUrl });
    }
  }

  // Prepare an empty array to hold our new photo records
  let newPhotos = [];

  // Create a set to hold unique series and camera models
  const uniqueSeries = new Set();
  const uniqueCameraModels = new Set();

  // Loop over each item in the data results
  for (const item of data.results) {
    const dateFormal = item.dateFormal;
    const date = item.date; // Assuming your parsed data contains a 'date' field 

    // Check if date exists in Dates table
    const existingDate = await Dates.findOne({ where: { date: date } });

    // If it does not exist, create a new Date record
    if (!existingDate) {
      const dateRecord = {
        date: date, // Adding 'date' to the record
        dateFormal: dateFormal,
        imageUrl: item.imagePath // Set imageUrl as the imagePath of the first photo for each unique date
      };

      // Create the date record
      await Dates.create(dateRecord);
    }

    // Add the item's series and camera model to the unique set
    uniqueSeries.add({ seriesCode: item.seriesCode, seriesName: item.seriesName, imageUrl: item.imagePath });
    uniqueCameraModels.add(item.model);

    // Now we can add the photo record to our array, since the necessary Date record exists
    newPhotos.push(item);
  }

  // Loop over each unique series and create a new Series record
  for (const series of uniqueSeries) {
    await createSeries(series.seriesCode, series.seriesName, series.imageUrl);
  }

  // Loop over each unique camera model and create a new CameraModel record
  for (const model of uniqueCameraModels) {
    const existingModel = await CameraModel.findOne({ where: { Model: model } });

    // If it does not exist, create a new CameraModel record
    if (!existingModel) {
      await CameraModel.create({ Model: model });
    }
  }

  // Now that we've added all necessary Date records, we can bulk create the Photo records
  console.log('InsertData bulkCreate input:', newPhotos);
  
  // Bulk create the photos and ignore any duplicate entries
  const photos = await Photo.bulkCreate(newPhotos, { ignoreDuplicates: true, returning: true });

  return photos;
};
