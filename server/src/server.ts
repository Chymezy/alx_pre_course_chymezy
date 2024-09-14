import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api';
import connectDatabases from './database';

const app = express();
const port = process.env.PORT || 4444;

const allowedOrigins = ['https://login-1d5ca.web.app', 'http://localhost:3000', 'http://localhost:5000'];

// CORS configuration
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Middleware
app.use(express.json());

// Handle preflight requests
app.options('*', (req, res) => {
  res.sendStatus(200);
});

// Routes
app.use('/api', apiRoutes);

// Connect to databases and start server
const startServer = async () => {
  try {
    const { mongoConnected, firebaseDB } = await connectDatabases();
    
    if (mongoConnected) {
      console.log('Connected to MongoDB');
    } else {
      console.log('Using Firebase as fallback');
    }

    // You might want to store firebaseDB in app.locals or pass it to your routes if needed
    app.locals.firebaseDB = firebaseDB;

    // Start server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to databases:', error);
    process.exit(1);
  }
};

startServer();

export default app;