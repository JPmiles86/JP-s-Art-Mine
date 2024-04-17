'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Update the sizeInInches column
    await queryInterface.sequelize.query(
      `UPDATE "PrintSizes" SET "sizeInInches" = REPLACE("sizeInInches", 'x', ' x ')`
    );

    // Update the sizeInCm column
    await queryInterface.sequelize.query(
      `UPDATE "PrintSizes" SET "sizeInCm" = REPLACE("sizeInCm", 'x', ' x ')`
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the changes
    await queryInterface.sequelize.query(
      `UPDATE "PrintSizes" SET "sizeInInches" = REPLACE("sizeInInches", ' x ', 'x')`
    );

    await queryInterface.sequelize.query(
      `UPDATE "PrintSizes" SET "sizeInCm" = REPLACE("sizeInCm", ' x ', 'x')`
    );
  }
};