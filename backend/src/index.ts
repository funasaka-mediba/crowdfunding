// index.ts
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import projectsRoute from './routes/projects';
import returnsRoutes from './routes/returns';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost/crowdfunding', {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Simple route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Use projects routes for /projects
app.use('/projects', projectsRoute);

// return routes
app.use('/api/returns', returnsRoutes)

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
