import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../userRepository";

export class InMemoryUsersRepository implements UserRepository {

    public items: User[] = [];

    findById(id: string): Promise<User | null> {
        const user = this.items.find(item => item.id === id);

        if (!user) {
            return Promise.resolve(null);
        }

        return Promise.resolve(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find(item => item.email === email);
        return Promise.resolve(user || null);
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = {
            id: "some-unique-id",
            email: data.email,
            password: data.password,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        this.items.push(user);

        return user;
    }
}