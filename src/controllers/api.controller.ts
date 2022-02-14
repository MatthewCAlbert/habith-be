import express from 'express';
import { User } from '../data/entities/user.entity';
import ApiError from '../utils/api-error';
import { sendResponse } from '../utils/api';
import httpStatus from 'http-status';

class ApiController{
    static helloWorldHandler(req: express.Request, res: express.Response) {
        return sendResponse(res, {
            message: 'Hello World!'
        })
    }

    static testAuth(req: express.Request, res: express.Response) {
        return sendResponse(res, {
            data: 'Ok'
        })
    }
  
    static async allUser(req: express.Request, res: express.Response, next: express.NextFunction) {
        const result = await User.find();
        return sendResponse(res, {
            data: result
        })
    }

    static clearDb(req: express.Request, res: express.Response, next: express.NextFunction) {
        throw new ApiError(httpStatus.FORBIDDEN, 'feature just not available yet');
    }

}

export default ApiController;