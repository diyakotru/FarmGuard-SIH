const User = require('../models/userModel');
const Farm = require('../models/farmModel');
const bcrypt = require('bcryptjs'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For creating tokens

const registerNewUserAndFarm = async (userData) => {
  const { fullName, email, password, phoneNumber, farmName, farmType, location } = userData;

  // 1. Check if a user with this email already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User with this email already exists.');
  }

  // 2. Hash the password for security
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 3. Create the new User
  const newUser = new User({
    fullName,
    email,
    password: hashedPassword,
    phoneNumber,
  });
  const savedUser = await newUser.save();

  // 4. Create the new Farm and link it to the new user
  const newFarm = new Farm({
    farmName,
    farmType,
    location,
    owner: savedUser._id, // Linking the farm to the user's ID
  });
  const savedFarm = await newFarm.save();

  // 5. Create a JWT token for the user to be logged in automatically
  const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // 6. Return all the created data
  return { user: savedUser, farm: savedFarm, token };
};

const loginUser = async (email, password) => {
  // 1. Find the user by their email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials. User not found.');
  }

  // 2. Compare the provided password with the hashed password in the database
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials. Password does not match.');
  }

  // 3. If passwords match, create a JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // 4. Return the user and the token
  return { user, token };
};

module.exports = {
  registerNewUserAndFarm,
  loginUser, // Export the new function
};

