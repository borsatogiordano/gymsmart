import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "../repositories/checkInsRepository";
import { ResourceNotFoundError } from "./errors/resourceNotFound";

interface ValidateCheckInRequest {
    checkInId: string;
}

interface ValidateCheckInResponse {
    checkIn: CheckIn;
}

export class ValidateCheckInService {
    constructor(
        private checkInsRepository: CheckInRepository,
    ) { }

    async execute(
        { checkInId }: ValidateCheckInRequest
    ): Promise<ValidateCheckInResponse> {

        const checkIn = await this.checkInsRepository.findById(checkInId);

        if (!checkIn) {
            throw new ResourceNotFoundError();
        }

        checkIn.validatedAt = new Date()

        await this.checkInsRepository.save(checkIn);

        return {
            checkIn
        }
    }
}