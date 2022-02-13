import express from 'express';
import HabitController from '../controllers/habit.controller';
import habitHistorySchemas from '../validations/habit-history.validation';
import habitSchemas from '../validations/habit.validation';
import AuthController from '../controllers/auth.controller';
import jwtTokenMiddleware from '../middlewares/jwttoken.middleware';
import validator from '../middlewares/validator.middleware';

// Habit Routes /v1/habit
const habitRoute = express.Router();

habitRoute.post(
    '/',
    validator(habitSchemas.createOne),
    jwtTokenMiddleware, 
    HabitController.createOne
);

habitRoute.get(
    '/', 
    validator(habitSchemas.getOneById),
    jwtTokenMiddleware, 
    AuthController.profile
);

habitRoute.put(
    '/:id', 
    validator(habitSchemas.updateOneById),
    jwtTokenMiddleware, 
    AuthController.profile
);

habitRoute.delete(
    '/:id', 
    validator(habitSchemas.deleteOneById),
    jwtTokenMiddleware, 
    AuthController.profile
);

habitRoute.post(
    '/:id/history', 
    validator(habitHistorySchemas.createOne),
    jwtTokenMiddleware, 
    AuthController.profile
);

habitRoute.get(
    '/history/:id', 
    validator(habitHistorySchemas.getOneById),
    jwtTokenMiddleware, 
    AuthController.profile
);

habitRoute.delete(
    '/history/:id', 
    validator(habitHistorySchemas.deleteOneById),
    jwtTokenMiddleware, 
    AuthController.profile
);

habitRoute.put(
    '/history/:id', 
    validator(habitHistorySchemas.updateOneById),
    jwtTokenMiddleware, 
    AuthController.profile
);

export default habitRoute;
