import { sendResponse } from '../utils/api';
import { IController } from '../types/express';
import HabitService from '../services/habit.service';
import { IHabit } from '../data/entities/habit.entity';
import ApiError from '../utils/api-error';
import { StatusCodes } from 'http-status-codes';

const HabitController: IController = {

    checkHabitOwnership: async (req, res, next) => {
        const { habitId } = req.body;
        const { id, habitId: habitIdParam } = req.params;

        if ( !(await HabitService.getOneById(req.user, habitId || id || habitIdParam || '', false)) ) {
            throw new ApiError(StatusCodes.FORBIDDEN, 'This habit wasn\'t owned by this user');
        }
        
        next();
    },

    createOne: async (req, res, next) => {
        const habit = await HabitService.createOne(req.user, req.body);
        return sendResponse(res, {
            data: habit
        })
    },

    getManyByUserId: async (req, res, next) => {
        const { withHistory } = req.query;
        const habits = await HabitService.getManyByUserId(req.user?.id, Boolean(withHistory));
        return sendResponse(res, {
            data: habits
        })
    },

    getOne: async (req, res, next) => {
        const { id } = req.params;
        const { withHistory } = req.query;
        const habit = await HabitService.getOneById(req.user, id, Boolean(withHistory));
        return sendResponse(res, {
            data: habit && habit.toDomain()
        })
    },

    updateOne: async (req, res, next) => {
        const { id } = req.params;
        const { 
            title,
            category,
            description,
            target,
            target_type,
            start,
            end,
            repeat_every_day,
            repeat_on 
        }: IHabit = req.body;
        const habit: any = await HabitService.getOneById(req.user, id, false);
        
        const update: any = { title, category, description, target, target_type, start, end, repeat_every_day, repeat_on };

        for (const key of Object.keys(update)) {
            habit[key] = update[key];
        }

        const updated = await HabitService.updateOne(habit);
        return sendResponse(res, {
            data: updated
        })
    },

    deleteOne: async (req, res, next) => {
        const { id } = req.params;
        const { affected } = await HabitService.deleteOne(req.user, id);
        if ( affected && affected > 0 ) 
            return sendResponse(res, {});
        else
            throw new ApiError(StatusCodes.NOT_FOUND);
    }

}

export default HabitController;