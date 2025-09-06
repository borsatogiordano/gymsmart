import { RegisterService } from "../userService";
import { PrismaUserRepository } from "../../repositories/prisma/prismaUserRepository";

export function makeRegisterUseCase() {
    const userRepository = new PrismaUserRepository();
    const registerService = new RegisterService(userRepository);
    
    return registerService;
}