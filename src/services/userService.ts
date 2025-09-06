import { hash } from "bcryptjs";
import { UserRepository } from "../repositories/userRepository";
import { UserAlreadyExistsError } from "./errors/userAlreadyExists";
import { User } from "@prisma/client";

interface RegisterUserRequest {
    email: string,
    password: string
}

interface RegisterServiceResponse {
    user: User
}

export class RegisterService {
    constructor(private usersRepository: UserRepository) { }

    async execute({ email, password }: RegisterUserRequest) {
        const passwordHash = await hash(password, 6)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError
        }

        const user = await this.usersRepository.create({
            email,
            password: passwordHash
        });
        return {
            user
        }
    }
}
