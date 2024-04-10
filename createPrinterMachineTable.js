// my-gallery/createPrinterMachineTable.js
const sequelize = require('./config/database');
const PrinterMachine = require('./models/PrinterMachine');

const createPrinterMachineTable = async () => {
  try {
    await PrinterMachine.sync({ alter: true });
    console.log("PrinterMachine table created or updated!");
  } catch (error) {
    console.log("Unable to create or update PrinterMachine table", error);
  }
};

createPrinterMachineTable();