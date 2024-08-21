const sequelize = require('./config/database');
const Photo = require('./models/Photo');
const Dates = require('./models/Dates');
const CameraModel = require('./models/CameraModel');
const Series = require('./models/Series');

module.exports = async function insertData(data) {
  console.log('InsertData input:', data);
  await sequelize.sync();

  // A helper function to create or update the Series with imageUrl if missing
  async function createOrUpdateSeries(seriesCode, seriesName, imageUrl) {
    const existingSeries = await Series.findOne({ where: { seriesCode: seriesCode } });

    if (!existingSeries) {
      await Series.create({ seriesCode: seriesCode, seriesName: seriesName, imageUrl: imageUrl });
    } else if (!existingSeries.imageUrl) {
      await existingSeries.update({ imageUrl: imageUrl });
    }
  }

  // Prepare an empty array to hold our new photo records
  let newPhotos = [];

  // Create an object to track unique series and camera models
  const uniqueSeries = {};
  const uniqueCameraModels = new Set();

  // Loop over each item in the data results
  for (const item of data.results) {
    const dateFormal = item.dateFormal;
    const date = item.date; // Assuming your parsed data contains a 'date' field 

    // Prepend the required path to the image URL for series
    const fullImageUrl = `/my-gallery/public${item.imagePath}`;

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

    // Add the item's series to the unique series object
    if (!uniqueSeries[item.seriesCode]) {
      uniqueSeries[item.seriesCode] = {
        seriesCode: item.seriesCode,
        seriesName: item.seriesName,
        imageUrl: fullImageUrl,  // Use the modified URL here
      };
    }

    // Add the item's camera model to the unique set
    uniqueCameraModels.add(item.model);

    // Now we can add the photo record to our array, since the necessary Date record exists
    newPhotos.push(item);
  }

  // Loop over each unique series and create or update the Series record
  for (const seriesCode in uniqueSeries) {
    const series = uniqueSeries[seriesCode];
    await createOrUpdateSeries(series.seriesCode, series.seriesName, series.imageUrl);
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
