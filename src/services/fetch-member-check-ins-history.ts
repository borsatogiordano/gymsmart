import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "../repositories/checkInsRepository";

interface FetchUserCheckInsHistoryRequest {
    userId: string;
    page: number;
}
interface FetchUsersCheckInsHistoryReply {
    checkIns: CheckIn[]
}
export class FetchUserCheckInsHistoryService {
    constructor(private checkInRepository: CheckInRepository,
    ) { }

    async execute({
        userId,
        page,
    }: FetchUserCheckInsHistoryRequest): Promise<FetchUsersCheckInsHistoryReply> {

        const checkIns = await this.checkInRepository.findManyByUserId(userId, page);


        return { checkIns }
    }
}