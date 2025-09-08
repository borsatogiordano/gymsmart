import { CheckInService } from "../check-in";
import { PrismaGymsRepository } from "../../repositories/prisma/prismaGymsRepository";
import { PrismaCheckInsRepository } from "../../repositories/prisma/prismaCheckInsRepository";

export function makeCheckInUseCase() {
    const userRepository = new PrismaCheckInsRepository();
    const gymsRepository = new PrismaGymsRepository();
    const checkInService = new CheckInService(userRepository, gymsRepository);

    return checkInService;
}