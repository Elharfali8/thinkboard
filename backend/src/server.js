import dotenv from 'dotenv';

import express from 'express';
import cors from 'cors';

import notesRoutes from './routes/notesRoutes.js'
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors(
    {origin: 'http://localhost:5173'}
))
app.use(express.json()); // Middleware to parse JSON bodies
app.use(rateLimiter)



app.use('/api/notes', notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});



