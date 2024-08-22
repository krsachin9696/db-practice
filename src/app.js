import express from 'express';
import connectDb from './db.js';

const app = express();

connectDb();

app.listen(3000, () => {
    console.log(`Server is running on PORT: 3000`);
})