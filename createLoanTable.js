// my-gallery/createLoanTable.js
const sequelize = require('./config/database');
const Loan = require('./models/Loan');

const createLoanTable = async () => {
  try {
    await Loan.sync({ alter: true });
    console.log("Loan table created or updated!");
  } catch (error) {
    console.log("Unable to create or update Loan table", error);
  }
};

createLoanTable();