import { AuthenticateService } from "../authenticate";
import { PrismaUserRepository } from "../../repositories/prisma/prismaUserRepository";

export function makeAuthenticateUseCase() {
    const userRepository = new PrismaUserRepository();
    const authenticateService = new AuthenticateService(userRepository);

    return authenticateService;
}