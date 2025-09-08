import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "../repositories/checkInsRepository";
import { ResourceNotFoundError } from "./errors/resourceNotFound";
import dayjs from "dayjs";

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

        const distanceInMinutesFromCreation = dayjs(new Date()).diff(checkIn.createdAt, "minute");

        if (distanceInMinutesFromCreation > 20) {
            throw new Error("The check-in can only be validated within 20 minutes of its creation.");
        }

        checkIn.validatedAt = new Date()

        await this.checkInsRepository.save(checkIn);

        return {
            checkIn
        }
    }
}