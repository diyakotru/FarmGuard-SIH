// Example farm service
const Farm = require('../models/farmModel');

exports.findFarmByName = async (name) => {
  return await Farm.findOne({ name });
};
