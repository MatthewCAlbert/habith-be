import HabitController from '../controllers/habit.controller';
import habitHistorySchemas from '../validations/habit-history.validation';
import habitSchemas from '../validations/habit.validation';
import AuthController from '../controllers/auth.controller';
import jwtTokenMiddleware from '../middlewares/jwttoken.middleware';
import validator from '../middlewares/validator.middleware';
import { RouterMap } from '../types/express';

// Habit Routes /v1/habit
const habitRoutes: RouterMap = [
    {
        method: 'post',
        endpoint: '/',
        handlers: [
            validator(habitSchemas.createOne),
            jwtTokenMiddleware, 
            HabitController.createOne
        ]
    },
    {
        method: 'get',
        endpoint: '/',
        handlers: [
            validator(habitSchemas.getOneById),
            jwtTokenMiddleware, 
            AuthController.profile
        ]
    },
    {
        method: 'put',
        endpoint: '/:id',
        handlers: [
            validator(habitSchemas.updateOneById),
            jwtTokenMiddleware, 
            AuthController.profile
        ]
    },
    {
        method: 'delete',
        endpoint: '/:id',
        handlers: [
            validator(habitSchemas.deleteOneById),
            jwtTokenMiddleware, 
            AuthController.profile
        ]
    },
    {
        method: 'post',
        endpoint: '/:id/history',
        handlers: [
            validator(habitHistorySchemas.createOne),
            jwtTokenMiddleware, 
            AuthController.profile
        ]
    },
    {
        method: 'get',
        endpoint: '/history/:id',
        handlers: [
            validator(habitHistorySchemas.getOneById),
            jwtTokenMiddleware, 
            AuthController.profile
        ]
    },
    {
        method: 'delete',
        endpoint: '/history/:id',
        handlers: [
            validator(habitHistorySchemas.deleteOneById),
            jwtTokenMiddleware, 
            AuthController.profile
        ]
    },
    {
        method: 'put',
        endpoint: '/history/:id',
        handlers: [
            validator(habitHistorySchemas.updateOneById),
            jwtTokenMiddleware, 
            AuthController.profile
        ]
    },
];

export default habitRoutes;
