import { compare } from "bcryptjs";
import { UserRepository } from "../repositories/userRepository";
import { InvalidCredentialsError } from "./errors/invalidCredentialsError";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resourceNotFound";

interface GetUserProfileRequest {
    userId: string;
}


interface GetUserProfileReply {
    user: User
}

export class GetUserProfileService {

    constructor(
        private usersRepository: UserRepository
    ) { }

    async execute({ userId }: GetUserProfileRequest): Promise<GetUserProfileReply> {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new ResourceNotFoundError();
        }
        return {
            user
        };
    }
}
