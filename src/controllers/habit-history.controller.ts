import { sendResponse } from '../utils/api';
import { IController } from '../types/express';
import HabitHistoryService from '@/services/habit-history.service';
import ApiError from '@/utils/api-error';
import { StatusCodes } from 'http-status-codes';
import HabitService from '@/services/habit.service';
import { User } from '@/data/entities/user.entity';

const checkHabitOwnership = async (user: User, habitId: string) => {
    if ( !(await HabitService.getOneById(user, habitId, false)) ) {
        throw new ApiError(StatusCodes.FORBIDDEN, 'This habit wasn\'t owned by this user');
    }
}

const HabitHistoryController: IController = {

    createOne: async (req, res, next) => {
        const { id } = req.params;
        const { date, value } = req.body;

        if (await HabitHistoryService.isDuplicate(id, date))
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Duplicate Date!');

        const habitHistory = await HabitHistoryService.createOne({ date, habitId: id, value });
        return sendResponse(res, {
            data: habitHistory && habitHistory.toDomain()
        })
    },

    getManyByHabitId: async (req, res, next) => {
        const { id } = req.params;

        const habitHistory = await HabitHistoryService.getManyByHabitId(id);
        return sendResponse(res, {
            data: habitHistory
        })
    },

    getOneById: async (req, res, next) => {
        const { historyId } = req.params;

        const habitHistory = await HabitHistoryService.getOneById(historyId);
        checkHabitOwnership(req.user, habitHistory.habitId);

        return sendResponse(res, {
            data: habitHistory && habitHistory.toDomain()
        })
    },

    updateOne: async (req, res, next) => {
        const { historyId } = req.params;
        const { value } = req.body;

        const habitHistory = await HabitHistoryService.getOneById(historyId);
        checkHabitOwnership(req.user, habitHistory.habitId);
        habitHistory.value = value;

        const updated = await HabitHistoryService.updateOne(habitHistory);
        return sendResponse(res, {
            data: updated
        })
    },

    deleteOne: async (req, res, next) => {
        const { historyId } = req.params;

        const habitHistory = await HabitHistoryService.getOneById(historyId);
        checkHabitOwnership(req.user, habitHistory.habitId);

        const { affected } = await HabitHistoryService.deleteOne(historyId);
        if ( affected && affected > 0 ) 
            return sendResponse(res, {});
        else
            throw new ApiError(StatusCodes.NOT_FOUND);
    }

}

export default HabitHistoryController;