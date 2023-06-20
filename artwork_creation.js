// artwork_creation.js
const Artwork = require('./models/Artwork');
const Diptych = require('./models/Diptych');
const SizeCategories = require('./models/SizeCategories');
const Pricing = require('./models/Pricing');
const PrintSizes = require('./models/PrintSizes');
const sequelize = require('./config/database');

const diptychNameToTypeMapping = {
  'Entangled': 'Singles',
  'Circle': 'mergedLandscape',
  'Diamond': 'mergedPortrait',
  'Square': 'mergedLandscape',
  'Triangle': 'mergedPortrait'
};

const aspectRatioToDiptychRatioMapping = {
  '2:3': {
    'Entangled': '2x2:3',
    'Circle': '3:1',
    'Diamond': '4:3',
    'Square': '3:1',
    'Triangle': '4:3'
  },
  '3:4': {
    'Entangled': '2x3:4',
    'Circle': '8:3',
    'Diamond': '3:2',
    'Square': '8:3',
    'Triangle': '3:2'
  }
};

const sizes = ['S', 'M', 'L', 'XL'];
const editions = ['CP', 'AP'];


module.exports = async function createArtworks(photos) {
  const artworkResults = [];

  for (const photo of photos) {
    const transformedArtworkData = await transformPhotoToArtworkData(photo);
    artworkResults.push(...transformedArtworkData);
  }

  return Artwork.bulkCreate(artworkResults, { returning: true });
}

async function transformPhotoToArtworkData(photo) {
  console.log(photo);
  const records = [];

  for (const diptychName in diptychNameToTypeMapping) {
    const diptychTypeRecord = await Diptych.findOne({ where: { diptychName: diptychName } });
    
    for (const sizeName of sizes) {
      const sizeRecord = await SizeCategories.findOne({ where: { sizeLabel: sizeName } });

      for (const edition of editions) {
        const artworkID = `${photo.photoID}-${diptychName}-${aspectRatioToDiptychRatioMapping[photo.aspectRatio][diptychName]}-${sizeName}-${edition}`; 

        const pricing = await Pricing.findOne({
          where: {
            sizeCategoryId: sizeRecord.id,
            photoAspectRatio: photo.aspectRatio,
            diptychType: diptychTypeRecord.diptychType,
          }
        });
        
        const printSize = await PrintSizes.findOne({
          where: {
            sizeCategoryId: sizeRecord.id,
            photoAspectRatio: photo.aspectRatio,
            diptychType: diptychTypeRecord.diptychType,
          }
        });

        const record = {
          artworkID,
          diptychId: diptychTypeRecord.id,
          sizeCategoryId: sizeRecord.id,
          edition: edition,
          status: 'Available', 
          photoRefId: photo.id // This assumes that photo.id is set to the database ID of the photo
        };

        if (pricing && printSize) {
          record.pricingId = pricing.id;
          record.printSizeId = printSize.id;
        } else {
          console.error('Could not find matching Pricing or PrintSize record for artwork:', record);
        }

        records.push(record);
      }
    }
  }

  return records;
}