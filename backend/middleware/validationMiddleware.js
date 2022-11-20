import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import responseFormat from '../utils/responseFormat.js';

const schemas = {
    createPost: Joi.object({
        user: Joi.string().required(),
        title: Joi.string().required(),
        compliment: Joi.string().required(),
        need_improve: Joi.string().required(),
        ratings: {
            space: Joi.number().required(),
            food: Joi.number().required(),
            hygiene: Joi.number().required(),
            service: Joi.number().required(),
            price: Joi.number().required(),
            average: Joi.number().required(),
        },
        is_recommend: Joi.boolean().required(),
        total: {
            people: Joi.number().required(),
            bill: Joi.number().required(),
        },
        images: Joi.array().items(Joi.string().required()),
        hashtags: Joi.array().items(Joi.string().required()),
    }),
};

const validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body, { allowUnknown: true });
            next();
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json(
                responseFormat(false, { message: error.message })
            );
        }
    };
};

export { validate, schemas };
