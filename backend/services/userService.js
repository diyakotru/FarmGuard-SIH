// Example user service
const User = require('../models/userModel');

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};
