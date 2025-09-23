const userService = require('../services/userService');

const registerUser = async (req, res) => {
  try {
    // req.body will contain all the data from your sign-up form
    const userData = req.body;
    
    // We pass the data to the service layer, which contains the main logic
    const { user, farm, token } = await userService.registerNewUserAndFarm(userData);

    // If successful, send back the new user, farm, and a token
    res.status(201).json({
      message: 'User registered successfully!',
      user,
      farm,
      token
    });
  } catch (error) {
    // If anything goes wrong, send back an error message
    res.status(400).json({ message: error.message });
  }
};
const loginUser = async (req, res) => {
  try {
    // The request body will have the user's email and password
    const { email, password } = req.body;

    // Pass the credentials to the service layer
    const { user, token } = await userService.loginUser(email, password);

    // If successful, send back the user details and the token
    res.status(200).json({
      message: 'Login successful!',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    // If anything goes wrong, send back an error message
    res.status(401).json({ message: error.message }); // 401 means "Unauthorized"
  }
};
module.exports = {
  registerUser,
  loginUser
};