import { Gym } from "@prisma/client";
import { GymRepository } from "../repositories/gymsRepository";

interface FetchNearbyGymsRequest {
    userLatitude: number;
    userLongitude: number;
}

interface FetchNearbyGymsResponse {
    gyms: Gym[]
}

export class FetchNearbyGymsService {
    constructor(private gymsRepository: GymRepository) { }

    async execute({
        userLatitude,
        userLongitude
    }: FetchNearbyGymsRequest): Promise<FetchNearbyGymsResponse> {

        const gyms = await this.gymsRepository.findManyNearby(userLatitude, userLongitude);

        return {
            gyms
        };
    }
}