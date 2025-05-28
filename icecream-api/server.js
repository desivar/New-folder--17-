// icecream-api/server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./docs/swagger_output.json'); // Path to the generated Swagger JSON

// Load env vars
dotenv.config({ path: './.env' });

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Import routes
const iceCreamRoutes = require('./routes/iceCreamRoutes');
const flavorRoutes = require('./routes/flavorRoutes');

// Mount routers
app.use('/api/v1/icecreams', iceCreamRoutes);
app.use('/api/v1/flavors', flavorRoutes);

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set in .env

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});