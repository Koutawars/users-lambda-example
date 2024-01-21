import { UserLocal } from "../../../../src/infrastructure/driven/user/UserLocal";

describe('userLocalTest', () => {
    let userLocal: UserLocal;
    beforeEach(() => {
        userLocal = new UserLocal('./tests/database/userMock.json');
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should user equal', async () => {
        const expectedUser = {
            id: "1",
            name: "mock user",
            email: "mockuser@user.com"
        };
        const user = await userLocal.getUser(expectedUser.id);
        expect(user).toEqual(expectedUser);
    });

    it('should return null when dont found user', async () => {
        const user = await userLocal.getUser("2");
        expect(user).toBeUndefined();
    });

    it('shoul trhow error when dont have file', async () => {
        const userLocal = new UserLocal('./tests/database/userMock2.json');
        try {
            await userLocal.getUser("1");
        } catch (error: any) {
            expect(error).toBeDefined();
        }
    });
});