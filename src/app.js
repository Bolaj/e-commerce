const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/product');
const healthRoutes = require('./routes/health');
const authRoutes = require('./routes/auth');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json()); // Replaces body-parser.json()

// Define routes
app.use('/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

module.exports = app;
