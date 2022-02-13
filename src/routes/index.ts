import express from 'express';
import apiRouter from './api.routes';
import authRoute from './auth.routes';
import habitRoute from './habit.routes';
import webRouter from './web.routes';

const apiRoutes = [
    {
        path: '',
        version: '1',
        router: apiRouter,
    },
    {
        path: 'auth',
        version: '1',
        router: authRoute,
    },
    {
        path: 'habit',
        version: '1',
        router: habitRoute,
    }
];

const webRoutes = [
    {
        path: '',
        router: webRouter
    }
];

const router = express.Router();

apiRoutes.forEach((route)=>{
    router.use(`/v${route.version}/${route.path}`, route.router);
})

webRoutes.forEach((route)=>{
    router.use(`/${route.path}`, route.router);
})

export default router;