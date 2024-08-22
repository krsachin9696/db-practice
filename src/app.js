import express from 'express';
import { connectDb } from './config/db.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', userRoutes);

const server = async () => {
    try {
        await connectDb();
        app.listen(3000, () => {
            console.log('Server is running on PORT: 3000');
          });
    } catch (error) {
        console.log(error);
    }
}

server();