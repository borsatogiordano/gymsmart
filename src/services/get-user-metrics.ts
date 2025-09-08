import { CheckInRepository } from "../repositories/checkInsRepository";

interface GetUserMetricsRequest {
    userId: string;
}
interface GetUserMetricsReply {
    checkInsCount: number
}
export class GetUserMetricsService {
    constructor(private checkInRepository: CheckInRepository,
    ) { }
    async execute({
        userId,
    }: GetUserMetricsRequest): Promise<GetUserMetricsReply> {

        const checkInsCount = await this.checkInRepository.countByUserId(userId);

        return { checkInsCount }
    }
}