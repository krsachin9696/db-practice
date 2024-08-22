import express from 'express';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
