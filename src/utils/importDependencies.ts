import { MiddlewareObj, Request } from "@middy/core";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export const importDependencies = (dependencies?: any) => (options?: any): MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult, Error, Context, {}> => {
    const before = async (request: Request) => {
        request.context = {
            ...request.context,
            ...options,
            dependencies
        };
    };
    return {
        before
    }
};