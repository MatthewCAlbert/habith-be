import Joi from 'joi';

const habitHistorySchemas = {

    createOne: {
        params: Joi.object({
            id: Joi.string().uuid().required()
        }),
        body: Joi.object({
            date: Joi.date().required(),
            value: Joi.number().required()
        })
    },

    getManyByHabitId: {
        params: Joi.object({
            id: Joi.string().uuid().required()
        })
    },

    getOneById: {
        params: Joi.object({
            historyId: Joi.string().uuid().required()
        })
    },

    updateOneById: {
        params: Joi.object({
            historyId: Joi.string().uuid().required()
        }),
        body: Joi.object({
            value: Joi.number().required()
        })
    },

    deleteOneById: {
        params: Joi.object({
            historyId: Joi.string().uuid().required()
        })
    },

};

export default habitHistorySchemas;