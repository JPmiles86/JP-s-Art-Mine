const express = require('express');
const sequelize = require('./config/database');
const app = express();
const port = 4000;
const Photo = require('./models/Photo');
const Series = require('./models/Series');
const Dates = require('./models/Dates');
const ImageNumbers = require('./models/ImageNumbers');
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000', // replace with your client's domain
}));

app.use('/images', express.static('/Users/jpmiles/JPMilesArtGallery/my-gallery/build/assets/images/originals'));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/photos/date/:date', async (req, res) => {
  const { date } = req.params;
  try {
    const photos = await Photo.findAll({ where: { date } });
    res.json(photos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/photos/number/:number', async (req, res) => {
  const { number } = req.params;
  try {
    const photos = await Photo.findAll({ where: { number } });
    res.json(photos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/photos/series/:series', async (req, res) => {
  const { series } = req.params;
  try {
    const photos = await Photo.findAll({ 
      where: { seriesCode: series } 
    });
    res.json(photos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/photos/:photoID', async (req, res) => {
  const { photoID } = req.params;
  try {
    const photo = await Photo.findOne({ where: { photoID } });
    if (photo) {
      res.json({
        photoID: photo.photoID,
        seriesName: photo.seriesName,
        date: photo.date,
        number: photo.number,
        // add other required fields here
      });
    } else {
      res.status(404).send('Photo not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});



app.get('/api/series/:seriesCode', async (req, res) => {
  const { seriesCode } = req.params;
  try {
    const series = await Series.findAll({ where: { seriesCode } });
    res.json(series);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/dates/:date', async (req, res) => {
  const { date } = req.params;
  try {
    const dateData = await Dates.findAll({ where: { date } });
    res.json(dateData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/numbers/:number', async (req, res) => {
  const { number } = req.params;
  try {
    const numberData = await ImageNumbers.findAll({ where: { number } });
    res.json(numberData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


app.get('/api/series/:seriesCode/header', async (req, res) => {
  const { seriesCode } = req.params;
  try {
    const series = await Series.findByPk(seriesCode);
    if (series) {
      res.json({
        title: series.seriesName,
        description: series.shortDescription,
        extendedDescription: series.extendedDescription,
        imageUrl: series.imageUrl,
      });
    } else {
      res.status(404).json({ message: 'Series not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/dates/:date/header', async (req, res) => {
  const { date } = req.params;
  try {
    const dateData = await Dates.ByPk(date);
    if (dateData) {
      res.json({
        title: dateData.date,
        description: dateData.shortDescription,
        extendedDescription: dateData.extendedDescription,
        imageUrl: dateData.imageUrl,
      });
    } else {
      res.status(404).json({ message: 'Date not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/numbers/:number/header', async (req, res) => {
  const { number } = req.params;
  try {
    const numberData = await ImageNumbers.findByPk(number);
    if (numberData) {
      res.json({
        title: numberData.number,
        description: numberData.shortDescription,
        extendedDescription: numberData.extendedDescription,
        imageUrl: numberData.imageUrl,
      });
    } else {
      res.status(404).json({ message: 'Number not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    // Create the tables if they don't exist
    sequelize.sync();
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });