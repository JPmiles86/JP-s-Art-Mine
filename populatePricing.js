// populatePricing.js
const Pricing = require('./models/Pricing');
const SizeCategories = require('./models/SizeCategories');
const priceMatrix = require('./PriceMatrix');

const populatePricingTable = async () => {
  const sizeCategories = await SizeCategories.findAll();
  const sizeCategoriesMap = sizeCategories.reduce((map, sizeCategory) => {
    map[sizeCategory.sizeLabel] = sizeCategory.id;
    return map;
  }, {});

  console.log("sizeCategoriesMap:", sizeCategoriesMap); // Add this
  console.log("priceMatrix:", priceMatrix); // Add this
  console.log("Keys in priceMatrix:", Object.keys(priceMatrix)); // Add this

  for (let photoAspectRatio in priceMatrix) {
    console.log("photoAspectRatio:", photoAspectRatio); // Add this

    for (let diptychType in priceMatrix[photoAspectRatio]) {
      console.log("diptychType:", diptychType); // Add this

      for (let sizeCategoryId in priceMatrix[photoAspectRatio][diptychType]) {
        console.log("sizeCategoryId:", sizeCategoryId); // Add this

        let price = priceMatrix[photoAspectRatio][diptychType][sizeCategoryId];
        console.log("price:", price); // Add this

        console.log("Creating record for", sizeCategoryId, photoAspectRatio, diptychType);
        await Pricing.create({
            sizeCategoryId: sizeCategoriesMap[sizeCategoryId],
            photoAspectRatio,
            diptychType,
            price,
            currency: 'USD',
            dateEffective: new Date(Date.UTC(2023, 7, 10)) // Note: JavaScript counts months from 0, so August is 7.
        });
      }
    }
  }
  console.log('Pricing table has been populated.');
}

populatePricingTable();