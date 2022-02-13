import jwt from 'jsonwebtoken';
import express from 'express';
import ApiError from '../utils/api-error';
import httpStatus from 'http-status';
import { User } from '../data/entities/user.entity';
import config from '../config/config';

const jwtTokenMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if(!req.headers.authorization)
        return next(new ApiError(httpStatus.UNAUTHORIZED,'Token missing'));
    if(!req.headers.authorization.startsWith('Bearer'))
        return next(new ApiError(httpStatus.BAD_REQUEST,'Token malformed'));
  
    const authHeader = req.headers['authorization'];
    const token: string|undefined = authHeader && authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(String(token), config.jwt.secret);
        const fetchedUser = await User.findOne({id: String(payload?.sub)});

        if( fetchedUser ){
            req.user = fetchedUser;
            next();
        }else{
            throw new ApiError(httpStatus.UNAUTHORIZED,'User not found')
        }
    } catch (error: any) {
        if (error?.message === 'jwt malformed') 
            return next(new ApiError(httpStatus.BAD_REQUEST, error?.message));
        next(error);
    }
};

export default jwtTokenMiddleware;
