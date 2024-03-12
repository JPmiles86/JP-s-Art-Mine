// my-gallery/server.js

const express = require('express');
const sequelize = require('./config/database');
const app = express();
const port = 4000;
const Photo = require('./models/Photo');
const Series = require('./models/Series');
const Dates = require('./models/Dates');
const ImageNumbers = require('./models/ImageNumbers');
const Artwork = require('./models/Artwork');
const Diptych = require('./models/Diptych');
const DiptychSVG = require('./models/DiptychSVG');
const Frame = require('./models/Frame');
const Pricing = require('./models/Pricing');
const PrintSizes = require('./models/PrintSizes');
const SizeCategories = require('./models/SizeCategories');
const Users = require('./models/Users');
const EntityType = require('./models/EntityType');
const Locations = require('./models/Locations');
const PersonContactInfo = require('./models/PersonContactInfo');
const OrganizationContactInfo = require('./models/OrganizationContactInfo');
const Artists = require('./models/Artists');
const ArtistsAdditionalPhotos = require('./models/ArtistsAdditionalPhotos');
const PrivacyPreferences = require('./models/PrivacyPreferences');
const AuditTrail = require('./models/AuditTrail');
const authRoutes = require('./routes/authRoutes');
const passport = require('passport');
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000', // replace with your client's domain
}));

app.use(express.json()); // Make sure you have this line to parse JSON body

