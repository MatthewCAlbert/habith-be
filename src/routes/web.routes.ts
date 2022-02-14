import { RouterMap } from '../types/express';
import { sendResponse } from '../utils/api';

const webRoutes: RouterMap = [
    {
        method: 'get',
        endpoint: '/',
        handlers: [
            (req, res) => {
                sendResponse(res, {
                    message: 'Hello World'
                })
            }
        ]
    },
    {
        method: 'get',
        endpoint: '/readiness',
        handlers: [
            (req, res) => {
                sendResponse(res, {
                    message: 'Ready',
                    data: {
                        version: process.env.npm_package_version
                    }
                })
            }
        ]
    },
    {
        method: 'get',
        endpoint: '/liveness',
        handlers: [
            (req, res) => {
                sendResponse(res, {
                    message: 'Alive',
                    data: {
                        version: process.env.npm_package_version
                    }
                })
            }
        ]
    }
];

export default webRoutes;
