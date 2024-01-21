import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Context } from "aws-lambda";
import { makeResponse } from "../../../utils/makeResponse";

export const getUserAdapter = (event: APIGatewayProxyEventV2, context: Context): APIGatewayProxyResultV2 => {
    console.log("EVENT: \n" + JSON.stringify(event, null, 2));
    console.log("CONTEXT: \n" + JSON.stringify(context, null, 2));
    return makeResponse(200, { message: "Hello World!" });
};