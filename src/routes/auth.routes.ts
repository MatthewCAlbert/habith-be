import AuthController from '../controllers/auth.controller';
import jwtTokenMiddleware from '../middlewares/jwttoken.middleware';
import validator from '../middlewares/validator.middleware';
import { RouterMap } from '../types/express';
import authSchemas from '../validations/auth.validation';

// Auth Routes /v1/auth
const authRoutes: RouterMap = [
    {
        method: 'get',
        endpoint: '/profile',
        handlers: [
            jwtTokenMiddleware,
            AuthController.profile
        ]
    },
    {
        method: 'post',
        endpoint: '/login',
        handlers: [
            validator(authSchemas.login),
            AuthController.login
        ]
    },
    {
        method: 'post',
        endpoint: '/register',
        handlers: [
            validator(authSchemas.register),
            AuthController.register
        ]
    },
    {
        method: 'post',
        endpoint: '/change-password',
        handlers: [
            validator(authSchemas.changePassword),
            jwtTokenMiddleware,
            AuthController.changePassword
        ]
    },
    {
        method: 'put',
        endpoint: '/profile',
        handlers: [
            validator(authSchemas.updateProfile),
            jwtTokenMiddleware,
            AuthController.updateProfile
        ]
    }
];

export default authRoutes;
