import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { errorHandler } from './middleware/errorMiddleware.js';
import baseRouter from './routes/apiRoutes.js';
import connectDB from './config/db.js';

dotenv.config();
const port = process.env.PORT;

connectDB();

const app = express();
const corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token'],
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOption));

app.use('/api', baseRouter);

app.use(errorHandler);

app.listen(port, () =>
    console.log(`Server started on port http://localhost:${port}`)
);
