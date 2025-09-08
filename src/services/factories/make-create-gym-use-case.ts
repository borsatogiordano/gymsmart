import { CreateGymService } from "../create-gym";
import { PrismaGymsRepository } from "../../repositories/prisma/prismaGymsRepository";

export function makeCreateGymUseCase() {
    const gymsRepository = new PrismaGymsRepository();
    const createGymService = new CreateGymService(gymsRepository);

    return createGymService;
}