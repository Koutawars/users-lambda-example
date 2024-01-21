import { APIGatewayProxyResultV2 } from "aws-lambda";

export const makeResponse = <T>(statusCode: number, body: T): APIGatewayProxyResultV2 => {
    return {
        statusCode,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    };
}