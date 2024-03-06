// my-gallery/migrations/20240226164554-add-sizeName-to-SizeCategories.js

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // Step 1: Add the sizeName column
    await queryInterface.addColumn('SizeCategories', 'sizeName', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // Step 2: Populate the sizeName column
    const sizes = [
      { sizeLabel: 'S', sizeName: 'Small' },
      { sizeLabel: 'M', sizeName: 'Medium' },
      { sizeLabel: 'L', sizeName: 'Large' },
      { sizeLabel: 'XL', sizeName: 'X-Large' },
    ];

    for (const size of sizes) {
      await queryInterface.sequelize.query(
        `UPDATE "SizeCategories" SET "sizeName" = :sizeName WHERE "sizeLabel" = :sizeLabel`,
        {
          replacements: { sizeName: size.sizeName, sizeLabel: size.sizeLabel },
          type: Sequelize.QueryTypes.UPDATE,
        }
      );
    }
  },

  async down (queryInterface, Sequelize) {
    // Step 1: Remove the sizeName column
    await queryInterface.removeColumn('SizeCategories', 'sizeName');
  }
};
