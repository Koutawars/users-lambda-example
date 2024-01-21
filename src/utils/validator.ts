import { MiddlewareObj, Request } from "@middy/core";
import Joi from 'joi';
import { makeResponse } from "./makeResponse";

export const validator = ({schema, options}: { schema: Joi.ObjectSchema, options?: Joi.ValidationOptions }): MiddlewareObj => {
    if (!Joi.isSchema(schema)) {
        console.log(
            'The schema you provided is not a valid Joi schema',
        )
        throw new Error('The schema is not valid');
    }
    const before = async (request: Request) => {
        const { event } = request;
        const { error: validationFailure } = schema.validate(event, options)

        if (validationFailure) {
            return makeResponse(400, {
                error: validationFailure.message
            });
        }
    }
    return {
        before
    }
}