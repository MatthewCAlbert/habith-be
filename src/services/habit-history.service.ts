import { HabitHistory, IHabitHistory } from '@/data/entities/habit-history.entity';
import ApiError from '@/utils/api-error';
import { datetimeToDateOnly } from '@/utils/common';
import { StatusCodes } from 'http-status-codes';

const HabitHistoryService = {

    createOne: async (body: IHabitHistory)=>{
        const newHabitHistory = HabitHistory.create({...body, date: datetimeToDateOnly(body.date) });
        await newHabitHistory.save();
        return newHabitHistory;
    },

    isDuplicate: async (habitId: string, date: Date)=>{
        try {
            await HabitHistory.findOneOrFail({
                where: { habitId, date: datetimeToDateOnly(date) }
            });
            return true;
        } catch (error) {
            return false;   
        }
    },

    getOneById: async (id: string)=>{
        const habitHistory = await HabitHistory.findOne({
            where: { id }
        });
        if (!habitHistory) {
            throw new ApiError(StatusCodes.NOT_FOUND);
        }
        return habitHistory;
    },

    getManyByHabitId: async (habitId: string)=>{
        const habitHistory = await HabitHistory.find({
            where: { habitId }
        });
        return habitHistory && habitHistory?.map( e => e.toDomain() );
    },

    updateOne: async (habitHistory: HabitHistory)=>{
        const updatedHabitHistory = await habitHistory.save();
        return updatedHabitHistory && updatedHabitHistory.toDomain();
    },

    deleteOne: async (id: string)=>{
        return HabitHistory.delete({ id });
    },

}

export default HabitHistoryService;