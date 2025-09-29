// Entry point for the backend server
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const farmRoutes = require('./routes/farmRoutes');
const communityRoutes = require('./routes/communityRoutes');
const errorHandler = require('./middlewares/errorHandler');

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/farms', farmRoutes);
app.use('/api/community', communityRoutes);

// Error handler
app.use(errorHandler);

// DB Connection
const connectDB = require('./config/db');
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
