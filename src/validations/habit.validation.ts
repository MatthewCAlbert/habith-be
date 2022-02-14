import Joi from 'joi';
import { Day, HabitTargetType } from '../data/entities/habit.entity';

const habitSchemas = {

    createOne: {
        body: Joi.object({
            title: Joi.string().required(),
            category: Joi.string().default(''),
            description: Joi.string().default(''),
            target_type: Joi.string().valid(...Object.values(HabitTargetType)).required(),
            target: Joi.number().integer().when('target_type', {
                is: Joi.not('none'),
                then: Joi.required(),
                otherwise: Joi.optional().default(0)
            }),
            start: Joi.date().default(null).allow(null),
            end: Joi.date().default(null).allow(null),
            repeat_every_day: Joi.number().integer(),
            repeat_on: Joi.array().items(...Object.values(Day)).min(1)
        }).xor('repeat_every_day', 'repeat_on')
    },

    getMany: {
        params: Joi.object({
            withHistory: Joi.boolean().default(false)
        })
    },

    getOneById: {
        params: Joi.object({
            id: Joi.string().uuid().required()
        }),
        query: Joi.object({
            withHistory: Joi.boolean().default(true)
        })
    },

    updateOneById: {
        params: Joi.object({
            id: Joi.string().uuid().required()
        }),
        body: Joi.object({
            id: Joi.string().uuid().optional(),
            userId: Joi.string().uuid().optional(),
            title: Joi.string().required(),
            category: Joi.string().default(''),
            description: Joi.string().default(''),
            target_type: Joi.string().valid(...Object.values(HabitTargetType)).required(),
            target: Joi.number().integer().when('target_type', {
                is: Joi.not('none'),
                then: Joi.required(),
                otherwise: Joi.optional().default(0)
            }),
            start: Joi.date().default(null).allow(null),
            end: Joi.date().default(null).allow(null),
            repeat_every_day: Joi.number().integer(),
            repeat_on: Joi.array().items(...Object.values(Day)).min(1)
        }).xor('repeat_every_day', 'repeat_on')
    },

    deleteOneById: {
        params: Joi.object({
            id: Joi.string().uuid().required()
        })
    },

};

export default habitSchemas;