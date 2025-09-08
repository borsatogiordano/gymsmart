import { PrismaCheckInsRepository } from "../../repositories/prisma/prismaCheckInsRepository";
import { FetchUserCheckInsHistoryService } from "../fetch-member-check-ins-history";
import { GetUserMetricsService } from "../get-user-metrics";

export function makeFetchUserCheckInsHistoryUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository();
    const useCase = new FetchUserCheckInsHistoryService(checkInsRepository);
    return useCase;
}   