import { PrismaGymsRepository } from "../../repositories/prisma/prismaGymsRepository";
import { SearchGymsService } from "../search-gyms";

export function makeSearchGymsUseCase() {
    const gymsRepository = new PrismaGymsRepository();
    const useCase = new SearchGymsService(gymsRepository);
    return useCase;
}