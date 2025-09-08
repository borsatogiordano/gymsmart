import { PrismaCheckInsRepository } from "../../repositories/prisma/prismaCheckInsRepository";
import { ValidateCheckInService } from "../validate-check-in";

export function makeValidateCheckInUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository();
    const useCase = new ValidateCheckInService(checkInsRepository);
    return useCase;
}   