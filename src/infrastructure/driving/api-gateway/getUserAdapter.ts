import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Context } from "aws-lambda";
import { makeResponse } from "../../../utils/makeResponse";
import { User } from "../../../domain/models/User";
import { getUser, getUserDependencies } from "../../../cases/getUser";

export const getUserAdapter = (dependencies: getUserDependencies) => async (event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyResultV2> => {
    try {
        const input = { id: event.pathParameters!.id! };
        const user = await getUser(dependencies, input);
        return makeResponse<User>(200, user);
    } catch (error: any) {
        if (error.statusCode) {
            return error;
        }
        return makeResponse(500, { message: "Internal Server Error" });
    }
};