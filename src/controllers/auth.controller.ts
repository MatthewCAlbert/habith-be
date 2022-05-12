import express from 'express';
import { User } from '../data/entities/user.entity';
import {sendResponse} from '../utils/api';
import { changePasswordService, loginService, registerUserService, updateUserProfileService } from '../services/auth.service';

class AuthController {

    static profile(req: express.Request, res: express.Response) {
        const user: User = req.user as User;
        return sendResponse(res, { message: '', 
            data: {
                user: user.toDomain()
            }
        });
    }

    static login(req: express.Request, res: express.Response, next: express.NextFunction) {
        loginService(req?.body?.username, req?.body?.email, req?.body?.password).then((response)=>{
            sendResponse( res, {
                data: response
            })
        }).catch(next);
    }

    static async changePassword(req: express.Request, res: express.Response, next: express.NextFunction) {
        changePasswordService(req.user as User, req.body).then((response)=>{
            sendResponse( res, {
                data: response
            })
        }).catch(next);
    }

    static async updateProfile(req: express.Request, res: express.Response, next: express.NextFunction) {
        updateUserProfileService(req.user as User, req.body).then((response)=>{
            sendResponse( res, {
                data: response
            })
        }).catch(next);
    }

    static async register(req: express.Request, res: express.Response, next: express.NextFunction) {
        registerUserService(req.body).then((response)=>{
            sendResponse( res, {
                data: response
            })
        }).catch(next);
    }
}

export default AuthController;