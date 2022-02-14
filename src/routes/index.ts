import express, { Router } from 'express';
import AdapterWrapperService from '../services/adapter-wrapper.service';
import { RouterMap } from '../types/express';
import apiRoutes from './api.routes';
import authRoutes from './auth.routes';
import habitRoutes from './habit.routes';
import webRoutes from './web.routes';

const wrapRoutesMap = (routes: RouterMap) => {
    const router = Router();
    routes.forEach( route => {
        const handlers = route.handlers.map( handler => (
            AdapterWrapperService.wrapHttpHandler(handler)
        ))
        router?.[route.method](route.endpoint, ...handlers);
    });
    return router;
}

const endpoints = [
    {
        path: '',
        version: '1',
        routes: apiRoutes,
    },
    {
        path: 'auth',
        version: '1',
        routes: authRoutes,
    },
    {
        path: 'habit',
        version: '1',
        routes: habitRoutes,
    }
];

const router = express.Router();

endpoints.forEach((route)=>{
    router.use(`/v${route.version}/${route.path}`, wrapRoutesMap(route.routes));
})

router.use('/', wrapRoutesMap(webRoutes));

export default router;