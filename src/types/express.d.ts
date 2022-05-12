import express, { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../data/entities/user.entity';

declare module 'express' {
    export interface Request {
      user?: jwt.JwtPayload | User
    }
}

type ControllerHandler<T = any> = {( req: express.Request, res: express.Response, next: express.NextFunction ): Promise<T>}

export interface IController {
    [x: string]: ControllerHandler
}

export type RouterMap = {
    method: 'get' | 'post' | 'put' | 'patch' | 'delete';
    endpoint: string;
    handlers: RequestHandler[]
}[]