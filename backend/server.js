import express from 'express';
import dotenv from 'dotenv';
import restaurantRouter from './routes/restaurantRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

dotenv.config();
const port = process.env.PORT;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/restaurants', restaurantRouter);

app.use(errorHandler);

app.listen(port, () =>
    console.log(`Server started on port http://localhost:${port}`)
);
