import express from 'express';
import AuthController from '../controllers/auth.controller';
import jwtTokenMiddleware from '../middlewares/jwttoken.middleware';
import validator from '../middlewares/validator.middleware';
import authSchemas from '../validations/auth.validation';

// Auth Routes /v1/auth
const authRoute = express.Router();

authRoute.get('/profile', jwtTokenMiddleware, AuthController.profile);
authRoute.post('/login', validator(authSchemas.login), AuthController.login);
authRoute.post('/register', validator(authSchemas.register), AuthController.register);
authRoute.post('/change-password', validator(authSchemas.changePassword), jwtTokenMiddleware, AuthController.changePassword);
authRoute.put('/profile', validator(authSchemas.updateProfile), jwtTokenMiddleware, AuthController.updateProfile);

export default authRoute;
