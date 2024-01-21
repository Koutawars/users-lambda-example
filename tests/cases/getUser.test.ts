import { getUser, getUserDependencies, getUserInput } from "../../src/cases/getUser";
import { User } from "../../src/domain/models/User";
import { UserLocal } from "../../src/infrastructure/driven/user/UserLocal";
import { UserRepository } from "../../src/infrastructure/driven/user/UserRepository";

describe('getUser', () => {
    let mockUserRepository: jest.Mocked<UserRepository>;
    let dependencies: getUserDependencies;
    let input: getUserInput;

    beforeEach(() => {
        mockUserRepository = new UserLocal("test") as unknown as jest.Mocked<UserLocal>;
        mockUserRepository.getUser = jest.fn();
        dependencies = { userRepository: mockUserRepository };
        input = { id: '1' };
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return a user when a user with the given id exists', async () => {
        const expectedUser: User = { 
            id: '1', 
            name: 'test', 
            email: 'test@test.com'
         };
        mockUserRepository.getUser.mockResolvedValue(expectedUser);

        const user = await getUser(dependencies, input);

        expect(user).toEqual(expectedUser);
        expect(mockUserRepository.getUser).toHaveBeenCalledWith(input.id);
    });

    it('should throw an error when a user with the given id does not exist', async () => {
        mockUserRepository.getUser.mockResolvedValue(undefined);
        try {
            await getUser(dependencies, input);
        } catch (error: any) {
            expect(error.statusCode).toEqual(404);
            expect(error.body).toEqual(JSON.stringify({ message: "User not found" }));
            expect(mockUserRepository.getUser).toHaveBeenCalledWith(input.id);
        }
    });
});