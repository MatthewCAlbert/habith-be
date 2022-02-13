import Joi from 'joi';

const habitHistorySchemas = {

    createOne: {
        body: Joi.object({
            date: Joi.date().required(),
            habitId: Joi.string().uuid().required(),
            value: Joi.number().required()
        })
    },

    getOneById: {
        query: Joi.object({
            id: Joi.string().uuid().required()
        })
    },

    updateOneById: {
        query: Joi.object({
            id: Joi.string().uuid().required()
        }),
        body: Joi.object({
            value: Joi.number().required()
        })
    },

    deleteOneById: {
        query: Joi.object({
            id: Joi.string().uuid().required()
        })
    },

};

export default habitHistorySchemas;