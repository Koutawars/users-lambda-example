import Joi from "joi";

describe('validator.test', () => {
    const schema = Joi.object({
        pathParameters: Joi.object({
            id: Joi.string().required()
        }).required()
    }).options({ allowUnknown: true });
    it('should validate', async () => {
        const event = {
            pathParameters: {
                id: "1"
            }
        };
        const { error } = schema.validate(event);
        expect(error).toBeUndefined();
    });
    it('should not validate', async () => {
        const event = {
            pathParameters: {
                id: 1
            }
        };
        const { error } = schema.validate(event);
        expect(error).toBeDefined();
    });
    it('should not validate (dont have id)', async () => {
        const event = {
            pathParameters: {
                name: "1"
            }
        };
        const { error } = schema.validate(event);
        expect(error).toBeDefined();
    });
});