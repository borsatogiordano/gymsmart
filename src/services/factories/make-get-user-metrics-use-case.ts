import { PrismaCheckInsRepository } from "../../repositories/prisma/prismaCheckInsRepository";
import { GetUserMetricsService } from "../get-user-metrics";

export function makeGetUserMetricsUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository();
    const useCase = new GetUserMetricsService(checkInsRepository);
    return useCase;
}   