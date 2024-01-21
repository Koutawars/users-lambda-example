import { User } from "../../../domain/models/User";

export interface UserRepository {
    getUser(id: string): Promise<User | undefined>;
}