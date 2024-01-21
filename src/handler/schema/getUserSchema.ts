import Joi from 'joi';

const schema = Joi.object({
    pathParameters: Joi.object({
        id: Joi.string().required()
    }).required()
}).options({ allowUnknown: true });

export const getUserSchema = {
    schema
}