import { User } from "../domain/models/User";
import { UserRepository } from "../infrastructure/driven/user/UserRepository";
import { makeResponse } from "../utils/makeResponse";

export type getUserDependencies = {
    userRepository: UserRepository;
}

export type getUserInput = {
    id: string;
}

export const getUser = async (dependencies: getUserDependencies, input: getUserInput): Promise<User> => {
    const { userRepository } = dependencies;
    const user = await userRepository.getUser(input.id);
    if (!user) {
        throw makeResponse(404, { message: "User not found" });
    }
    return user;
}