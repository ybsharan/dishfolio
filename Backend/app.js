import express from 'express';
import { config } from 'dotenv';
import userRouter from './routes/user.js';
import cookieParser from 'cookie-parser';
import {errorMiddleware} from './middlewares/error.js';

export const app = express();

config({
  path: './data/config.env',
});

// Using Middleware
app.use(express.json());
app.use(cookieParser());

// Using routes
app.use('/api/v1/users', userRouter);

app.get('/', (req, res) => {
  res.send('Nice Working');
});

//using error handler
app.use(errorMiddleware);
