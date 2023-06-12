// populateSizeCategories.js
const SizeCategories = require('./models/SizeCategories');

const sizes = ['S', 'M', 'L', 'XL'];

const populateSizeCategories = async () => {
  for (const size of sizes) {
    try {
      const sizeCategory = await SizeCategories.create({ sizeLabel: size });
      console.log(`Created size category: ${sizeCategory.sizeLabel}`);
    } catch (err) {
      console.error(`Failed to create size category: ${err.message}`);
    }
  }
};

populateSizeCategories();
