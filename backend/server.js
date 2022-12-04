import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

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

// Serve Frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../frontend/build')));
//     app.get('*', (req, res) =>
//         res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
//     );
// } else {
//     app.get('/', (req, res) => res.send('Please set to production'));
// }

app.listen(port, () =>
    console.log(`Server started on port http://localhost:${port}`)
);
