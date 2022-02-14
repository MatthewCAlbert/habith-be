'use strict';

import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { corsOptions } from './config/cors';
import router from './routes';
import ApiError from './utils/api-error';
import { errorConverter, errorHandler } from './middlewares/error-handler.middleware';
import config from './config/config';
import path from 'path';
import chalk from 'chalk';
import { StatusCodes } from 'http-status-codes';
import helmet from 'helmet';

// console.log(chalk.yellowBright(`[DEBUG]: ${__dirname}`))

const app = express();

// Setup
app.set('port', (
    config.env !== 'testing' ? config.port.normal : config.port.test) 
    || 5000
);
app.set('env', config.env);

// Middleware
app.use(compression())
app.use(helmet())
app.use(cors(corsOptions(config.corsWhitelist)))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Handle Preflight
// app.options("*", cors());
app.options('*', (req, res)=>{
    res.status(200).json({});
});

// Define Routes
app.use('/', router);

// Attach public folder
app.use(express.static(path.join(__dirname, 'public')));

// Allow reverse proxy
app.set('trust proxy', true);

// Handle Not Found
app.use((req, res, next) => {
    next(new ApiError(StatusCodes.NOT_FOUND));
});

// Handle Stack Trace
app.use(errorConverter);
app.use(errorHandler);

export default app;