import express from 'express';
import jwt from 'jsonwebtoken';
import MqttHandler from '../config/mqtt';
import { User } from '../data/entities/user.entity';

declare module 'express' {
    export interface Request {
      user?: jwt.JwtPayload | Auth,
      mqtt?: MqttHandler
    }
}

type ControllerHandler<T = any> = {( req: express.Request, res: express.Response, next: express.NextFunction ): Promise<T>}

export interface IController {
    [x: string]: ControllerHandler
}