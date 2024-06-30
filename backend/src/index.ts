// index.ts
import express from 'express';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import projectsRoute from './routes/projects';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Static files serving middleware
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Simple route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Use projects routes for /projects
app.use('/projects', projectsRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
