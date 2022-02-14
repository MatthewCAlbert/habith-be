import { Habit, IHabit } from '@/data/entities/habit.entity';
import ApiError from '@/utils/api-error';
import { StatusCodes } from 'http-status-codes';
import { User } from '../data/entities/user.entity';

const HabitService = {

    createOne: async (user: User, body: IHabit)=>{
        const newHabit = Habit.create({...body, userId: user.id});
        await newHabit.save();
        return newHabit && newHabit.toDomain();
    },

    getOneById: async (user: User, id: string, withHistory: boolean)=>{
        const habit = await Habit.findOne({
            where: { userId: user.id, id },
            relations: withHistory ? [ 'history' ] : []
        });
        if (!habit) {
            throw new ApiError(StatusCodes.NOT_FOUND);
        }
        return habit;
    },

    getManyByUserId: async (userId: string, withHistory: boolean)=>{
        const habits = await Habit.find({
            where: { userId },
            relations: withHistory ? [ 'history' ] : []
        });
        return habits && habits.map( habit => habit.toDomain() );
    },

    updateOne: async (habit: Habit)=>{
        const updatedHabit = await habit.save();
        return updatedHabit && updatedHabit.toDomain();
    },

    deleteOne: async (user: User, id: string)=>{
        return Habit.delete({ userId: user.id, id });
    },

}

export default HabitService;