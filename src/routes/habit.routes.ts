import HabitController from '../controllers/habit.controller';
import habitHistorySchemas from '../validations/habit-history.validation';
import habitSchemas from '../validations/habit.validation';
import jwtTokenMiddleware from '../middlewares/jwttoken.middleware';
import validator from '../middlewares/validator.middleware';
import { RouterMap } from '../types/express';
import HabitHistoryController from '@/controllers/habit-history.controller';

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
            jwtTokenMiddleware, 
            HabitController.getManyByUserId
        ]
    },
    {
        method: 'get',
        endpoint: '/:id',
        handlers: [
            validator(habitSchemas.getOneById),
            jwtTokenMiddleware, 
            HabitController.getOne
        ]
    },
    {
        method: 'put',
        endpoint: '/:id',
        handlers: [
            validator(habitSchemas.updateOneById),
            jwtTokenMiddleware, 
            HabitController.updateOne
        ]
    },
    {
        method: 'delete',
        endpoint: '/:id',
        handlers: [
            validator(habitSchemas.deleteOneById),
            jwtTokenMiddleware, 
            HabitController.deleteOne
        ]
    },
    {
        method: 'post',
        endpoint: '/:id/history',
        handlers: [
            validator(habitHistorySchemas.createOne),
            jwtTokenMiddleware,
            HabitController.checkHabitOwnership,
            HabitHistoryController.createOne
        ]
    },
    {
        method: 'get',
        endpoint: '/:id/history',
        handlers: [
            validator(habitHistorySchemas.getManyByHabitId),
            jwtTokenMiddleware,
            HabitController.checkHabitOwnership,
            HabitHistoryController.getManyByHabitId
        ]
    },
    {
        method: 'get',
        endpoint: '/history/:historyId',
        handlers: [
            validator(habitHistorySchemas.getOneById),
            jwtTokenMiddleware,
            HabitHistoryController.getOneById
        ]
    },
    {
        method: 'delete',
        endpoint: '/history/:historyId',
        handlers: [
            validator(habitHistorySchemas.deleteOneById),
            jwtTokenMiddleware,
            HabitHistoryController.deleteOne
        ]
    },
    {
        method: 'put',
        endpoint: '/history/:historyId',
        handlers: [
            validator(habitHistorySchemas.updateOneById),
            jwtTokenMiddleware,
            HabitHistoryController.updateOne
        ]
    },
];

export default habitRoutes;
