import Joi from 'joi';
import { Day, HabitTargetType } from '../data/entities/habit.entity';

const habitSchemas = {

    createOne: {
        body: Joi.object({
            title: Joi.string().required(),
            category: Joi.string().default(''),
            description: Joi.string().default(''),
            target_type: Joi.string().valid(HabitTargetType).required(),
            target: Joi.number().integer().when('target_type', {
                is: Joi.not('none'),
                then: Joi.required(),
                otherwise: Joi.optional().default(0)
            }),
            start: Joi.date().default(null),
            end: Joi.date().default(null),
            repeat_every_day: Joi.number().integer(),
            repeat_on: Joi.array().items(Day)
        }).xor('repeat_every_day', 'repeat_on')
    },

    getMany: {
        params: Joi.object({
            withHistory: Joi.boolean().default(false)
        })
    },

    getOneById: {
        query: Joi.object({
            id: Joi.string().uuid().required()
        }),
        params: Joi.object({
            withHistory: Joi.boolean().default(true)
        })
    },

    updateOneById: {
        query: Joi.object({
            id: Joi.string().uuid().required()
        }),
        body: Joi.object({
            title: Joi.string().optional(),
            category: Joi.string().optional(),
            description: Joi.string().optional(),
            target_type: Joi.string().valid(HabitTargetType).required(),
            target: Joi.number().integer().when('target_type', {
                is: Joi.not('none'),
                then: Joi.required(),
                otherwise: Joi.optional().default(0)
            }),
            start: Joi.date().optional(),
            end: Joi.date().optional(),
            repeat_every_day: Joi.number().integer(),
            repeat_on: Joi.array().items(Day)
        }).xor('repeat_every_day', 'repeat_on')
    },

    deleteOneById: {
        query: Joi.object({
            id: Joi.string().uuid().required()
        })
    },

};

export default habitSchemas;