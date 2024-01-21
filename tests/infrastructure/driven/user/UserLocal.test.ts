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
});