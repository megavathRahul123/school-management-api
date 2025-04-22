import express from 'express';
import dotenv from 'dotenv';
import schoolRoutes from './routes/schoolroutes.js';
import { db } from './config/database.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use the routes for school-related APIs
app.use('/api', schoolRoutes);

// Optional root route
app.get('/', (req, res) => {
    res.send('School Management API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
