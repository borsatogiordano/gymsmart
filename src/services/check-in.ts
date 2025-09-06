import { CheckIn } from "@prisma/client";
import { UserRepository } from "../repositories/userRepository";
import { ResourceNotFoundError } from "./errors/resourceNotFound";
import { CheckInRepository } from "../repositories/checkInsRepository";


interface CheckInRequest {
    userId: string;
    gymId: string;
}
interface CheckInReply {
    checkIn: CheckIn
}
export class CheckInService {
    constructor(private checkInRepository: CheckInRepository) { }

    async create({
        userId,
        gymId }: CheckInRequest): Promise<CheckInReply> {

        const checkInOnTheSameDate = await this.checkInRepository.findByUserIdOnDate(userId, new Date())

        if (checkInOnTheSameDate) {
            throw new Error("User already checked in today")
        }

        const checkIn = await this.checkInRepository.create({
            gymId: gymId,
            userId: userId
        })
        return ({
            checkIn
        })
    }
}