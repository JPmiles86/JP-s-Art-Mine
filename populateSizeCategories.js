// my-gallery/populateSizeCategories.js

const SizeCategories = require('./models/SizeCategories');

const sizes = {
  'S': 'Small',
  'M': 'Medium',
  'L': 'Large',
  'XL': 'X-Large'
};

const populateSizeCategories = async () => {
  for (const [sizeLabel, sizeName] of Object.entries(sizes)) {
    try {
      const sizeCategory = await SizeCategories.create({ sizeLabel, sizeName });
      console.log(`Created size category: ${sizeCategory.sizeLabel} - ${sizeCategory.sizeName}`);
    } catch (err) {
      console.error(`Failed to create size category: ${err.message}`);
    }
  }
};

populateSizeCategories();
