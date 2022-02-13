import express from 'express';
import { sendResponse } from '../utils/api';

const webRouter = express.Router();

webRouter.get('/', (req, res) => {
    sendResponse(res, {
        message: 'Hello World'
    })
});

webRouter.get('/readiness', (req, res) => {
    sendResponse(res, {
        message: 'Ready',
        data: {
            version: process.env.npm_package_version
        }
    })
});

webRouter.get('/liveness', (req, res) => {
    sendResponse(res, {
        message: 'Alive',
        data: {
            version: process.env.npm_package_version
        }
    })
});

export default webRouter;
