import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { errorHandler } from './backend/middleware/errorMiddleware.js';
import baseRouter from './backend/routes/apiRoutes.js';
import connectDB from './backend/config/db.js';

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
app.use(express.static(path.join(__dirname, './frontend/build')));
app.get('*', function (_, res) {
    res.sendFile(
        path.join(__dirname, './frontend/build/index.html'),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});

app.listen(port, () =>
    console.log(`Server started on port http://localhost:${port}`)
);

export default app;
