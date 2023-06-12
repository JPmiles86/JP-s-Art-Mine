// populatePrintSizes.js
const PrintSizes = require('./models/PrintSizes');
const SizeCategories = require('./models/SizeCategories');
const sizeMatrix = require('./SizeMatrix');

const populatePrintSizesTable = async () => {
  const sizeCategories = await SizeCategories.findAll();
  const sizeCategoriesMap = sizeCategories.reduce((map, sizeCategory) => {
    map[sizeCategory.sizeLabel] = sizeCategory.id;
    return map;
  }, {});

  console.log("sizeCategoriesMap:", sizeCategoriesMap); // Add this
  console.log("sizeMatrix:", sizeMatrix); // Add this
  console.log("Keys in sizeMatrix:", Object.keys(sizeMatrix)); // Add this

  for (let photoAspectRatio in sizeMatrix) {
    console.log("photoAspectRatio:", photoAspectRatio); // Add this

    for (let diptychType in sizeMatrix[photoAspectRatio]) {
      console.log("diptychType:", diptychType); // Add this

      for (let sizeCategoryId in sizeMatrix[photoAspectRatio][diptychType]) {
        console.log("sizeCategoryId:", sizeCategoryId); // Add this

        let sizeInInches = sizeMatrix[photoAspectRatio][diptychType][sizeCategoryId];
        console.log("sizeInInches:", sizeInInches); // Add this

        const [widthInInches, heightInInches] = sizeInInches.split("x").map(Number);
        const widthInCm = (widthInInches * 2.54).toFixed(2);
        const heightInCm = (heightInInches * 2.54).toFixed(2);
        const sizeInCm = `${widthInCm}x${heightInCm}`;

        console.log("Creating record for", sizeCategoryId, photoAspectRatio, diptychType);
        await PrintSizes.create({
            sizeCategoryId: sizeCategoriesMap[sizeCategoryId],
            photoAspectRatio,
            diptychType,
            sizeInInches,
            sizeInCm
        });
      }
    }
  }
  console.log('PrintSizes table has been populated.');
}

populatePrintSizesTable();