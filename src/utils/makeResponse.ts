import { APIGatewayProxyResultV2 } from "aws-lambda";

export const makeResponse = (statusCode: number, body: any): APIGatewayProxyResultV2 => {
    return {
        statusCode,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    };
}