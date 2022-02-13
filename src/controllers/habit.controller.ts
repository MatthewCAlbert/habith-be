import { User } from '../data/entities/user.entity';
import ApiError from '../utils/api-error';
import { sendResponse } from '../utils/api';
import httpStatus from 'http-status';
import { IController } from '../types/express';

const HabitController: IController = {

    createOne: async (req, res, next) => {
        try {
            const result = await User.find();
            return sendResponse(res, {
                data: result
            })
        } catch (error) {
            next(new ApiError(404, 'no user found'))
        }
    },

    getManyByUserId: async (req, res, next) => {
        try {
            const result = await User.find();
            return sendResponse(res, {
                data: result
            })
        } catch (error) {
            next(new ApiError(404, 'no user found'))
        }
    },

    getOne: async (req, res, next) => {
        try {
            const result = await User.find();
            return sendResponse(res, {
                data: result
            })
        } catch (error) {
            next(new ApiError(404, 'no user found'))
        }
    }

}

export default HabitController;