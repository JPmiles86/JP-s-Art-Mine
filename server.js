// my-gallery/server.js

const express = require('express');
const { Sequelize, Op } = require('sequelize');
const sequelize = require('./config/database');
const app = express();
const port = 4000;
const multer = require('multer');
const path = require('path');
require('./models/associations');
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
const Like = require('./models/Like');
const HiddenPhoto = require('./models/HiddenPhoto');
const UserLocations = require('./models/UserLocations');
const authRoutes = require('./routes/authRoutes');
const passport = require('passport');
const url = require('url');
const querystring = require('querystring');
const cors = require('cors');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/Users/jpmiles/JPMilesArtGallery/my-gallery/build/assets/images/originals/userProfileImages');
  },
  filename: function (req, file, cb) {
    const userId = req.params.userId;
    const timestamp = Date.now();
    cb(null, `${userId}_${timestamp}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
});

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
  const parsedQueryString = querystring.parse(req.url.split('?')[1]);
  const userRole = parsedQueryString.userRole;

  console.log('User Role:', userRole);

  try {
    const whereCondition = { date };

    if (userRole !== 'Admin') {
      whereCondition.id = {
        [Op.notIn]: Sequelize.literal(`(SELECT "photoId" FROM "HiddenPhotos")`)
      };
    }

    const photos = await Photo.findAll({
      where: whereCondition,
    });

    const photosWithHiddenStatus = await Promise.all(
      photos.map(async (photo) => {
        const isHidden = !!(await HiddenPhoto.findOne({
          where: { photoId: photo.id },
        }));
        return {
          ...photo.toJSON(),
          isHidden,
        };
      })
    );

    console.log(`Number of photos found: ${photosWithHiddenStatus.length}`);
    res.json(photosWithHiddenStatus);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/photos/number/:number', async (req, res) => {
  const { number } = req.params;
  const parsedQueryString = querystring.parse(req.url.split('?')[1]);
  const userRole = parsedQueryString.userRole;

  console.log('User Role:', userRole);

  try {
    const whereCondition = { number };

    if (userRole !== 'Admin') {
      whereCondition.id = {
        [Op.notIn]: Sequelize.literal(`(SELECT "photoId" FROM "HiddenPhotos")`)
      };
    }

    const photos = await Photo.findAll({
      where: whereCondition,
    });

    const photosWithHiddenStatus = await Promise.all(
      photos.map(async (photo) => {
        const isHidden = !!(await HiddenPhoto.findOne({
          where: { photoId: photo.id },
        }));
        return {
          ...photo.toJSON(),
          isHidden,
        };
      })
    );

    console.log(`Number of photos found: ${photosWithHiddenStatus.length}`);
    res.json(photosWithHiddenStatus);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/photos/series/:series', async (req, res) => {
  const { series } = req.params;
  const parsedQueryString = querystring.parse(req.url.split('?')[1]);
  const userRole = parsedQueryString.userRole;

  console.log('User Role:', userRole);

  try {
    const whereCondition = { seriesCode: series };

    if (userRole !== 'Admin') {
      whereCondition.id = {
        [Op.notIn]: Sequelize.literal(`(SELECT "photoId" FROM "HiddenPhotos")`)
      };
    }

    const photos = await Photo.findAll({
      where: whereCondition,
    });

    const photosWithHiddenStatus = await Promise.all(
      photos.map(async (photo) => {
        const isHidden = !!(await HiddenPhoto.findOne({
          where: { photoId: photo.id },
        }));
        return {
          ...photo.toJSON(),
          isHidden,
        };
      })
    );

    console.log(`Number of photos found: ${photosWithHiddenStatus.length}`);
    res.json(photosWithHiddenStatus);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/photos/filter/:filter', async (req, res) => {
  const { filter } = req.params;
  const parsedQueryString = querystring.parse(req.url.split('?')[1]);
  const userRole = parsedQueryString.userRole;

  console.log('User Role:', userRole);

  try {
    let whereCondition;

    switch (filter) {
      case 'CST':
      case '230321':
      case '1125':
        whereCondition = { filter };
        break;
      // Add other cases here as needed
      default:
        whereCondition = {};
        break;
    }

    if (userRole !== 'Admin') {
      whereCondition.id = {
        [Op.notIn]: Sequelize.literal(`(SELECT "photoId" FROM "HiddenPhotos")`)
      };
    }

    const photos = await Photo.findAll({
      where: whereCondition,
    });

    const photosWithHiddenStatus = await Promise.all(
      photos.map(async (photo) => {
        const isHidden = !!(await HiddenPhoto.findOne({
          where: { photoId: photo.id },
        }));
        return {
          ...photo.toJSON(),
          isHidden,
        };
      })
    );

    res.json(photosWithHiddenStatus);
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

app.post('/api/likes', async (req, res) => {
  const { userId, photoId, diptychIdCode, isLiked } = req.body;
  console.log('Received data:', { userId, photoId, diptychIdCode, isLiked });

  try {
    // Find the photo by its photoID and extract the id
    const photo = await Photo.findOne({ where: { photoID: photoId } });
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    const photoIdInt = photo.id;

    // Find the diptych by its DiptychIdCode and extract the id
    const diptych = await DiptychSVG.findOne({ where: { DiptychIdCode: diptychIdCode } });
    if (!diptych) {
      return res.status(404).json({ error: 'Diptych not found' });
    }
    const diptychIdInt = diptych.id;

    // Check if a like record already exists for the user and photo/diptych combination
    const existingLike = await Like.findOne({
      where: {
        userId,
        photoId: photoIdInt,
        diptychIdCode: diptychIdInt,
      },
    });

    if (existingLike) {
      // Update the isLiked value of the existing like record
      existingLike.isLiked = isLiked;
      await existingLike.save();
      res.json(existingLike);
    } else {
      // Create a new like record
      const like = await Like.create({ userId, photoId: photoIdInt, diptychIdCode: diptychIdInt, isLiked });
      res.json(like);
    }
  } catch (error) {
    console.error('Error creating like:', error);
    res.status(500).send('Server Error');
  }
});

app.put('/api/likes/:photoId/:diptychIdCode', async (req, res) => {
  const { photoId, diptychIdCode } = req.params;
  const { userId, isLiked } = req.body;

  try {
    // Find the photo by its photoID and extract the id
    const photo = await Photo.findOne({ where: { photoID: photoId } });
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    const photoIdInt = photo.id;

    // Find the diptych by its DiptychIdCode and extract the id
    const diptych = await DiptychSVG.findOne({ where: { DiptychIdCode: diptychIdCode } });
    if (!diptych) {
      return res.status(404).json({ error: 'Diptych not found' });
    }
    const diptychIdInt = diptych.id;

    // Find the like record
    const like = await Like.findOne({
      where: {
        userId,
        photoId: photoIdInt,
        diptychIdCode: diptychIdInt,
      },
    });

    if (like) {
      // Update the isLiked value
      like.isLiked = isLiked;
      await like.save();
      res.json(like);
    } else {
      res.status(404).send('Like not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/likes/:userId/:photoId/:diptychIdCode', async (req, res) => {
  const { userId, photoId, diptychIdCode } = req.params;

  try {
    // Find the photo by its photoID and extract the id
    const photo = await Photo.findOne({ where: { photoID: photoId } });
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    const photoIdInt = photo.id;

    // Find the diptych by its DiptychIdCode and extract the id
    const diptych = await DiptychSVG.findOne({ where: { DiptychIdCode: diptychIdCode } });
    if (!diptych) {
      return res.status(404).json({ error: 'Diptych not found' });
    }
    const diptychIdInt = diptych.id;

    // Check if a like record exists for the user and photo/diptych combination
    const existingLike = await Like.findOne({
      where: {
        userId,
        photoId: photoIdInt,
        diptychIdCode: diptychIdInt,
      },
    });

    if (existingLike) {
      res.json({ isLiked: existingLike.isLiked });
    } else {
      res.json({ isLiked: false });
    }
  } catch (error) {
    console.error('Error checking like status:', error);
    res.status(500).send('Server Error');
  }
});

app.put('/api/photos/:photoId/hide', async (req, res) => {
  const { photoId } = req.params;
  const { hide, userId, userRole } = req.body;

  try {
    // Check if the user is an admin
    if (userRole !== 'Admin') {
      return res.status(403).json({ error: 'Forbidden: Only admins can perform this action' });
    }

    // Find the photo by its photoID
    const photo = await Photo.findOne({ where: { photoID: photoId } });
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    // Check if the photo is already hidden or visible
    const isHidden = await HiddenPhoto.findOne({
      where: {
        photoId: photo.id,
        userId,
      },
    });

    if (hide && !isHidden) {
      // Hide the photo
      await HiddenPhoto.create({
        photoId: photo.id,
        userId,
      });
      res.json({ message: 'Photo hidden successfully' });
    } else if (!hide && isHidden) {
      // Unhide the photo
      await HiddenPhoto.destroy({
        where: {
          photoId: photo.id,
          userId,
        },
      });
      res.json({ message: 'Photo unhidden successfully' });
    } else {
      res.status(400).json({ error: 'Photo is already in the requested state' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/photos/hidden', async (req, res) => {
  try {
    const hiddenPhotos = await HiddenPhoto.findAll({
      where: { isVisible: false },
      include: [{ model: Photo }]
    });
    res.json(hiddenPhotos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/photos/:photoId/hidden-status', async (req, res) => {
  const { photoId } = req.params;

  try {
    // Find the photo by its photoID
    const photo = await Photo.findOne({ where: { photoID: photoId } });
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    // Check if a hidden photo record exists for the photo
    const hiddenPhoto = await HiddenPhoto.findOne({
      where: {
        photoId: photo.id,
      },
    });

    if (hiddenPhoto) {
      res.json({ isHidden: true });
    } else {
      res.json({ isHidden: false });
    }
  } catch (error) {
    console.error('Error checking photo hidden status:', error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/users/:userId/profile', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await Users.findByPk(userId, {
      include: [
        {
          model: EntityType,
          include: [
            {
              model: PersonContactInfo,
              include: [{ model: UserLocations, include: [Locations] }],
            },
            {
              model: OrganizationContactInfo,
              include: [{ model: UserLocations, include: [Locations] }],
            },
          ],
        },
      ],
    });

    if (!user) {
      console.log(`User with userId ${userId} not found`);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User found:', user.toJSON());

    const entityType = user.EntityType;
    const personContactInfo = entityType?.PersonContactInfo;
    const organizationContactInfo = entityType?.OrganizationContactInfo;

    const responseData = {
      user: {
        userId: user.userId,
        email: user.email,
        username: user.username,
        isAnonymous: user.isAnonymous,
        profilePhotoUrl: user.profilePhotoUrl,
      },
      entityType: entityType?.entityType,
      personContactInfo: personContactInfo
        ? {
            ...personContactInfo.toJSON(),
            locations: personContactInfo.UserLocations?.map((ul) => ul.Location),
          }
        : null,
      organizationContactInfo: organizationContactInfo
        ? {
            ...organizationContactInfo.toJSON(),
            locations: organizationContactInfo.UserLocations?.map((ul) => ul.Location),
          }
        : null,
    };

    console.log('Response data:', responseData);

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/users/:userId/profile', async (req, res) => {
  const { userId } = req.params;
  const { entityType, personContactInfo, organizationContactInfo } = req.body;

  console.log('Updating user profile:', { userId, entityType });

  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the EntityType record exists for the user
    let userEntityType = await EntityType.findOne({ where: { userId } });

    if (!userEntityType) {
      // Create the EntityType record if it doesn't exist
      userEntityType = await EntityType.create({ userId, entityType });
    } else {
      // Update the user's entity type if it exists
      await userEntityType.update({ entityType });
    }

    if (entityType === 'Person') {
      // Update or create the person contact info
      await PersonContactInfo.upsert({
        ...personContactInfo,
        entityId: userEntityType.entityId,
      });
    } else if (entityType === 'Organization') {
      // Update or create the organization contact info
      await OrganizationContactInfo.upsert({
        ...organizationContactInfo,
        entityId: userEntityType.entityId,
      });
    }

    // Update the user's locations
   // await UserLocations.destroy({ where: { personContactInfoId: userEntityType.PersonContactInfo?.personContactId } });
   // await UserLocations.destroy({ where: { organizationContactInfoId: userEntityType.OrganizationContactInfo?.organizationContactId } });

  //  const userLocations = locations.map((location) => ({
  //    ...location,
  //    personContactInfoId: entityType === 'Person' ? userEntityType.PersonContactInfo?.personContactId : null,
  //    organizationContactInfoId: entityType === 'Organization' ? userEntityType.OrganizationContactInfo?.organizationContactId : null,
  //  }));

  //  await UserLocations.bulkCreate(userLocations);

  console.log('User profile updated successfully');  
  res.json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).send('Server Error');
  }
});

app.post('/api/users/:userId/profile-photo', upload.single('profilePhoto'), async (req, res) => {
  const userId = req.params.userId;
  const profilePhotoUrl = `/userProfileImages/${req.file.filename}`;

  try {
    // Find the user in the database
    const user = await Users.findByPk(userId);

    if (user) {
      // Delete the old profile photo file if it exists
      if (user.profilePhotoUrl) {
        const oldPhotoPath = path.join('/Users/jpmiles/JPMilesArtGallery/my-gallery/build/assets/images/originals', user.profilePhotoUrl);
        console.log('Old photo path:', oldPhotoPath);
        if (fs.existsSync(oldPhotoPath)) {
          console.log('Deleting old profile photo:', oldPhotoPath);
          fs.unlinkSync(oldPhotoPath);
        } else {
          console.log('Old profile photo not found:', oldPhotoPath);
        }
      }

      // Update the user's profile in the database with the new profilePhotoUrl
      await user.update({ profilePhotoUrl: profilePhotoUrl });
      res.json({ profilePhotoUrl: profilePhotoUrl });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating profile photo:', error);
    res.status(500).json({ error: 'Failed to update profile photo' });
  }
});

app.get('/api/users/check-username/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const existingUser = await Users.findOne({ where: { username } });

    if (existingUser) {
      res.status(200).json({ isUnique: false });
    } else {
      res.status(200).json({ isUnique: true });
    }
  } catch (error) {
    console.error('Error checking username uniqueness:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/users/:userId/locations', async (req, res) => {
  const { userId } = req.params;

  try {
    const locations = await UserLocations.findAll({
      where: {
        [Op.or]: [
          { personContactInfoId: { [Op.not]: null } },
          { organizationContactInfoId: { [Op.not]: null } },
        ],
      },
      include: [Locations],
    });

    res.json(locations);
  } catch (error) {
    console.error('Error fetching user locations:', error);
    res.status(500).send('Server Error');
  }
});

app.post('/api/users/:userId/locations', async (req, res) => {
  const { userId } = req.params;
  const { locationData } = req.body;

  try {
    const user = await Users.findByPk(userId, {
      include: [
        {
          model: EntityType,
          include: [PersonContactInfo, OrganizationContactInfo],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const location = await Locations.create(locationData);

    const userLocation = {
      locationId: location.locationId,
      personContactInfoId: user.EntityType.entityType === 'Person' ? user.EntityType.PersonContactInfo.personContactId : null,
      organizationContactInfoId: user.EntityType.entityType === 'Organization' ? user.EntityType.OrganizationContactInfo.organizationContactId : null,
    };

    const createdUserLocation = await UserLocations.create(userLocation);

    res.json(createdUserLocation);
  } catch (error) {
    console.error('Error creating user location:', error);
    res.status(500).send('Server Error');
  }
});

app.put('/api/users/:userId/locations/:locationId', async (req, res) => {
  const { userId, locationId } = req.params;
  const { locationData } = req.body;

  try {
    const userLocation = await UserLocations.findOne({
      where: {
        locationId,
        [Op.or]: [
          { personContactInfoId: { [Op.not]: null } },
          { organizationContactInfoId: { [Op.not]: null } },
        ],
      },
    });

    if (!userLocation) {
      return res.status(404).json({ error: 'User location not found' });
    }

    await Locations.update(locationData, { where: { locationId: locationId } });

    res.json({ message: 'User location updated successfully' });
  } catch (error) {
    console.error('Error updating user location:', error);
    res.status(500).send('Server Error');
  }
});

app.delete('/api/users/:userId/locations/:locationId', async (req, res) => {
  const { userId, locationId } = req.params;

  try {
    const userLocation = await UserLocations.findOne({
      where: {
        locationId,
        [Op.or]: [
          { personContactInfoId: { [Op.not]: null } },
          { organizationContactInfoId: { [Op.not]: null } },
        ],
      },
    });

    if (!userLocation) {
      return res.status(404).json({ error: 'User location not found' });
    }

    await userLocation.destroy();
    await Locations.destroy({ where: { locationId: locationId } });

    res.json({ message: 'User location deleted successfully' });
  } catch (error) {
    console.error('Error deleting user location:', error);
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