app.use('/images', express.static('/Users/jpmiles/JPMilesArtGallery/my-gallery/build/assets/images/originals'));

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/photos/date/:date', async (req, res) => {
  const { date } = req.params;
  console.log(`Date: ${date}`);
  try {
    const photos = await Photo.findAll({ where: { date } });
    console.log(`Number of photos found: ${photos.length}`);
    res.json(photos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/photos/number/:number', async (req, res) => {
  const { number } = req.params;
  console.log(`Number: ${number}`);
  try {
    const photos = await Photo.findAll({ where: { number } });
    console.log(`Number of photos found: ${photos.length}`);
    res.json(photos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/photos/series/:series', async (req, res) => {
  const { series } = req.params;
  console.log(`Series: ${series}`);
  try {
    const photos = await Photo.findAll({ 
      where: { seriesCode: series } 
    });
    console.log(`Number of photos found: ${photos.length}`);
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
        shutterSpeed: photo.shutterSpeed,
        model: photo.model,
        lens: photo.lens,
        focalLength: photo.focalLength,
        aperture: photo.aperture,
        iso: photo.iso,
        dimensions: photo.dimensions,
        aspectRatio: photo.aspectRatio,
        dateOriginal: photo.dateOriginal,
        imagePath: photo.imagePath,
        uniqueKey: photo.uniqueKey,
        createdAt: photo.createdAt,
        updatedAt: photo.updatedAt,
        // Add any other fields you need
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
    const dateData = await Dates.findByPk(date);
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

// POST route to update the imageUrl for a specific date
app.post('/api/dates/update-image-url', async (req, res) => {
  const { date, imageUrl } = req.body;

  try {
    const updatedDateData = await Dates.update(
      { imageUrl: imageUrl },
      { where: { date: date }, returning: true }
    );

    if (updatedDateData) {
      // Sending back the updated data
      res.json(updatedDateData);
    } else {
      res.status(404).json({ message: 'Date not found or no update required' });
    }
  } catch (error) {
    console.error('Error updating image URL:', error);
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

// POST route to update the imageUrl for a specific number
app.post('/api/numbers/update-image-url', async (req, res) => {
  const { number, imageUrl } = req.body;

  try {
    const updatedNumberData = await ImageNumbers.update(
      { imageUrl: imageUrl },
      { where: { number: number }, returning: true } // Make sure your database and ORM supports the "returning" option
    );

    if (updatedNumberData) {
      // Sending back the updated data
      res.json(updatedNumberData);
    } else {
      res.status(404).json({ message: 'Number not found or no update required' });
    }
  } catch (error) {
    console.error('Error updating image URL:', error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/photos/filter/:filter', async (req, res) => {
  const { filter } = req.params;
  try {
    let photos;
    switch(filter) {
      case 'CST':
      case '230321':
      case '1125':
        photos = await Photo.findAll({ where: { filter } });
        break;
      // Add other cases here as needed
      default:
        photos = [];
        break;
    }
    res.json(photos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/photo/:photoID', async (req, res) => {
  const { photoID } = req.params;
  try {
    const photo = await Photo.findOne({ where: { photoID } });
    if (photo) {
      res.json(photo);
    } else {
      res.status(404).send('Photo not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/series', async (req, res) => {
  try {
    const series = await Series.findAll();
    res.json(series);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/diptychsvgs/:DiptychIdCode', async (req, res) => {
  const { DiptychIdCode } = req.params;
  try {
    const diptychSVG = await DiptychSVG.findOne({ where: { DiptychIdCode } });
    if (diptychSVG) {
      res.json(diptychSVG);
    } else {
      res.status(404).send('DiptychSVG not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/diptychsvgs/:DiptychId', async (req, res) => {
  const { DiptychId } = req.params;
  try {
    const diptychSVGs = await DiptychSVG.findAll({ where: { DiptychId } });
    if (diptychSVGs) {
      res.json(diptychSVGs);
    } else {
      res.status(404).json({ error: 'DiptychSVGs not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

app.get('/api/diptychsvgs/frame/:frameId', async (req, res) => {
  const { frameId } = req.params;
  try {
    const diptychSVGs = await DiptychSVG.findAll({ where: { FrameId: frameId } });
    res.json(diptychSVGs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// New API endpoint to fetch DiptychSVGs by aspectRatio and frameId
app.get('/api/diptychsvgs/aspectratio/:aspectRatio/frameid/:frameId/fused/:fused/shapeCode/:shapeCode', async (req, res) => {
  const { aspectRatio, frameId, fused, shapeCode } = req.params;
  try {
    const diptychSVGs = await DiptychSVG.findAll({
      where: {
        aspectRatio,
        FrameId: frameId, // assuming FrameId in the database is case-sensitive
        fused,
        shapeCode
      }
    });
    res.json(diptychSVGs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/diptychsvgs/aspectratio/:aspectRatio/frameid/:frameId/diptychid/:diptychId', async (req, res) => {
  const { aspectRatio, frameId, diptychId } = req.params;
  try {
    const filteredDiptychSVGs = await DiptychSVG.findAll({
      where: {
        aspectRatio,
        FrameId: frameId,
        DiptychId: diptychId
      }
    });
    res.json(filteredDiptychSVGs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/artworks/details/:photoId/:diptychId', async (req, res) => {
  const { photoId, diptychId } = req.params; // Using query parameters for filtering

  try {
    // First, find the Photo entry to get the id that matches the photoID string
    const photo = await Photo.findOne({ where: { photoID: photoId } });
    if (!photo) {
      return res.status(404).send('Photo not found');
    }
    // Use the retrieved photo's id to find related Artworks
    const artworks = await Artwork.findAll({
      where: {
        photoRefId: photo.id, 
        diptychId: diptychId,
      },
      include: [
        { model: SizeCategories },
        { model: Pricing },
        {
          model: PrintSizes,
          attributes: ['sizeInInches', 'sizeInCm'] // Explicitly request these attributes
        },
        { model: Photo },
        { model: Diptych },
      ],
    });

    // Transform the sequelize objects into the shape you want to send to the client
    const details = artworks.map(artwork => ({
      artworkId: artwork.artworkID,
      photoId: artwork.Photo?.photoID,
      sizeName: artwork.SizeCategory?.sizeName, 
      price: artwork.Pricing?.price,
      printSizeInInches: artwork.PrintSize?.sizeInInches, 
      printSizeInCm: artwork.PrintSize?.sizeInCm,
      status: artwork.status,
      photoDate: artwork.Photo?.date, 
      photoNumber: artwork.Photo?.number,
      shutterSpeed: artwork.Photo?.shutterSpeed,
      seriesName: artwork.Photo?.seriesName, 
      diptychName: artwork.Diptych?.diptychName, 
      edition: artwork.edition,
    }));

    res.json(details); 
  } catch (error) {
    console.error("Detailed error: ", error);
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