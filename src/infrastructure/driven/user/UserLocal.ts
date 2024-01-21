import { User } from "../../../domain/models/User";
import { UserRepository } from "./UserRepository";
import fs from "fs";

export class UserLocal implements UserRepository {
    file: string;

    constructor(file: string) {
        this.file = file;
    }

    getUser(id: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
            fs.readFile(this.file, "utf8", (error, data) => {
                if (error) {
                    reject(error);
                }
                const users = JSON.parse(data);
                resolve(users.find((user: User) => user.id === id));
            });
        });
    }
    
}
