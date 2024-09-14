import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api';
import connectDatabases from './database';

const app = express();
const port = process.env.PORT || 4444;

// Middleware
app.use(cors());
app.use(express.json());

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