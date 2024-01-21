import { getUserDependencies } from "../../../../src/cases/getUser";
import { getUserAdapter } from "../../../../src/infrastructure/driving/api-gateway/getUserAdapter";
import { makeResponse } from "../../../../src/utils/makeResponse";

describe('getUserAdapter.test', () => {
    let dependencies: any;
    beforeEach(() => {
        dependencies = {
            userRepository: {
                getUser: jest.fn()
            }
        };
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return user', async () => {
        dependencies.userRepository.getUser.mockResolvedValue({
            id: "1",
            name: "mock user",
            email: "mockUser@gmail.com"
        });
        const event = {
            pathParameters: {
                id: "1"
            }
        };
        const response = await getUserAdapter(dependencies)(event as any, {} as any);
        expect(response).toEqual({
            statusCode: 200,
            body: JSON.stringify({
                id: "1",
                name: "mock user",
                email: "mockUser@gmail.com"
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
    });
    
    it('should return 404 when dont found user', async () => {
        dependencies.userRepository.getUser.mockRejectedValue(makeResponse(404, { message: "User not found" }));
        const event = {
            pathParameters: {
                id: "1"
            }
        };
        const response = await getUserAdapter(dependencies)(event as any, {} as any);
        expect(response).toEqual({
            statusCode: 404,
            body: JSON.stringify({
                message: "User not found"
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
    });

    it('should return 500 when throw error', async () => {
        dependencies.userRepository.getUser.mockRejectedValue(new Error("Internal Server Error"));
        const event = {
            pathParameters: {
                id: "1"
            }
        };
        const response = await getUserAdapter(dependencies)(event as any, {} as any);
        expect(response).toEqual({
            statusCode: 500,
            body: JSON.stringify({
                message: "Internal Server Error"
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
    });
});