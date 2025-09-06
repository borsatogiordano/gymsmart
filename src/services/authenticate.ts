import { compare } from "bcryptjs";
import { UserRepository } from "../repositories/userRepository";
import { InvalidCredentialsError } from "./errors/invalidCredentialsError";
import { User } from "@prisma/client";

interface AuthenticateRequest {
    email: string;
    password: string;
}


interface AuthenticateReply {
    user: User
}

export class AuthenticateService {

    constructor(
        private usersRepository: UserRepository
    ) { }

    async execute({ email, password }: AuthenticateRequest): Promise<AuthenticateReply> {
            const user = await this.usersRepository.findByEmail(email);
            if (!user) {
                throw new InvalidCredentialsError();
            }
            const doesPasswordMatches = await compare(password, user.password);
            if (!doesPasswordMatches) {
                throw new InvalidCredentialsError();
            }
            return {
                user
            };
    }
}