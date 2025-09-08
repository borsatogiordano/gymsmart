import { PrismaGymsRepository } from "../../repositories/prisma/prismaGymsRepository";
import { FetchNearbyGymsService } from "../fetch-nearby-gyms";

export function makeFetchNearbyGymsUseCase() {
    const gymsRepository = new PrismaGymsRepository();
    const useCase = new FetchNearbyGymsService(gymsRepository);
    return useCase;
}