import { PrismaUserRepository } from "../../repositories/prisma/prismaUserRepository";
import { GetUserProfileService } from "../get-user-profile";

export function makeGetUserProfileUseCase() { 
    const usersRepository = new PrismaUserRepository();
    const useCase = new GetUserProfileService(usersRepository);
    return useCase;
}