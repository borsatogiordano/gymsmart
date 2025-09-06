import { CheckIn } from "@prisma/client";
import { UserRepository } from "../repositories/userRepository";
import { ResourceNotFoundError } from "./errors/resourceNotFound";
import { CheckInRepository } from "../repositories/checkInsRepository";
import { GymRepository } from "../repositories/gymsRepository";
import { getDistanceBetweenCoordinates } from "../utils/get-distance-beetween-coordinates";
import { MaxDistanceError } from "./errors/max-distance-error";
import th from "zod/v4/locales/th.js";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";


interface CheckInRequest {
    userId: string;
    gymId: string;
    userLatitude: number;
    userLongitude: number;
}
interface CheckInReply {
    checkIn: CheckIn
}
export class CheckInService {
    constructor(private checkInRepository: CheckInRepository,
        private gymsRepository: GymRepository,
    ) { }


    async create({
        userId,
        gymId,
        userLatitude,
        userLongitude
    }: CheckInRequest): Promise<CheckInReply> {

        const gym = await this.gymsRepository.findById(gymId)
        if (!gym) {
            throw new ResourceNotFoundError()
        }

        const distance = getDistanceBetweenCoordinates(
            { latitude: userLatitude, longitude: userLongitude },
            { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
        )

        const MAX_DISTANCE_IN_KILOMETERES = 0.1 // 100 metros

        if (distance > MAX_DISTANCE_IN_KILOMETERES) {
            throw new MaxDistanceError()
        }

        const checkInOnTheSameDate = await this.checkInRepository.findByUserIdOnDate(userId, new Date())

        if (checkInOnTheSameDate) {
            throw new MaxNumberOfCheckInsError()
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