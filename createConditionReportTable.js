// my-gallery/createConditionReportTable.js
const sequelize = require('./config/database');
const ConditionReport = require('./models/ConditionReport');

const createConditionReportTable = async () => {
  try {
    await ConditionReport.sync({ alter: true });
    console.log("ConditionReport table created or updated!");
  } catch (error) {
    console.log("Unable to create or update ConditionReport table", error);
  }
};

createConditionReportTable();